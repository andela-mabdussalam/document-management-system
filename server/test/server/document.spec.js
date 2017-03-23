import { expect } from 'chai';
import supertest from 'supertest';
import helper from '../helper';
import DB from '../../models/';
import server from '../../config/bin/server';
import dochelper from '../dochelper';

const doc1 = dochelper.first, doc2 = dochelper.second, doc3 = dochelper.third,
  doc4 = dochelper.fourth, doc5 = dochelper.fifth, doc6 = dochelper.sixth;

let adminRole, regularRole,
  adminToken, privateUser, privateToken, doc2Id, doc1Id,
  privateToken2, createdDoc;
let fakeDocument = helper.createDocument();
const fakeUser = helper.testUser(),
  testUser = helper.testUser(),
  fakeAdmin = helper.createAdmin(),
  adminUserParams = helper.adminRole(),
  regularUserParams = helper.regularRole(),
  regularUserParams2 = helper.regularRole();

describe('Create Document', () => {
  before((done) => {
    DB.sequelize.sync({ force: true }).then(() => {
      DB.Roles.bulkCreate([adminUserParams, regularUserParams], {
        returning: true
      }).then((createdRoles) => {
        adminRole = createdRoles[0];
        regularRole = createdRoles[1];
        adminUserParams.roleId = adminRole.id;
        // Two users here are assigned same RoleId to demonstrate role access
        regularUserParams.roleId = regularRole.id;
        regularUserParams2.roleId = regularRole.id;
        supertest(server).post('/api/users/signup')
          .send(fakeAdmin)
          .end((error, response) => {
            adminToken = response.body.token;
            supertest(server).post('/api/users/signup')
              .send(fakeUser)
              .end((err, res) => {
                privateUser = res.body.user;
                privateToken = res.body.token;

                supertest(server).post('/api/users/signup')
                  .send(testUser)
                  .end((err, res) => {
                    privateToken2 = res.body.token;
                    done();
                  });
              });
          });
      });
    });
  });

  describe('Create Document', () => {
    it('should return an error if no documents exist',
      (done) => {
        supertest(server).get('/api/documents')
          .set('authorization', adminToken)
          .end((err, res) => {
            expect(res.status).to.equal(404);
            expect(res.body.message).to.equal('No Document found');
            done();
          });
      });

    it('should create a document', (done) => {
      fakeDocument.ownerId = privateUser.id;
      supertest(server).post('/api/documents')
        .send(fakeDocument)
        .set('authorization', privateToken)
        .end((err, res) => {
          fakeDocument = res.body;
          expect(res.body).to.not.equal(undefined);
          done();
        });
    });
    it('should create multiple document', (done) => {
      DB.Documents.bulkCreate([doc2, doc1, doc3, doc4, doc5, doc6], { returning: true })
        .then((createDocument) => {
          createdDoc = createDocument[1];
          doc2Id = createDocument[0].id;
          doc1Id = createDocument[1].id;
          expect(createDocument).to.exist;
          done();
        });
    });
    it('should return an error if any field is missing', (done) => {
      supertest(server)
        .post('/api/documents')
        .send({ title: 'No content' })
        .set('authorization', adminToken)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).to.equal(400);
          done();
        });
    });

    it('should create a document with access set to public by default',
      (done) => {
        // const publicDocument = helper.createDocument();
        supertest(server).get(`/api/documents/${doc1Id}`)
          .set('authorization', adminToken)
          .end((err, res) => {
            expect(res.body.result.access).to.equal('public');
            done();
          });
      });
  });


  describe('GET: (/api/documents) - GET ALL DOCUMENTS', () => {
    it('should not return documents if no token is provided', (done) => {
      supertest(server)
        .get('/api/documents')
        .end((err, res) => {
          expect(res.status).to.equal(401);
          expect(res.body.message).to.equal('Unauthorized User');
          done();
        });
    });
    it('should not return documents if invalid token is provided',
      (done) => {
        supertest(server).get('/api/documents')
          .set('authorization', 'ADRYDUIGUtrtrr6e')
          .expect(401, done);
      });
    it('should return all documents when valid token is provided',
      (done) => {
        supertest(server).get('/api/documents')
          .set('authorization', adminToken)
          .end((error, response) => {
            expect(response.status).to.equal(200);
            done();
          });
      });
    it('should return all public documents if token belongs to a user',
      (done) => {
        supertest(server).get('/api/documents')
          .set('authorization', privateToken)
          .end((error, response) => {
            expect(response.status).to.equal(200);
            done();
          });
      });
  });

  describe('GET: (/documents/:id) - GET A DOCUMENT', () => {
    it('should not return a document if invalid id is provided',
      (done) => {
        supertest(server).get('/api/documents/789')
          .set({ Authorization: adminToken })
          .expect(404, done);
      });
    it('should return the document when a valid id is provided',
      (done) => {
        supertest(server).get(`/api/documents/${doc2Id}`)
          .set('authorization', adminToken)
          .end((error, response) => {
            expect(response.status).to.equal(200);
            done();
          });
      });
    it('should return a private document if document belongs to the user',
      (done) => {
        supertest(server).get(`/api/documents/${doc2Id}`)
          .set('authorization', privateToken)
          .end((error, response) => {
            expect(response.status).to.equal(200);
            done();
          });
      });
    it('should return an error if the private document does not belong to user',
      (done) => {
        supertest(server).get(`/api/documents/${doc2Id}`)
          .set('authorization', privateToken2)
          .end((error, response) => {
            expect(response.status).to.equal(401);
            expect(response.body.message).to.equal('User not authorized');
            done();
          });
      });
  });

  describe('PUT: (/documents/:id) - EDIT A DOCUMENT', () => {
    it('should not perform edit if invalid id is provided', (done) => {
      const fieldToUpdate = { content: 'replace document' };
      supertest(server).put('/api/documents/789')
        .set('authorization', privateToken2)
        .send(fieldToUpdate)
        .end((error, response) => {
          expect(response.status).to.equal(401);
          expect(response.body.message).to.equal('User not authorized');
          done();
        });
    });
    it('should not perform edit if User is not document Owner', (done) => {
      const fieldToUpdate = { content: 'replace document' };
      supertest(server).put(`/api/documents/${doc2Id}`)
        .set('authorization', privateToken2)
        .send(fieldToUpdate)
        .end((error, response) => {
          console.log(response.body.message);
          expect(response.status).to.equal(401);
          expect(response.body.message).to.equal('User not authorized');
          done();
        });
    });
    it('should correctly edit document if valid id is provided',
      (done) => {
        const fieldToUpdate = { content: 'replace document' };
        supertest(server).put(`/api/documents/${doc2Id}`)
          .set('authorization', privateToken)
          .send(fieldToUpdate)
          .end((error, response) => {
            expect(response.status).to.equal(200);
            expect(response.body.message).to.equal('Document updated successfully');
            done();
          });
      });
  });

  describe('DELETE: (/documents/:id) - DELETE A DOCUMENT', () => {
    it('should not perform delete if an invalid id is provided',
      (done) => {
        supertest(server).delete('/api/documents/789')
          .set('authorization', privateToken)
          .end((error, response) => {
            expect(response.status).to.equal(401);
            expect(response.body.message).to.equal('User not authorized');
            done();
          });
      });
    it('should not perform delete if User is not document Owner',
      (done) => {
        const fieldToUpdate = { content: 'replace previous document' };
        supertest(server).delete(`/api/documents/${doc2Id}`)
          .set('authorization', privateToken2)
          .send(fieldToUpdate)
          .end((error, response) => {
            expect(response.status).to.equal(401);
            done();
          });
      });
    it('should succesfully delete when provided a valid Id', (done) => {
      supertest(server).delete(`/api/documents/${doc2Id}`)
        .set('authorization', privateToken)
        .end((error, response) => {
          expect(response.status).to.equal(200);
          expect(response.body.message)
            .to.equal('Document deleted successfully');
          done();
        });
    });
  });

  describe('Document Pagination', () => {
    it('allows use of query params "limit" to limit the result', (done) => {
      supertest(server).get('/api/documents?limit=3')
        .set('authorization', adminToken)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.result.length).to.equal(3);
          done();
        });
    });
    it('allows use of query params "offset" to create a range', (done) => {
      supertest(server).get('/api/documents?offset=1')
        .set('authorization', privateToken)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.length).to.equal(4);
          done();
        });
    });
    it('returns the documents in order of their published dates', (done) => {
      const compareDate = (dateA, dateB) =>
        new Date(dateA).getTime() <= new Date(dateB).getTime();
      supertest(server).get('/api/documents?limit=3')
        .set('authorization', privateToken)
        .end((error, response) => {
          const documents = response.body;
          let check = false;
          for (let index = 0; index < documents.length - 1; index += 1) {
            check = compareDate(documents[index].createdAt,
              documents[index + 1].createdAt);
            if (!check) break;
          }
          expect(check).to.be.true;
          done();
        });
    });
    it('does NOT return documents if the limit is not valid', (done) => {
      supertest(server).get('/api/documents?limit=-1')
        .set('authorization', privateToken)
        .expect(400, done);
    });
    it('does NOT return documents if the offset is not valid', (done) => {
      supertest(server).get('/api/documents?offset=-2')
        .set('authorization', privateToken)
        .expect(400, done);
    });
  });

  describe('Document Search', () => {
    it('performs a search and returns the correct document', (done) => {
      const query = createdDoc.content.substr(5, 13);
      const matcher = new RegExp(query);
      supertest(server).post(`/api/documents/search?query=${query}`)
        .set('authorization', privateToken)
        .end((error, response) => {
          expect(response.status).to.equal(200);
          expect(matcher.test(response.body[0].content)).to.be.true;
          done();
        });
    });
    it(`allows use of query params "limit" to determine
    the result if search term is not entered`,
      (done) => {
        supertest(server)
          .post('/api/documents/search?limit=4')
          .set('authorization', privateToken)
          .end((error, response) => {
            expect(response.status).to.equal(200);
            expect(response.body.length).to.equal(4);
            done();
          });
      });
    it(`allows use of query params "limit" to
    determine the result if search term is entered`,
      (done) => {
        const searchQuery = 'a';
        const match = new RegExp(searchQuery);
        supertest(server)
          .post(`/api/documents/search?query=${searchQuery}&limit=4`)
          .set('authorization', privateToken)
          .end((error, response) => {
            expect(response.status).to.equal(200);
            expect(response.body.length).to.equal(4);
            expect(match.test(response.body[0].content)).to.be.true;
            done();
          });
      });
    it('allows use of query params "offset" to create a range', (done) => {
      supertest(server).post('/api/documents/search?offset=3')
        .set('authorization', privateToken)
        .end((error, response) => {
          expect(response.status).to.equal(200);
          expect(response.body.length).to.equal(2);
          done();
        });
    });

    it('allows use of query params "publishedDate" to determine the order',
      (done) => {
        const compareDates = (dateA, dateB) =>
          new Date(dateA).getTime() <= new Date(dateB).getTime();
        supertest(server).post('/api/documents?publishedDate=ASC')
          .set('authorization', privateToken)
          .end((error, response) => {
            const foundDocuments = response.body;
            let flag = true;

            for (let index = 0; index < foundDocuments.length - 1;
              index += 1) {
              flag = compareDates(foundDocuments[index].createdAt,
                foundDocuments[index + 1].createdAt);
              if (!flag) break;
            }
            expect(flag).to.be.false;
            done();
          });
      });
    it('does NOT return documents if the limit is not valid', (done) => {
      supertest(server).post('/api/documents/search?limit=-1')
        .set('authorization', privateToken)
        .expect(400, done);
    });
    it('does NOT return documents if the offset is not valid', (done) => {
      supertest(server).post('/api/documents/search?offset=-2')
        .set('authorization', privateToken)
        .expect(400, done);
    });
  });
});

