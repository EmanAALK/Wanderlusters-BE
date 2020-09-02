const express = require("express");
const passport = require("passport");
const {
  tripList,
  tripUpdate,
  tripDelete,
  fetchTrip,
} = require("../controllers/tripController");
const upload = require("../middleware/multer");
const router = express.Router();

router.param("tripId", async (req, res, next, tripId) => {
  const trip = await fetchTrip(tripId, next);
  if (trip) {
    req.trip = trip;
    next();
  } else {
    const error = new Error("Trip Not Found");
    error.status = 404;
    next(error);
  }
});

router.get("/", tripList);
router.put(
  "/:tripId",
  passport.authenticate("jwt", { session: false }),
  upload.single("image"),
  tripUpdate
);
router.delete(
  "/:tripId",
  passport.authenticate("jwt", { session: false }),
  tripDelete
);

module.exports = router;
