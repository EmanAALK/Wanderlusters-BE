const bcrypt = require("bcrypt");

//Strategies
const LocalStrategy = require("passport-local").Strategy;
const JWTStrategy = require("passport-jwt").Strategy;
const { fromAuthHeaderAsBearerToken } = require("passport-jwt").ExtractJwt;

//Model
const { User } = require("../db/models");

//controller
const { JWT_SECRET } = require("../config/keys");

exports.localStrategy = new LocalStrategy(async (username, password, done) => {
  try {
    const user = await User.findOne({
      where: { username },
    });

    const passwordsMatch = user
      ? await bcrypt.compare(password, user.password)
      : false;
    return passwordsMatch ? done(null, user) : done(null, false);
  } catch (error) {
    // i believe you have to return done(error)
    // but im doubtful
    // test it by logging in with a username that doesn't exist.
    // let me know on discord how the test goes.
    done(error);
  }
});

exports.jwtStrategy = new JWTStrategy(
  {
    jwtFromRequest: fromAuthHeaderAsBearerToken(),
    secretOrKey: JWT_SECRET,
  },
  async (jwtPayload, done) => {
    if (Date.now() > jwtPayload.exp) {
      return done(null, false); // this will throw a 401
    }
    try {
      const user = await User.findByPk(jwtPayload.id);
      // return done(...)
      done(null, user); // if there is no user, this will throw a 401
    } catch (error) {
      // if the test i mentioned above tells you you need to return
      // then add return here as well
      done(error);
    }
  }
);
