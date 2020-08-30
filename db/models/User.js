const { DataTypes, Model } = require("sequelize");
const db = require("../db");

class User extends Model {}

User.init(
  {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: "Username already exists",
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // REVIEW: Remove extra spaces

    firstName: {
      type: DataTypes.STRING,
    },

    lastName: {
      type: DataTypes.STRING,
    },

    email: {
      type: DataTypes.STRING,
      allowNull: true, // allowNull is by default true, no need to add this line
      unique: true,
    },
  },
  {
    sequelize: db,
  }
);

module.exports = User;
