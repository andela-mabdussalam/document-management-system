import bcrypt from 'bcrypt-nodejs';
import jwt from 'jsonwebtoken';
import db from '../../models/';

const secret = process.env.JWT_SECRET_KEY || 'rawsecret';
const userAttributes = (user) => {
  const attributes = {
    id: user.id,
    userName: user.userName,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    roleId: user.roleId,
    createdAt: user.createdAt,
    updatedAt: user.updatedAtg
  };

  return attributes;
};
const users = {
  /**
  * Get all users
  * @param {Object} req Request object
  * @param {Object} res Response object
  * @returns {Object} - Returns response object
  */
  findAll(req, res) {
    db.Users.findAll({
      attributes: [
        'id',
        'userName',
        'firstName',
        'lastName',
        'email',
        'roleId',
        'createdAt',
        'updatedAt'
      ]
    }).then((result) => {
      return res.status(200).json({ users: result });
    });
  },
  /**
  * Create a user
  * @param {Object} req Request object
  * @param {Object} res Response object
  * @returns {Object} - Returns response object
  */
  create(req, res) {
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
          roleId: user.roleId,
          userId: user.id
        };
        const token = jwt.sign(userData, secret, { expiresIn: 86400 });
        user = userAttributes(user);
        return res.status(201).json({ token, expiresIn: 86400, user });
      })
        .catch(error => res.status(400).json(error.errors));
    });
  },
  /**
  * Logs in a user
  * @param {Object} req Request object
  * @param {Object} res Response object
  * @returns {Object} - Returns response object
  */
  logIn(req, res) {
    if (!req.body.userName || !req.body.password) {
      return res.status(404).json({ message: 'User/ password required' });
    }
    db.Users.findOne({ where: { userName: req.body.userName } })
      .then((user) => {
        if (!bcrypt.compareSync(req.body.password, user.password)) {
          return res.status(404).json({ message: 'Incorrect Password' });
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
      });
  },
  /**
* Log out a user
* @param {Object} req Request object
* @param {Object} res Response object
* @returns {Object} - Returns response object
*/
  logOut(req, res) {
    return res.status(200).send('User logged out');
  },
  /**
  * Returns a specific user
  * @param {Object} req Request object
  * @param {Object} res Response object
  * @returns {Object} - Returns response object
  */
  getUser(req, res) {
    const userId = req.params.id;
    db.Users.findById(userId).then((user) => {
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      user = userAttributes(user);
      return res.status(200).json(user);
    });
  },
  /**
  * Update property of a specific User
  * @param {Object} req Request object
  * @param {Object} res Response object
  * @returns {Object} - Returns response object
  */
  updateUser(req, res) {
    const userId = req.params.id;
    let updatedUser;
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
  },
  /**
  * Deletes a particular user
  * @param {Object} req Request object
  * @param {Object} res Response object
  * @returns {Object} - Returns response object
  */
  removeUser(req, res) {
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
};
export default users;
