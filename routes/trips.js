const express = require("express");
const passport = require("passport");
const {
  tripList,
  // itemUpdate,
  // itemDelete,
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
    const error = new Error("Item Not Found");
    error.status = 404;
    next(error);
  }
});

router.get("/", tripList);
// router.put(
//   "/:itemId",
//   passport.authenticate("jwt", { session: false }),
//   upload.single("image"),
//   itemUpdate
// );
// router.delete(
//   "/:itemId",
//   passport.authenticate("jwt", { session: false }),
//   itemDelete
// );

module.exports = router;
