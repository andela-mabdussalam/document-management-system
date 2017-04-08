// import supertest from 'supertest';
// import { expect } from 'chai';
// import testserver from '../../config/bin/testServer';
// import helper from '../helper';
// import DB from '../../models/';
//
// describe('ROLE API', () => {
//   const admin = helper.adminRole();
//   const userDetail = helper.testUser();
//   const anotherUser = helper.createUser();
//   const regularRoleParams = helper.regularRole();
//   let adminToken, role, adminId, newUserId, userToken;
//
//   before((done) => {
//     DB.sequelize.sync({ force: true }).then(() => {
//       DB.Roles.create({ title: 'admin' })
//         .then((adminRole) => {
//           userDetail.roleId = adminRole.id;
//           supertest(testserver)
//             .post('/api/users/signup')
//             .send(userDetail)
//             .end((err, res) => {
//               adminToken = res.body.token;
//               adminId = res.body.user.id;
//               expect(res.status).to.equal(201);
//               done();
//             });
//         });
//     });
//   });
//
//   before((done) => {
//     DB.Roles.create(regularRoleParams)
//       .then((regularRole) => {
//         role = regularRole;
//         done();
//       }).catch((err) => {
//         console.log('error', err);
//       });
//   });
//
//   // afterEach(() => DB.Roles.destroy({ where: { id: role.id } }));
//
//   after(() => {
//     DB.sequelize.sync({ force: true });
//   });
//
//   describe('ADMIN ', () => {
//     it('should be able to create a New Role', (done) => {
//       supertest(testserver)
//         .post('/api/roles')
//         .send({ title: 'NewRole' })
//         .set('authorization', adminToken)
//         .end((err, res) => {
//           newUserId = res.body.id;
//           expect(res.status).to.equal(201);
//           done();
//         });
//     });
//     it('should be not create a New Role if title is empty', (done) => {
//       supertest(testserver)
//         .post('/api/roles')
//         .send({ title: '' })
//         .set('authorization', adminToken)
//         .end((err, res) => {
//           expect(res.status).to.equal(400);
//           done();
//         });
//     });
//     it('should get all roles', (done) => {
//       supertest(testserver)
//         .get('/api/roles')
//         .set('authorization', adminToken)
//         .end((err, res) => {
//           expect(res.status).to.equal(200);
//           console.log('error is');
//           done();
//         });
//     });
//     it('should have at least admin and regular roles', (done) => {
//       let returnedArray;
//       let check, test = false;
//       supertest(testserver)
//         .get('/api/roles')
//         .set('authorization', adminToken)
//         .end((err, res) => {
//           returnedArray = res.body;
//           console.log('returned array-------------------------', returnedArray);
//           returnedArray.forEach((item) => {
//             if (item.title === 'admin') {
//               test = true;
//             }
//             if (item.title === 'regular') {
//               check = true;
//             }
//           });
//           expect(test).to.be.true;
//           expect(check).to.be.true;
//           done();
//         });
//     });
//     it('should not be able to create a role without a title', (done) => {
//       supertest(testserver)
//         .post('/api/roles')
//         .send({ title: '' })
//         .set('authorization', adminToken)
//         .end((err, res) => {
//           expect(res.status).to.equal(400);
//           done();
//         });
//     });
//     it('should not be able to create a role that exists', (done) => {
//       supertest(testserver)
//         .post('/api/roles')
//         .send({ title: 'admin' })
//         .set('authorization', adminToken)
//         .end((err, res) => {
//           console.log('res is', res);
//           expect(res.status).to.equal(409);
//           expect(res.body.message).to.equal('Role already exists');
//           done();
//         });
//     });
//     it('should get one role', (done) => {
//       supertest(testserver)
//         .get('/api/roles/1')
//         .set('authorization', adminToken)
//         .end((err, res) => {
//           expect(res.status).to.equal(200);
//           done();
//         });
//     });
//     it('should get an error if role does not exist', (done) => {
//       supertest(testserver)
//         .get('/api/roles/56788')
//         .set('authorization', adminToken)
//         .end((err, res) => {
//           expect(res.status).to.equal(404);
//           done();
//         });
//     });
//     it('should be able to update a role with a title', (done) => {
//       supertest(testserver)
//         .put(`/api/roles/${newUserId}`)
//         .set('authorization', adminToken)
//         .send({ title: 'uregular' })
//         .end((err, res) => {
//           expect(res.status).to.equal(200);
//           done();
//         });
//     });
//     it('should not be able to update a role that doesnt exist', (done) => {
//       supertest(testserver)
//         .put('/api/roles/5345345')
//         .set('authorization', adminToken)
//         .send({ title: 'ureg' })
//         .end((err, res) => {
//           expect(res.status).to.equal(404);
//           done();
//         });
//     });
//
//     it('should not be able to update a role if title is empty', (done) => {
//       supertest(testserver)
//         .put(`/api/roles/${newUserId}`)
//         .set('authorization', adminToken)
//         .send({ title: '' })
//         .end((err, res) => {
//           expect(res.status).to.equal(404);
//           done();
//         });
//     });
//
//     it('Should be able to delete role', (done) => {
//       supertest(testserver)
//         .delete(`/api/roles/${newUserId}`)
//         .set('authorization', adminToken)
//         .end((err, res) => {
//           expect(res.status).to.equal(200);
//           expect(res.body.message).to.equal('Succesfully deleted role');
//           done();
//         });
//     });
//
//     it('Should not be able to delete non-existing role', (done) => {
//       supertest(testserver)
//         .delete('/api/roles/90000')
//         .set('authorization', adminToken)
//         .end((err, res) => {
//           expect(res.status).to.equal(404);
//           done();
//         });
//     });
//   });
//   describe('USERS', () => {
//     console.log('uesr', anotherUser);
//     before((done) => {
//       supertest(testserver)
//         .post('/api/users/signup')
//         .send(anotherUser)
//         .end((err, res) => {
//           console.log('response', res.error);
//           userToken = res.body.token;
//           expect(res.status).to.equal(201);
//           done();
//         });
//     });
//
//     it('Should not be able to create new role', (done) => {
//       console.log(userToken);
//       supertest(testserver)
//         .post('/api/roles')
//         .set('authorization', userToken)
//         .send({ title: 'newerrole' })
//         .end((err, res) => {
//           expect(res.status).to.equal(401);
//           done();
//         });
//     });
//
//     it('GET - Should not be able to list roles', (done) => {
//       supertest(testserver)
//         .get('/api/roles')
//         .set('authorization', userToken)
//         .end((err, res) => {
//           expect(res.status).to.equal(401);
//           expect(res.body.message).to.equal('Only admins allowed');
//           done();
//         });
//     });
//
//     it('GET - Should not be able to view a single role', (done) => {
//       supertest(testserver)
//         .get(`/api/roles/${adminId}`)
//         .set('authorization', userToken)
//         .end((err, res) => {
//           expect(res.status).to.equal(401);
//           expect(res.body.message).to.equal('Only admins allowed');
//           done();
//         });
//     });
//
//     it('DELETE - not Should be able to delete role', (done) => {
//       supertest(testserver)
//         .delete(`/api/roles/${adminId}`)
//         .set('authorization', userToken)
//         .end((err, res) => {
//           expect(res.status).to.equal(401);
//           expect(res.body.message).to.equal('Only admins allowed');
//           done();
//         });
//     });
//
//   });
// });
