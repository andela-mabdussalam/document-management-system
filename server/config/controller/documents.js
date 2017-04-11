/* eslint import/no-unresolved: 0 */
import DB from '../../models/';


const documents = {
  /**
   * Create a new document
   * @param {Object} req Request object
   * @param {Object} res Response object
   * @returns {Object} - Returns response object
   */
  create(req, res) {
    const newDocument = req.body;
    DB.Documents.findOrCreate({
      where: {
        title: newDocument.title,
      },
      defaults: {
        title: newDocument.title,
        content: newDocument.content,
        access: newDocument.access,
        ownerId: req.token.userId
      }
    })
      .spread((document, created) => {
        if (!created) {
          return res.status(400)
            .send({ message: 'A Document with that Title already exists' });
        }
        document.dataValues.User = req.token;
        return res.status(201)
          .send({
            document,
            message: 'Document successfully created!'
          });
      }).catch((error) => {
        res.status(400).json(error.errors);
      });
  },
  /**
  * Gets all Documents
  * @param {Object} req Request object
  * @param {Object} res Response object
  * @returns {Object} - Returns response object
  */
  getAll(req, res) {
    const userId = req.token.userId;
    const roleId = req.token.userRoleId;
    if (req.query.limit < 0 || req.query.offset < 0) {
      return res.status(400)
        .send({ message: 'Enter a positive value for limit' });
    }
    DB.Roles.findById(roleId).then((role) => {
      if (role && role.title === 'admin') {
        DB.Documents.findAndCountAll({
          attributes: ['id', 'title', 'content',
            'access', 'createdAt', 'updatedAt'],
          limit: req.query.limit || null,
          offset: req.query.offset || null,
          order: [['id', 'ASC']],
          include: [{
            model: DB.Users,
            attributes: ['userName']
          }]
        }).then((result) => {
          if (result < 1) {
            return res.status(404).json({ message: 'No Document found' });
          }

          return res.status(200).json({ result: [...result.rows,
             { count: result.count }],
            message: userId });
        });
      } else {
        DB.Documents.findAndCountAll({
          where: {
            $or: [{
              access: 'public',
            }, {
              ownerId: userId
            }]
          },
          include: [{
            model: DB.Users,
            attributes: ['userName']
          }],
          limit: req.query.limit || null,
          offset: req.query.offset || null,
          order: [['createdAt', 'DESC']]
        }).then((result) => {
          if (result < 1) {
            return res.status(404).json({ message: 'No document found' });
          }
          return res.status(200).json({ result: [...result.rows,
             { count: result.count }],
            message: userId });
        });
      }
    });
  },

  /**
  * Gets a Document
  * @param {Object} req Request object
  * @param {Object} res Response object
  * @returns {Object} - Returns response object
  */
  getOne(req, res) {
    const docId = req.params.id;
    const userId = req.token.userId;
    const roleId = req.token.roleId;

    DB.Roles.findById(roleId).then((role) => {
      if (role && role.title === 'admin') {
        DB.Documents.findById(docId).then((result) => {
          if (result < 1) {
            return res.status(404).json({ message: 'No Document found' });
          }
          return res.status(200).json({ result, message: userId });
        });
      } else {
        DB.Documents.findById(docId).then((results) => {
          if (results < 1) {
            return res.status(404).json({ message: 'No document found' });
          }
          if (results.dataValues.ownerId !== userId) {
            return res.status(404)
              .json({ message: 'You cannot access this document' });
          }
          return res.status(200).json(results);
        }).catch(() => {
          return res.status(404).json({
            message: 'You are not allowed to view this document'
          });
        });
      }
    });
  },

  /**
  * Updates a document
  * @param {Object} req Request object
  * @param {Object} res Response object
  * @returns {Object} - Returns response object
  */
  update(req, res) {
    const docId = req.params.id;
    DB.Documents.findById(docId).then((results) => {
      if (results < 1) {
        return res.status(404).json({ message: 'No document found' });
      }
      if (req.token.userId !== results.dataValues.ownerId) {
        return res.status(404)
        .json({ message: 'You cannot edit this document' });
      }
      results.update(req.body).then((updatedResult) => {
        return res.status(200)
          .json({ message: 'Document updated successfully', updatedResult });
      });
    }).catch(() => {
      return res.status(404).json({
        message: 'You are not allowed to view this document'
      });
    });
  },

  /**
  * Deletes a document
  * @param {Object} req Request object
  * @param {Object} res Response object
  * @returns {Object} - Returns response object
  */
  remove(req, res) {
    const docId = req.params.id;
    DB.Documents.destroy({
      where: {
        id: docId
      }
    }).then((doc) => {
      if (doc < 1) {
        return res.status(404)
          .json({ message: `Could not find document ${docId} to delete` });
      }
      return res.status(200).json({ message: 'Document deleted successfully' });
    });
  },

  /**
  * Gets all Documents for a user
  * @param {Object} req Request object
  * @param {Object} res Response object
  * @returns {Object} - Returns response object
  */
  getDocsForUser(req, res) {
    DB.Documents.findAll({
      where: { ownerId: req.params.id },
      include: [{
        model: DB.Users,
        attributes: ['userName']
      }]
    }).then((results) => {
      if (!results) {
        return res.status(404)
          .send({
            message: `No Document(s) found for user with ID
            ${request.params.id}`
          });
      }
      return res.status(200).json({ result: results });
    });
  },

  search(request, response) {
    if (request.query.limit < 0 || request.query.offset < 0) {
      return response.status(400)
        .send({ message: 'Only Positive integers are permitted.' });
    }
    if (isNaN(request.query.limit) || isNaN(request.query.offset)) {
      return response.status(400)
        .send({ message: 'Invalid query or offset' });
    }
    const queryString = request.query.query;
    const publishedDate = request.query.publishedDate;
    const order = /^ASC$/i.test(publishedDate)
      ? publishedDate : 'DESC';

    const query = {
      where: {
        $and: [{
          $or: [
            { access: 'public' },
            { ownerId: request.token.userId }
          ]
        }],
      },
      limit: request.query.limit || null,
      offset: request.query.offset || null,
      order: [['createdAt', order]],
      include: [{
        model: DB.Users,
        attributes: ['userName']
      }]
    };
    if (queryString) {
      query.where.$and.push({
        $or: [
          { title: { $like: `%${queryString}%` } },
          { content: { $like: `%${queryString}%` } }
        ]
      });
    }
    DB.Documents.findAndCountAll(query)
      .then((result) => {
        if (!result) {
          return res.status(404).json({ message: 'No documents found' });
        }
        response.json({ result: [...result.rows, { count: result.count }] });
      });
  }
};

export default documents;
