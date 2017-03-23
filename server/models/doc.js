
module.exports = (sequelize, DataTypes) => {
  const Doc = sequelize.define('Doc', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Title field has not been filled'
        }
      }
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Content field is empty'
        }
      }
    },
    OwnerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: {
          msg: 'OwnerId must be an integer'
        }
      }
    },
    access: {
      type: DataTypes.STRING,
      defaultValue: 'public'
    }
  },
    {
      classMethods: {
        associate: (models) => {
          Doc.belongsTo(models.User, {
            foreignKey: 'ownerId',
            onDelete: 'CASCADE',
          });
        }
      }
    });
  return Doc;
};
