const { DataTypes, Model } = require("sequelize");
const db = require("../db");

class Profile extends Model {}

Profile.init(
  {
    nickName: {
      type: DataTypes.STRING,
      unique: true,
    },
    bio: {
      type: DataTypes.STRING,
    },
    image: {
      type: DataTypes.STRING,
    },
  },

  {
    sequelize: db,
  }
);

module.exports = Profile;
