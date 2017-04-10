/* eslint-disable no-unused-expressions */
import bcrypt from 'bcrypt-nodejs';
import { expect } from 'chai';
import helper from '../helper';
import DB from '../../models/';

const userParams = helper.testUser();
const anotherUser = helper.testUser();
const secondUser = helper.testUser();
const thirdUser = helper.testUser();
const roleParams = helper.adminRole();
const userRole = helper.regularRole();
let user;
const requiredFields = ['userName', 'firstName', 'lastName', 'email',
  'password', 'RoleId'];
const uniqueFields = ['userName', 'email'];


describe('USER MODEL', () => {
  before((done) => {
    DB.sequelize.sync({ force: true }).then(() => {
      done();
    });
  });

  after(() => DB.sequelize.sync({ force: true }));

  it('should be able to create a user', (done) => {
    DB.Roles.bulkCreate([roleParams, userRole], {
      returning: true
    }).then((createdRoles) => {
      userParams.roleId = createdRoles[0].id;
      DB.Users.create(userParams).then((createdUser) => {
        user = createdUser;
        expect(user).to.exist;
        done();
      });
    });
  });
  it('should confirm that a created user has firstname', () => {
    expect(user.firstName).to.equal(userParams.firstName);
  });
  it('should confirm that a created user has a lastName', () => {
    expect(user.lastName).to.equal(userParams.lastName);
  });
  it('should confirm that a created user has a username', () => {
    expect(user.userName).to.equal(userParams.userName);
  });
  it('should confirm that a created user has an email', () => {
    expect(user.email).to.equal(userParams.email);
  });
  it('should confirm that created user has a hashed password ', () => {
    expect(bcrypt.compareSync(userParams.password,
      user.dataValues.password)).to.be.true;
  });
  it('should create a user with a role ', () => {
    DB.Users.findById(user.id, { include: [DB.Roles] })
      .then((returnedUser) => {
        expect(returnedUser.Role.title).to.equal(roleParams.title);
      });
  });
  it('should update an existing user ', (done) => {
    DB.Users.findById(user.id)
      .then(returnedUser => returnedUser.update({ userName: 'Manny' }))
      .then((updatedUser) => {
        expect(updatedUser.userName).to.equal('Manny');
        done();
      });
  });
  describe('Required Fields', () => {
    requiredFields.forEach((field) => {
      it(`requires ${field} field to create a user`, () => {
        anotherUser[field] = null;
        return DB.Users.create(anotherUser).catch((error) => {
          expect(/notNull Violation/.test(error.message)).to.be.true;
        });
      });
    });
  });

  describe('Unique Fields', () => {
    uniqueFields.forEach((field) => {
      it(`requires ${field} field to be Unique`, () => {
        return DB.Users.create(userParams)
          .catch((error) => {
            expect(/UniqueConstraintError/.test(error.name)).to.be.true;
          });
      });
    });
  });

  describe('Mail Validation', () => {
    it('requires user mail to be authentic', () => {
      secondUser.email = 'mariam yahoo';
      return DB.Users.create(secondUser)
        .catch((error) => {
          expect(/Validation error: Validation isEmail failed/
            .test(error.message)).to.be.true;
        });
    });
  });

  describe('Password Validation', () => {
    it('should be valid if compared', () => {
      DB.Users.create(thirdUser)
        .then((createdUser) => {
          expect(createdUser.validatePassword(thirdUser.password)).to.be.true;
        });
    });
  });
});
