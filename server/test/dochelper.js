import faker from 'faker';

const documents = {
  first: {
    title: faker.lorem.word(),
    content: faker.lorem.sentences().slice(0, 100),
    access: 'public',
    ownerId: 2
  },

  second: {
    title: faker.lorem.word(),
    content: faker.lorem.sentences().slice(0, 100),
    access: 'private',
    ownerId: 2
  },

  third: {
    title: faker.lorem.word(),
    content: faker.lorem.sentences().slice(0, 100),
    access: 'public',
    ownerId: 1
  },
  fourth: {
    title: faker.lorem.word(),
    content: faker.lorem.sentences().slice(0, 100),
    access: 'public',
    ownerId: 3
  },
  fifth: {
    title: faker.lorem.word(),
    content: faker.lorem.sentences().slice(0, 100),
    access: 'private',
    ownerId: 3
  },
  sixth: {
    title: faker.lorem.word(),
    content: faker.lorem.sentences().slice(0, 100),
    access: 'public',
    ownerId: 3
  },
  badDoc: {
    title: faker.lorem.words(),
    tags: ['news', 'nature', 'photography']
  },

  searchPublicDoc: {
    title: 'cooking',
    content: `cooking or cookery is the art, technology and craft of preparing
      food for consumption with the use of heat. Cooking techniques and ingredients
      vary widely across the world, from grilling food over an open fire to using
      electric stoves, to baking in various types of ovens, reflecting
      unique environmental, economic, and cultural traditions and trends.`,
    tags: ['household', 'chef', 'cooking', 'andela']
  },

  searchPrivateDoc: {
    title: 'Software',
    content: `Computer software includes computer programs, libraries and
      related non-executable data, such as online documentation or digital media.
      Computer hardware and software require each other and neither can be
      realistically used on its own.`,
    isPublic: false,
    tags: ['programming', 'code', 'software', 'andela']
  }
};

export default documents;
