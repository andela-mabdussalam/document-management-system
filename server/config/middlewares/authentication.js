// import db from '../../models/';
import jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET_KEY || 'rawsecret';

const authentication = {
  /**
 * Verify user token
 * @method verifyToken
 * @param {object} req
 * @param {object} res
 * @param {function} done callback
 * @returns {object} http callback.
 */
  verifyToken(req, res, done) {
    if (!req.headers.authorization) {
      return res.status(401).send({ message: 'Unauthorized User' });
    }
    const jwtToken = req.headers.authorization;
    jwt.verify(jwtToken, secret, (err, token) => {
      if (err) {
        return res.status(401).send({ message: 'Invalid Token' });
      }
      if (token.userId !== 1 && req.params.id !== undefined) {
        console.log('req', req.params.id);
        console.log('token', token.userId);
        if (req.params.id !== token.userId.toString()) {
          return res.status(401).send({ message: 'User not authorized' });
        }
      }
      req.token = token;
      done();
    });
  },
  /**
 * Check if user is admin
 * @method isAdmin
 * @param {object} req
 * @param {object} res
 * @param {function} done callback
 * @returns {object} http callback.
 */
  isAdmin(req, res, done) {
    if (req.token.roleId !== 1) {
      return res.status(401).send({ message: 'Only admins allowed' });
    }
    done();
  }
};

module.exports = authentication;
