module.exports = (sequelize, DataTypes) => {
  const Roles = sequelize.define('Roles', {
    title: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: true,
      validate: {
        notEmpty: {
          msg: 'Title cannot be empty'
        }
      }
    }
  },
    {
      classMethods: {
        associate: (models) => {
          Roles.hasMany(models.Users, {
            foreignKey: 'roleId'
          });
        }
      }
    });
  return Roles;
};
