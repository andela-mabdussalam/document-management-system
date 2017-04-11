const bycrypt = require('bcrypt-nodejs');

module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define('Users', {
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
      validate: {
        isEmail: true
      },
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
          Users.belongsTo(models.Roles, {
            foreignKey: 'roleId',
            onDelete: 'CASCADE',
          });

          Users.hasMany(models.Documents, {
            foreignKey: 'ownerId',
          });
        }
      },
      instanceMethods: {
        validatePassword(password) {
          return bycrypt.compareSync(password, this.password);
        },
        hashPassword() {
          this.password = bycrypt
            .hashSync(this.password, bycrypt.genSaltSync(9));
        }
      },
      hooks: {
        beforeCreate(user) {
          user.hashPassword();
        },
        beforeUpdate(user) {
          user.hashPassword();
        }
      }
    });
  return Users;
};
