const { DataTypes, Model } = require("sequelize");
const db = require("../db");

class Trip extends Model {}

Trip.init(
  {
    tripName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date: {
      // REVIEW: I believe there's a DATE type. Google it
      type: DataTypes.STRING,
      allowNull: false,
    },
    // REVIEW: No need for the extra spaces between fields
    description: {
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

module.exports = Trip;
