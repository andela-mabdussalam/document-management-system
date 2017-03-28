/* eslint-disable no-unused-expressions */

import { expect } from 'chai';
import { fakeRoles } from '../helper';
import DB from '../../models/';

describe('ROLE MODEL', () => {
  let fakeRole;
  before((done) => {
    fakeRole = fakeRoles();
    DB.sequelize.sync({ force: true })
      .then(() => {
        done();
      });
  });
  after(() => DB.sequelize.sync({ force: true }));

  describe('ROLE', () => {
    it('should be able to create a role', (done) => {
      DB.Roles.create(fakeRole)
        .then((roleCreated) => {
          expect(roleCreated).to.exist;
          expect(typeof roleCreated).to.equal('object');
          done();
        });
    });
    it('should create a new role with title', (done) => {
      expect(fakeRole).to.include.keys('title');
      done();
    });
    it('should not create a role if title is empty', () => {
      return DB.Roles.create()
        .catch((error) => {
          expect(/notNull Violation/.test(error.message)).to.be.true;
        });
    });
    it('should not create a roles are unique', () => {
      return DB.Roles.create(fakeRole)
        .catch((error) => {
          expect(/Validation error/.test(error.message)).to.be.true;
        });
    });
  });
});
