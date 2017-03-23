/* eslint import/no-unresolved: 0 */
import DB from '../../models/';

const docAttributes = (doc) => {
  const attributes = {
    id: doc.id,
    title: doc.title,
    content: doc.content,
    ownerId: doc.ownerId,
    access: doc.access,
  };

  return attributes;
};

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
        ownerId: newDocument.ownerId
      }
    })
      .spread((document, created) => {
        if (!created) {
          return res.status(400)
            .send({ message: 'A Document with that Title already exists' });
        }
        return res.status(201)
          .send({
            document,
            message: 'Document successfully created!'
          });
      }).catch(error => res.status(400).json(error.errors));
  },
  /**
* Gets Public Documents
* @param {Object} req Request object
* @param {Object} res Response object
* @returns {Object} - Returns response object
*/
  getAlldocs(req, res) {
    if (req.query.limit < 0 || req.query.offset < 0) {
      return res.status(400)
        .send({ message: 'Enater a positive value for limit' });
    }
    const query = {
      where: {
        $or: [
          { access: 'public' },
          { ownerId: req.token.userId }
        ]
      },
      limit: req.query.limit || null,
      offset: req.query.offset || null,
      order: [['createdAt', 'DESC']]
    };
    if (role && role.title === 'admin') {
      DB.Documents.findAll({
        attributes: ['id', 'title', 'content', 'access', 'createdAt', 'updatedAt']
      }).then((result) => {
        if (result < 1) {
          return res.status(404).json({ message: 'No Document found' });
        }
        return res.status(200).json({ result, message: userId });
      });
    } else {
      DB.Documents.findAll({
        where: {
          $or: [{
            access: 'public',
          }, {
            ownerId: userId
          }]
        }
      }).then((results) => {
        if (results < 1) {
          return res.status(404).json({ message: 'No document found' });
        }
        return res.status(200).json(results);
      });
    }
  },
  /**
  * Gets all Documents
  * @param {Object} req Request object
  * @param {Object} res Response object
  * @returns {Object} - Returns response object
  */
  getAll(req, res) {
    const userId = req.token.userId;
    const roleId = req.token.roleId;
    if (req.query.limit < 0 || req.query.offset < 0) {
      return res.status(400)
        .send({ message: 'Enter a positive value for limit' });
    }
    DB.Roles.findById(roleId).then((role) => {
      if (role && role.title === 'admin') {
        DB.Documents.findAll({
          attributes: ['id', 'title', 'content', 'access', 'createdAt', 'updatedAt'],
          limit: req.query.limit || null,
          offset: req.query.offset || null,
          order: [['createdAt', 'DESC']]
        }).then((result) => {
          if (result < 1) {
            return res.status(404).json({ message: 'No Document found' });
          }
          return res.status(200).json({ result, message: userId });
        });
      } else {
        DB.Documents.findAll({
          where: {
            $or: [{
              access: 'public',
            }, {
              ownerId: userId
            }]
          },
          limit: req.query.limit || null,
          offset: req.query.offset || null,
          order: [['createdAt', 'DESC']]
        }).then((results) => {
          if (results < 1) {
            return res.status(404).json({ message: 'No document found' });
          }
          return res.status(200).json(results);
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
            return res.status(404).json({ message: 'You cannot access this document' });
          }
          return res.status(200).json(results);
        }).catch(() => {
          return res.status(404).json({
            message: 'You are not allowed to view this document'
          });
        });
      }
    });
    // DB.Documents.findById(docId).then((result) => {
    //   if (result < 1) {
    //     return res.status(404).json({ message: 'Document not found' });
    //   }
    //   const document = docAttributes(result);
    //   return res.status(200).json(document);
    // });
  },

  /**
  * Updates a document
  * @param {Object} req Request object
  * @param {Object} res Response object
  * @returns {Object} - Returns response object
  */
  update(req, res) {
    const docId = req.params.id;
    const userId = req.token.userId;
    DB.Documents.findById(docId).then((results) => {
      if (results < 1) {
        return res.status(404).json({ message: 'No document found' });
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
    // const userId = req.token.userId;
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
    const queryId = req.params.id;
    const ownerId = req.decoded.userId;
    const roleId = req.decoded.RoleId;
    DB.Roles.finDById(roleId).then((role) => {
      if (role) {
        if (ownerId === queryId || role.title === 'admin') {
          DB.Document.findAll({
            where: {
              ownerId: queryId
            }
          }).then((docs) => {
            if (docs < 1) {
              return res.status(404).json({ message: 'No documents found' });
            }
            const results = docs;
            return res.status(200).json(results);
          });
        } else {
          DB.Documents.findAll({
            where: {
              ownerId: queryId,
              $and: {
                access: 'public'
              }
            }
          }).then((docs) => {
            if (docs < 1) {
              return res.status(404).json({ message: 'No documents found' });
            }
            const results = docs;
            return res.status(200).json(results);
          });
        }
      }
    });
  },

  search(request, response) {
    if (request.query.limit < 0 || request.query.offset < 0) {
      return response.status(400)
        .send({ message: 'Only Positive integers are permitted.' });
    }
    const queryString = request.query.query;
    // const role = Math.abs(request.query.role, 10);
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
      order: [['createdAt', order]]
    };
    if (queryString) {
      query.where.$and.push({
        $or: [
          { title: { $like: `%${queryString}%` } },
          { content: { $like: `%${queryString}%` } }
        ]
      });
    }
    DB.Documents.findAll(query)
      .then((dons) => {
        if (!dons) {
          return res.status(404).json({ message: 'No documents found' });
        }
        response.send(dons);
      });
  }
};

export default documents;
