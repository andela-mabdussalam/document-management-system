import db from '../../models/';

const userAttributes = (user) => {
  const attributes = {
    id: user.id,
    username: user.username,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    roleId: user.roleId,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt
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
      db.user.create({
        username: req.body.username,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        RoleId: req.body.RoleId
      }).then((user) => {
        // const jwtData = {
        //   username: user.username,
        //   email: user.email,
        //   RoleId: user.RoleId,
        //   userId: user.id
        // };
        // const token = jwt.sign(jwtData, secretKey, { expiresIn: 86400 });
        user = userAttributes(user);
        return res.status(201).json({ user });
      })
        .catch(error => res.status(400).json(error.errors));
    });
  }
};
export default users;
