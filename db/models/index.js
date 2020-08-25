const Trip = require("./Trip");
const User = require("./User");

User.hasMany(Trip, { as: "trips", foreignKey: "userId" });
Trip.belongsTo(User, { as: "user" });

module.exports = { Trip, User };
