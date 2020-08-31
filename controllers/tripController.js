const { Trip, Profile } = require("../db/models");

exports.fetchTrip = async (tripId, next) => {
  try {
    const trip = await Trip.findByPk(tripId, {
      include: { model: Profile, as: "profile", attributes: ["userId"] },
    });
    return trip;
  } catch (error) {
    next(error);
  }
};

exports.tripList = async (req, res, next) => {
  try {
    const _trips = await Trip.findAll({
      attributes: { exclude: ["profileId", "createdAt", "updatedAt"] },
      include: {
        model: Profile,
        as: "profile",
        attributes: ["nickName"],
      },
    });
    res.json(_trips);
  } catch (error) {
    next(error);
  }
};

exports.tripUpdate = async (req, res, next) => {
  try {
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
