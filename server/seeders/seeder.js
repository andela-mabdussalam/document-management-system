const faker = require('faker');
const model = require('../models');
const bcrypt = require('bcrypt-nodejs');

/**
 * seedData class to generate test user data
 */
class seedData {

  /**
   * @method constructor
   */
  constructor() {
    this.model = model;
  }

  /**
   * Initialize the order of running the seed.
   * @returns {void}
   */
  init() {
    this.model.sequelize.sync({ force: true })
      .then(() => {
        this.seedRoles()
          .then(() => {
            this.seedUsers()
              .then(() => {
                this.seedDocuments();
              })
              .catch(err => console.log(`seed documents error: ${err}`));
          })
          .catch(err => console.log(`seed users error: ${err}`));
      })
      .catch(err => console.log(`seed roles error: ${err}`));
  }

  /**
   * Creates roles in the database
   * @method seedRoles
   * @returns {object} roles data
   */
  seedRoles() {
    const roles = [
      {
        title: 'admin'
      },
      {
        title: 'regular'
      }
    ];
    return this.model.Roles.bulkCreate(roles);
  }

  /**
   * Create users in the database
   * @method seedUsers
   * @returns {object} users data
   */
  seedUsers() {
    const users = [
      {
        userName: 'admin',
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: 'mannah@dms.com',
        password: bcrypt.hashSync('admin'),
        roleId: 1
      },
      {
        userName: 'regular',
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: 'mannaher@dms.com',
        password: bcrypt.hashSync('regular'),
        roleId: 2
      }
    ];
    return this.model.Users.bulkCreate(users);
  }

  /**
   * Create documents in the database
   * @method seedDocuments
   * @returns {object} documents data
   */
  seedDocuments() {
    const documents = [
      {
        title: faker.lorem.word(),
        content: faker.lorem.sentences().slice(0, 50),
        OwnerId: 2,
        access: 'public'
      },
      {
        title: faker.lorem.word(),
        content: faker.lorem.sentences().slice(0, 50),
        OwnerId: 1,
        access: 'private'
      }
    ];
    return this.model.Documents.bulkCreate(documents);
  }
}

module.exports = new seedData().init();
