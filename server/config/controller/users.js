import bcrypt from 'bcrypt-nodejs';

import db from '../../models/';

import jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET_KEY || 'jhebefuehf7yu3832978ry09iofe';
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
* Get all usersr
* @param {Object} req Request object
* @param {Object} res Response object
* @returns {Object} - Returns response object
*/
  findAll(req, res) {
    db.User.findAll({
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
  create(req, res) {
    const password = bcrypt.hashSync(req.body.password);
    db.User.findOne({
      where: {
        email: req.body.email
      }
    }).then((returnedUser) => {
      if (returnedUser) {
        return res.status(409).json({
          message: `User with ${req.body.email} already exists`
        });
      }
      db.User.create({
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
        console.log("userData", userData);
        // const token = jwt.sign(userData, Secret, {
        //   expiresInMinutes: 1440 // expires in 24 hours
        // });
        const token = jwt.sign(userData, secret, { expiresIn: 86400 });
        console.log("token", token);
        user = userAttributes(user);
        return res.status(201).json({ token, expiresIn: 86400, user });
      })
        .catch(error => res.status(400).json(error.errors));
    });
  }
};
export default users;
