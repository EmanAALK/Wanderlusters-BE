const express = require("express");
const router = express.Router();
const { signup, signin, tripCreate } = require("../controllers/userController");
const passport = require("passport");
const upload = require("../middleware/multer");

router.post("/signup", signup);
router.post(
  "/signin",
  passport.authenticate("local", { session: false }),
  signin
);
// REVIEW: You don't need to pass the userId in the URL. the user is already passed through the jwt strategy. So trip create should be moved to the trip routes
router.post(
  "/:userId/trips",
  passport.authenticate("jwt", { session: false }),
  upload.single("image"),
  tripCreate
);
module.exports = router;
