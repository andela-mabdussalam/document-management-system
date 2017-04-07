import DB from '../../models/';

const roles = {
  /**
 * Create role
 * @param {object} req
 * @param {function} res // Object
 * @returns {object} specified role.
 */
  create(req, res) {
    DB.Roles.findOne({
      where: {
        title: req.body.title
      }
    }).then((returnedRole) => {
      console.log('returned role');
      if (returnedRole) {
        console.log('gets here');
        return res.status(409).json({
          message: `Role already exists`
        });
      }
      console.log('gets there');
      DB.Roles.create({ title: req.body.title }).then((role) => {
        return res.status(201).json(role);
      }).catch(error => res.status(400).json(error));
    });
  },
  /**
   * Get role
   * @param {object} req
   * @param {function} res // Object
   * @returns {object} specified role.
   */
  getRole(req, res) {
    DB.Roles.find({
      where: {
        id: req.params.id
      }
    }).then((role) => {
      if (!role) {
        return res.status(404).send({ message: 'Role Not found' });
      }
      return res.status(200).send(role);
    });
  },

  /**
   * Get all roles
   * @param {object} req
   * @param {function} res // Object
   * @returns {object} all roles.
   */
  getAllRoles(req, res) {
    console.log('gets right here');
    DB.Roles.findAll().then((roleReturned) => {
      if (!roleReturned) {
        return res.status(404).send({ message: 'No role found' });
      }
      return res.status(200).send(roleReturned);
    });
  },

  /**
   * Method updateRole
   * @param {Object} request - request Object
   * @param {Object} response - request Object
   * @return {Object} response object
   */
  updateRole(request, response) {
    DB.Roles.findById(request.params.id)
      .then((role) => {
        if (!role) {
          return response.status(404)
            .send({ message: `Ǹo role with id: ${request.params.id}` });
        }

        role.update(request.body)
          .then((updatedRole) => {
            return response.status(200)
              .send(updatedRole);
          }).catch(error => response.status(404).json(error));
      });
  },

  /**
   * Method deleteRole
   * @param {Object} request - request Object
   * @param {Object} response - request Object
   * @return {Object} response object
   */
  deleteRole(request, response) {
    console.log('debo');
    DB.Roles.findById(request.params.id)
      .then((role) => {
        console.log('debo');
        if (!role) {
          return response.status(404)
            .send({ message: `Ǹo role with id: ${request.params.role}` });
        }

        role.destroy()
          .then(() => {
            return response.status(200)
              .send({ message: 'Succesfully deleted role' });
          });
      });
  }
};
export default roles;
