'use strict';
const faker = require('faker');

module.exports = {
  up: function (queryInterface, Sequelize) {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('Person', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
      return queryInterface.bulkInsert('Users', [{
        userName: 'admin',
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: 'mannah@dms.com',
        password: bcrypt.hashSync('admin'),
        roleId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userName: 'regular',
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: 'mannaher@dms.com',
        password: bcrypt.hashSync('regular'),
        roleId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      }]);
  },

  down: function (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
    return queryInterface.bulkDelete('Users', null, {});
  }
};
