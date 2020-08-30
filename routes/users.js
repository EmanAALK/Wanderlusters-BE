const express = require("express");
// router is not an import, create it under your imports
const router = express.Router();
const { signup, signin } = require("../controllers/userController");
const passport = require("passport");

// REVIEW: Add a space between routers

router.post("/signup", signup);
router.post(
  "/signin",
  passport.authenticate("local", { session: false }),
  signin
);

module.exports = router;
