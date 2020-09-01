const express = require("express");

const {
  fetchProfiles,
  profileList,
  profileUpdate,
} = require("../controllers/profileController");

const upload = require("../middleware/multer");
const passport = require("passport");

const router = express.Router();

router.param("profileId", async (req, res, next, profileId) => {
  const profile = await fetchProfiles(profileId, next);

  if (profile) {
    req.profile = profile;
    next();
  } else {
    const err = new Error("Profile Not Found");
    err.status = 404;
    next(err);
  }
});

router.get("/", profileList);

router.put(
  "/:profileId",
  passport.authenticate("jwt", { session: false }),
  upload.single("image"),
  profileUpdate
);

module.exports = router;
