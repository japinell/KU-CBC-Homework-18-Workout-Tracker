//
// Required libraries
//
const router = require("express").Router();
const Workout = require("../models/Workout.js");
//
// Handles the posting of a single workout
//
router.post("/api/workout", ({ body }, res) => {
  Workout.create(body)
    .then((document) => {
      res.json(document);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});
//
// Handles the posting of multiple workouts
//
router.post("/api/workout/bulk", ({ body }, res) => {
  Workout.insertMany(body)
    .then((document) => {
      res.json(document);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});
//
// Handles the retrieval of all workouts
//
router.get("/api/workouts", (req, res) => {
  Workout.find({})
    .sort({ date: -1 })
    .then((document) => {
      res.json(document);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

module.exports = router;
