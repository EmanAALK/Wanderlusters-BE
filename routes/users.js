const express = require("express");
const router = express.Router();
const { signup, signin, tripCreate } = require("../controllers/userController");
const passport = require("passport");
const upload = require("../middleWare/multer");

router.post("/signup", signup);
router.post(
  "/signin",
  passport.authenticate("local", { session: false }),
  signin
);
router.post(
  "/:userId/trips",
  passport.authenticate("jwt", { session: false }),
  upload.single("image"),
  tripCreate
);
module.exports = router;
