import bcrypt from 'bcrypt-nodejs';
import jwt from 'jsonwebtoken';
import Promise from 'bluebird';
import isEmpty from 'lodash/isEmpty';
import db from '../../models/';
import commonValidations from '../../shared/validations/signup';


const secret = process.env.JWT_SECRET_KEY || 'rawsecret';
const userAttributes = (user) => {
  const attributes = {
    id: user.id,
    userName: user.userName,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    userRoleId: user.roleId,
    createdAt: user.createdAt,
    updatedAt: user.updatedAtg
  };

  return attributes;
};
  /**
   * Validate the login form
   *
   * @class users
   *
   */
class Users {
  /**
   * finds all users based on username or email
   *
   * @param {object} req - requese
   * @returns {object} response
   *
   */
  static identifier(req, res) {
    db.Users.findAll({
      where: {
        $or: [{
          userName: req.params.identifier,
        }, {
          email: req.params.identifier
        }]
      }
    }).then((user) => {
      res.json({ user });
    });
  }
  /**
   * Validate the signup form
   *
   * @param {object} data - contains the data to be validated
   * @param {function} otnerValidations-  functiona that validates
   * @returns {object} The result of validation.
   *
   */
  static validateSignupForm(data, otherValidations) {
    const { errors } = otherValidations(data);

    return Promise.all([
      db.Users.findOne({
        where: {
          email: data.email
        }
      }).then((returnedUser) => {
        if (returnedUser) { errors.email = ' There is a user with such email'; }
      }),

      db.Users.findOne({
        where: {
          userName: data.userName
        }
      }).then((returnedUser) => {
        if (returnedUser) {
          errors.username = 'There is a user with such username';
        }
      })

    ]).then(() => {
      return {
        errors,
        isFormValid: isEmpty(errors)
      };
    });
  }
  /**
   * Validate the login form
   *
   * @param {object} payload - the HTTP body message
   * @returns {object} The result of validation.
   *
   */
  static validateLoginForm(payload) {
    const errors = {};
    let isFormValid = true;
    let message = '';

    if (!payload || typeof payload.email !== 'string' ||
     payload.email.trim().length === 0) {
      isFormValid = false;
      errors.email = 'Please provide your email address.';
    }

    if (!payload || typeof payload.password !== 'string' ||
    payload.password.trim().length === 0) {
      isFormValid = false;
      errors.password = 'Please provide your password.';
    }

    if (!isFormValid) {
      message = 'Check the form for errors.';
    }

    return {
      success: isFormValid,
      message,
      errors
    };
  }

  /**
  * Get all users
  * @param {Object} req Request object
  * @param {Object} res Response object
  * @returns {Object} - Returns response object
  */
  static findAll(req, res) {
    if (req.query.limit < 0 || req.query.offset < 0) {
      return res.status(400)
        .send({ message: 'Enter a positive value for limit' });
    }
    db.Users.findAndCountAll({
      attributes: [
        'id',
        'userName',
        'firstName',
        'lastName',
        'email',
        'roleId',
        'createdAt',
        'updatedAt'
      ],
      limit: req.query.limit || null,
      offset: req.query.offset || null,
      include: [{
        model: db.Roles,
        attributes: ['title']
      }]
    }).then((result) => {
      return res.status(200).json({ users:
         [...result.rows, { count: result.count }] });
    });
  }
  /**
  * Create a user
  * @param {Object} req Request object
  * @param {Object} res Response object
  * @returns {Object} - Returns response object
  */
  static create(req, res) {
    Users.validateSignupForm(req.body, commonValidations)
    .then(({ errors, isFormValid }) => {
      if (!isFormValid) {
        return res.status(400).json(errors);
      }
      const password = req.body.password;
      db.Users.findOne({
        where: {
          email: req.body.email
        }
      }).then((returnedUser) => {
        if (returnedUser) {
          return res.status(409).json({
            message: 'User already exists'
          });
        }
        db.Users.create({
          userName: req.body.userName,
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: req.body.email,
          password,
          roleId: req.body.roleId
        }).then((user) => {
          const userData = {
            userName: user.userName,
            email: user.email,
            userRoleId: user.roleId,
            userId: user.id
          };
          const token = jwt.sign(userData, secret, { expiresIn: 86400 });
          user = userAttributes(user);
          return res.status(201).json({ token, expiresIn: 86400, user });
        })
          .catch((error) => {
            res.status(400).json(error.errors);
          });
      });
    });
  }
  /**
  * Logs in a user
  * @param {Object} req Request object
  * @param {Object} res Response object
  * @returns {Object} - Returns response object
  */
  static logIn(req, res) {
    const { identifier, password } = req.body;
    if (!identifier || !password) {
      return res.status(401).json({ message: 'User/password is required' });
    }
    db.Users.find({
      where: {
        $or: [
          { userName: identifier },
          { email: identifier }
        ]
      }
    }).then((user) => {
      if (user) {
        if (!bcrypt.compareSync(req.body.password, user.password)) {
          return res.status(401).json({ errors: 'Incorrect Password' });
        }
        const token = jwt.sign({
          userId: user.id,
          userName: user.userName,
          userRoleId: user.roleId
        }, secret, { expiresIn: '1 day' });
        return res.status(201).json({
          usertoken: token,
          message: 'Login Successful'
        });
      }
        res.status(401).json({ errors: { form: 'Invalid Credentials' } });
    });
  }
  /**
* Log out a user
* @param {Object} req Request object
* @param {Object} res Response object
* @returns {Object} - Returns response object
*/
  static logOut(req, res) {
    return res.status(200).send('User logged out');
  }
  /**
  * Returns a specific user
  * @param {Object} req Request object
  * @param {Object} res Response object
  * @returns {Object} - Returns response object
  */
  static getUser(req, res) {
    const userId = req.params.id;
    db.Users.findById(userId).then((user) => {
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      user = userAttributes(user);
      return res.status(200).json(user);
    });
  }
  /**
  * Update property of a specific User
  * @param {Object} req Request object
  * @param {Object} res Response object
  * @returns {Object} - Returns response object
  */
  static updateUser(req, res) {
    const userId = req.params.id;
    let updatedUser;
    if (Number(userId) !== req.token.userId && req.token.userRoleId !== 1) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    db.Users.findById(userId).then((user) => {
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      user.update(req.body).then((result) => {
        if (!result) {
          return res.status(404).json({ message: 'User not updated' });
        }
        updatedUser = userAttributes(result);
        return res.status(200).json(updatedUser);
      });
    });
  }
  /**
  * Deletes a particular user
  * @param {Object} req Request object
  * @param {Object} res Response object
  * @returns {Object} - Returns response object
  */
  static removeUser(req, res) {
    const userId = req.params.id;

    db.Users.destroy({
      where: {
        id: userId
      }
    }).then((user) => {
      if (!user) {
        return res.status(404).json({ message: 'User not deleted' });
      }
      return res.status(200).json({ message: 'User deleted' });
    });
  }
}
export default Users;
