import supertest from 'supertest';
import { expect } from 'chai';
import createdServer from '../../config/bin/server';
import helper from '../helper';
import DB from '../../models/';
import testserver from '../../config/bin/testServer';


let server = supertest(createdServer);


describe('USER API', function () {
  this.timeout(30000);
  let badRole, adminsToken, userToken, userId,
    secondUserId, secondUsertoken;
  let newAdmin = helper.createAdmin();
  let newUser = helper.createUser();
  let secondUser = helper.createUser();

  before((done) => {
    DB.Roles.create({ title: 'admin' });
    DB.Roles.create({ title: 'regular' });
    done();
  });
  after(() => {
    DB.sequelize.sync({ force: true });
  });
  describe('Create User', () => {
    it('should create a new Admin', (done) => {
      server
        .post('/api/users/signup')
        .send(newAdmin)
        .end((err, res) => {
          adminsToken = res.body.token;
          expect(res.status).to.equal(201);
          done();
        });
    });
    it('should create a new User', (done) => {
      server
        .post('/api/users/signup')
        .send(newUser)
        .end((err, res) => {
          userToken = res.body.token;
          userId = res.body.user.id;
          expect(res.status).to.equal(201);
          done();
        });
    });
    it('should create a second User', (done) => {
      server
        .post('/api/users/signup')
        .send(secondUser)
        .end((err, res) => {
          secondUsertoken = res.body.token;
          secondUserId = res.body.user.id;
          expect(res.status).to.equal(201);
          done();
        });
    });
    it('should create unique users', (done) => {
      server
        .post('/api/users/signup')
        .send(newUser)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          done();
        });
    });

    it('should not create user if role is not valid', (done) => {
      badRole = helper.createUser();
      badRole.roleId = 6000;
      server
        .post('/api/users/signup')
        .send(badRole)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          done();
        });
    });
  });

  describe('User Login', () => {
    it('should login a registered user', (done) => {
      server
        .post('/api/users/login')
        .send({ identifier: newUser.userName, password: newUser.password })
        .end((err, res) => {
          expect(res.status).to.equal(201);
          done();
        });
    });
    it('should return a message if password is incorrect', (done) => {
      server
        .post('/api/users/login')
        .send({ identifier: newUser.userName, password: 'fsdfsdf' })
        .end((err, res) => {
          expect(res.body.errors).to.equal('Incorrect Password');
          done();
        });
    });
  });

  describe('Get all users', () => {
    it('should get all users if user is an admin', (done) => {
      server
        .get('/api/users')
        .set('authorization', adminsToken)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          done();
        });
    });
    it('should return an error if not token is set', (done) => {
      server
        .get('/api/users')
        .end((err, res) => {
          expect(res.status).to.equal(401);
          done();
        });
    });
    it('should return an error if token is invalid', (done) => {
      server
        .get('/api/users')
        .set('authorization', 'hgdfsdhf34239423nnfndsfns')
        .end((err, res) => {
          expect(res.status).to.equal(401);
          done();
        });
    });
    it('should return an error if user is not an admin', (done) => {
      server
        .get('/api/users')
        .set('authorization', userToken)
        .end((err, res) => {
          expect(res.status).to.equal(401);
          done();
        });
    });
  });

  describe('Get a user', () => {
    it('should return a specific user', (done) => {
      server
        .get(`/api/users/${userId}`)
        .set('authorization', userToken)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          done();
        });
    });
    it('should return an error if user does not exist', (done) => {
      server
        .get('/api/users/034334')
        .set('authorization', adminsToken)
        .end((err, res) => {
          expect(res.status).to.equal(401);
          done();
        });
    });
    it('should return an error if user is not logged in', (done) => {
      server
        .get(`/api/users/${userId}`)
        .set('authorization', adminsToken)
        .end((err, res) => {
          expect(res.status).to.equal(401);
          done();
        });
    });
    it('should return an error if the user is not the logged in user',
      (done) => {
        server
          .get(`/api/users/${userId}`)
          .set('authorization', adminsToken)
          .end((err, res) => {
            expect(res.status).to.equal(401);
            expect(res.body.message).to.equal('User not authorized');
            done();
          });
      });
  });
  describe('update a user', () => {
    it('should update user details for a user', (done) => {
      server
        .put(`/api/users/${userId}`)
        .set('authorization', userToken)
        .send({ userName: 'omalicha' })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          done();
        });
    });
    it('should return an error if user is not found', (done) => {
      server
        .put('/api/users/3234333')
        .set('authorization', userToken)
        .send({ userName: 'omalicha' })
        .end((err, res) => {
          expect(res.status).to.equal(404);
          done();
        });
    });
    it(`should return an error if the user is not an admin and he is
       trying to update another user`, (done) => {
      server
          .put(`/api/users/${userId}`)
          .set('authorization', secondUsertoken)
          .send({ userName: 'omalicha' })
          .end((err, res) => {
            expect(res.status).to.equal(401);
            done();
          });
    });
  });
  describe('logout a user', () => {
    it('should log a user out', (done) => {
      server
        .post('/api/users/logout')
        .end((err, res) => {
          expect(res.status).to.equal(200);
          done();
        });
    });
  });
  describe('delete a user', () => {
    it('should delete a user if user is an admin', (done) => {
      server
        .delete(`/api/users/${userId}`)
        .set('authorization', adminsToken)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          done();
        });
    });
    it('should not delete another user if user is not an admin', (done) => {
      server
        .delete(`/api/users/${userId}`)
        .set('authorization', secondUsertoken)
        .end((err, res) => {
          expect(res.status).to.equal(401);
          done();
        });
    });
    it('should return an error if user does not exist', (done) => {
      server
        .delete('/api/users/42984293')
        .set('authorization', adminsToken)
        .end((err, res) => {
          expect(res.status).to.equal(404);
          done();
        });
    });
  });
});
