const { DataTypes, Model } = require("sequelize");
const db = require("../db");
const SequalizeSlugify = require("sequelize-slugify");

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

    slug: {
      type: DataTypes.STRING,
      unique: true,
    },
  },

  {
    sequelize: db,
  }
);

SequalizeSlugify.slugifyModel(Profile, { source: ["nickName"] });
module.exports = Profile;
