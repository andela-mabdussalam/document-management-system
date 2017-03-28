import faker from 'faker';

module.exports.createUser = () => {
  const roleId = 2;
  const user = {
    userName: faker.internet.userName(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    roleId
  };

  return user;
};
module.exports.createAdmin = () => {
  const roleId = 1;
  const user = {
    userName: faker.internet.userName(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    roleId
  };
  return user;
};
module.exports.fakeRoles = () => {
  const role = {
    title: faker.lorem.word()
  };
  return role;
};

module.exports.adminRole = () => {
  const role = {
    title: 'admin'
  };
  return role;
};
module.exports.regularRole = () => {
  const role = {
    title: 'regular'
  };
  return role;
};
module.exports.testUser = () => {
  const roleId = 2;
  const user = {
    userName: faker.internet.userName(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    roleId
  };
  return user;
};

module.exports.createDocument = () => {
  const fakeDocument = {
    title: faker.lorem.word(),
    content: faker.lorem.sentences(),
    access: 'public',
    ownerId: 1
  };
  return fakeDocument;
};
