const { Trip, User } = require("../db/models");

exports.fetchTrip = async (tripId, next) => {
  try {
    const trip = await Trip.findByPk(tripId, {
      include: { model: User, as: "user", attributes: ["userId"] },
    });
    return trip;
  } catch (error) {
    next(error);
  }
};

exports.tripList = async (req, res, next) => {
  try {
    // REVIEW: why is it called _trips not trips?
    const _trips = await Trip.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
      include: {
        model: User,
        as: "user",
        attributes: ["username"],
      },
    });
    res.json(_trips);
  } catch (error) {
    next(error);
  }
};

exports.tripUpdate = async (req, res, next) => {
  try {
    // REVIEW: You' don't need to check for `req.user`, if it doesn't exist jwt strategy will throw a 401 and it will never reach this controller
    if (req.user && req.user.id === req.trip.profile.userId) {
      if (req.file) {
        req.body.image = `${req.protocol}}://${req.get("host")}/media/${
          req.file.filename
        }`;
      }

      await req.trip.update(req.body);
      res.status(204).end();
    } else {
      const err = new Error("Unauthorized");
      err.status = 401;
      next(err);
    }
  } catch (error) {
    next(error);
  }
};

exports.tripDelete = async (req, res, next) => {
  try {
    if (req.user.id === req.trip.profile.userId) {
      await req.trip.destroy();
      res.status(204).end();
    } else {
      const err = new Error("Unauthorized");
      err.status = 401;
      next(err);
    }
  } catch (error) {
    next(error);
  }
};
