const { DataTypes, Model } = require("sequelize");
const db = require("../db");
const SequalizeSlugify = require("sequelize-slugify");

class Trip extends Model {}

Trip.init(
  {
    // call this just `name`, not `tripName`. This is already the Trip model, it won't be any other kind of name.
    tripName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },

    description: {
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

SequalizeSlugify.slugifyModel(Trip, { source: ["tripName"] });
module.exports = Trip;
