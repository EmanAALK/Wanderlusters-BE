const express = require("express");

const {
  fetchProfiles,
  profileCreate,
  profileList,
  profileUpdate,
  tripCreate,
} = require("../controllers/profileController");

const upload = require("../middleWare/multer");
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

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  upload.single("image"),
  profileCreate
);

router.put(
  "/:profileId",
  passport.authenticate("jwt", { session: false }),
  upload.single("image"),
  profileUpdate
);

// Trip Creation Route

router.post(
  "/:profileId/trips",
  passport.authenticate("jwt", { session: false }),
  upload.single("image"),
  tripCreate
);

module.exports = router;
