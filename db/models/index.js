const Profile = require("./Profile");
const Trip = require("./Trip");
const User = require("./User");

// User-Profile Relation
User.hasOne(Profile, { as: "profile", foreignKey: "userId" });
Profile.belongsTo(User, { as: "user", foreignKey: "userId" });

// User-Trip Relation
User.hasMany(Trip, { as: "trips", foreignKey: "userId" });
Trip.belongsTo(User, { as: "user" });

module.exports = { Profile, Trip, User };
