module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    userName: {
      unique: true,
      allowNull: false,
      type: DataTypes.STRING
    },
    firstName: {
      allowNull: false,
      type: DataTypes.STRING
    },
    lastName: {
      allowNull: false,
      type: DataTypes.STRING
    },
    email: {
      unique: true,
      allowNull: false,
      type: DataTypes.STRING
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING
    },
    roleId: {
      allowNull: false,
      type: DataTypes.INTEGER
    }
  },
    {
      classMethods: {
        associate: (models) => {
          User.belongsTo(models.Role, {
            foreignKey: 'roleId',
            onDelete: 'CASCADE',
          });

          User.hasMany(models.Doc, {
            foreignKey: 'ownerId',
          });
        }
      }
    });
  return User;
};
