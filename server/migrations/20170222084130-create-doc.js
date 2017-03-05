module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('docs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false
      },
      content: {
        type: Sequelize.STRING,
        allowNull: false
      },
      ownerId: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      access: {
        type: Sequelize.STRING,
        defaultValue: 'public'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface) => {
    return queryInterface.dropTable('docs');
  }
};
