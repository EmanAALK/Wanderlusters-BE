const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Database
const { User, Trip, Profile } = require("../db/models");
const { JWT_SECRET, JWT_EXPIRATION_MS } = require("../config/keys");

exports.signup = async (req, res, next) => {
  try {
    const { password } = req.body;

    const saltRounds = 10;

    const hashedPassword = await bcrypt.hash(password, saltRounds);
    req.body.password = hashedPassword;
    const newUser = await User.create(req.body);
    const payload = {
      id: newUser.id,
      username: newUser.username,
      email: newUser.email,
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      //   image: newUser.image,

      exp: Date.now() + JWT_EXPIRATION_MS,
    };
    req.body.userId = newUser.id;
    const newProfile = await Profile.create(req.body);
    console.log("userProfile", newProfile);
    const token = jwt.sign(JSON.stringify(payload), JWT_SECRET);
    res.status(201).json({ token });
  } catch (error) {
    next(error);
  }
};

exports.signin = async (req, res, next) => {
  const { user } = req;
  const trip = await Trip.findOne({ where: { userId: user.id } });

  const payload = {
    id: user.id,
    username: user.username,

    exp: Date.now() + JWT_EXPIRATION_MS,
  };
  const token = jwt.sign(JSON.stringify(payload), JWT_SECRET);
  res.json({ token });
};

// we used to have a slug before because we used it for the URL, we don't use URLs in mobile apps.
