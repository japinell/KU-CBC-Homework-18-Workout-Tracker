//
// Required libraries
//
const router = require("express").Router();
const path = require("path");
const Workout = require("../models/Workout.js");
//
// Handles the posting of a single workout
//
router.post("/api/workouts", ({ body }, res) => {
  Workout.create(body)
    .then((document) => {
      res.json(document);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});
//
// Handles the update of a single workout
//
router.put("/api/workouts/:id", (req, res) => {
  Workout.update({ _id: req.params.id }, { $push: { exercises: req.body } })
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
//
// Handles the retrieval of the page to post a workout
//
router.get("/exercise", function (req, res) {
  res.sendFile(path.join(__dirname, "../public/exercise.html"));
});

module.exports = router;
