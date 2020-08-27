const { Profile, User, Trip } = require("../db/models");
// const slugify = require("slugify"); - Needs to have a Slug for Profiles

exports.fetchProfiles = async (profileId, next) => {
  try {
    const profile = await Profile.findByPk(profileId);
    return profile;
  } catch (error) {
    next(error);
  }
};

exports.profileCreate = async (req, res, next) => {
  try {
    const foundProfile = await Profile.findOne({
      where: { userId: req.user.id },
    });
    if (foundProfile) {
      const err = new Error("You already have Profile");
      err.status = 403;
      next(err);
    } else {
      if (req.file) {
        req.body.image = `${process.env.PORT ? "https" : "http"}://${req.get(
          "host"
        )}/media/${req.file.filename}`;
      }
      req.body.userId = req.user.id;
      const newProfile = await Profile.create(req.body);
      res.status(201).json(newProfile);
    }
  } catch (error) {
    next(error);
  }
};

exports.profileList = async (req, res, next) => {
  try {
    const profile = await Profile.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
      include: [
        {
          model: Trip,
          as: "trips",
          attributes: ["id"],
        },
        {
          model: User,
          as: "user",
          attributes: ["username"],
        },
      ],
    });
    res.json(profile);
  } catch (error) {
    next(error);
  }
};

exports.profileUpdate = async (req, res, next) => {
  try {
    if (req.user.id === req.profile.userId) {
      if (req.file) {
        req.body.image = `${process.env.PORT ? "https" : "http"}://${req.get(
          "host"
        )}/media/${req.file.filename}`;
      }
      await req.profile.update(req.body);
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

// Trip Creation Function (Cookie Betrays CookieShop)

// exports.tripCreate = async (req, res, next) => {
//   try {
//     if (req.user.id === req.trip.userId) {
//       if (req.file) {
//         req.body.image = `${process.env.PORT ? "https" : "http"}://${req.get(
//           "host"
//         )}/media/${req.file.filename}`;
//       }
//       req.body.tripId = req.trip.id;
//       const newTrip = await Trip.create(req.body);
//       res.status(201).json(newTrip);
//     } else {
//       const err = new Error("Unauthorized");
//       err.status = 401;
//       next(err);
//     }
//   } catch (error) {
//     next(error);
//   }
// };
