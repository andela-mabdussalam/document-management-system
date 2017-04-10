/* eslint-disable no-unused-expressions */
import { expect } from 'chai';
import helper from '../helper';
import DB from '../../models';

const requiredFields = ['title', 'content', 'OwnerId', 'access'];

const documentParams = helper.createDocument();
const docs = helper.createDocument();
const userParams = helper.testUser();
describe('Document Model', function () {
  this.timeout(30000);
  let createdDocument;
  let owner;
  before((done) => {
    DB.sequelize.sync({ force: true }).then(() => {
      DB.Roles.create(helper.regularRole())
        .then((createdRole) => {
          userParams.roleId = createdRole.id;
          DB.Users.create(userParams)
            .then((createdUser) => {
              owner = createdUser;
              documentParams.OwnerId = owner.id;
              done();
            });
        });
    });
  });

  beforeEach((done) => {
    DB.Documents.create(documentParams).then((created) => {
      createdDocument = created;
      done();
    });
  });

  after(() => DB.sequelize.sync({ force: true }));

  describe('How Document Model Works', () => {
    it('should be able to create a document', (done) => {
      expect(createdDocument).to.exist;
      expect(typeof createdDocument).to.equal('object');
      done();
    });

    it('should create a document with title and content', (done) => {
      expect(createdDocument.title).to.equal(documentParams.title);
      expect(createdDocument.content).to.equal(documentParams.content);
      done();
    });

    it('should create a document with correct OwnerId', (done) => {
      expect(createdDocument.ownerId).to.equal(owner.id);
      done();
    });

    it('should create a document with publish date', (done) => {
      expect(createdDocument.createdAt).to.exist;
      done();
    });

    it('should create a document with access set to public', (done) => {
      expect(createdDocument.access).to.equal('public');
      done();
    });
  });
  describe('Document Model Validations', () => {
    describe('Required Fields Validation', () => {
      requiredFields.forEach((field) => {
        it(`requires a ${field} field to create a document`, () => {
          docs[field] = null;
          return DB.Documents.create(documentParams)
            .catch((error) => {
              expect(/notNull Violation/.test(error.message)).to.be.true;
            });
        });
      });
    });
  });
});
