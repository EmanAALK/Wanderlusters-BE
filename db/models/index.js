const Profile = require("./Profile");
const Trip = require("./Trip");
const User = require("./User");

// User-Profile Relation
User.hasOne(Profile, { as: "profile", foreignKey: "userId" });
Profile.belongsTo(User, { as: "user", foreignKey: "userId" });

// Profile-Trip Relation
// Profile.hasMany(Trip, { as: "trips", foreignKey: "profileId" });
Trip.belongsTo(Profile, { as: "profile", foreignKey: "profileId" });

// User-Trip Relation
User.hasMany(Trip, { as: "trips", foreignKey: "userId" });
Trip.belongsTo(User, { as: "user" });

module.exports = { Profile, Trip, User };
