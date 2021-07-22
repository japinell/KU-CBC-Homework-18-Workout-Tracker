//
// Required libraries
//
const router = require("express").Router();
const path = require("path");
const Workout = require("../models/Workout.js");
//
// Handles the retrieval of the page to post a workout
//
router.get("/exercise", function (req, res) {
  res.sendFile(path.join(__dirname, "../public/exercise.html"));
});
//
// Handles the retrieval of the page to show the statistics
//
router.get("/stats", function (req, res) {
  res.sendFile(path.join(__dirname, "../public/stats.html"));
});
//
// Handles the retrieval of all workouts
//
router.get("/api/workouts", (req, res) => {
  Workout.find({})
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});
//
// Handles the retrieval of statistics
//
router.get("/api/workouts/range", (req, res) => {
  Workout.aggregate([
    {
      $addFields: {
        totalDuration: { $sum: "$exercises.duration" },
      },
    },
  ])
    .sort({ day: -1 })
    .limit(7)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});
//
// Handles the posting of a single workout
//
router.post("/api/workouts", ({ body }, res) => {
  Workout.create(body)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});
//
// Handles the update of a single workout
//
router.put("/api/workouts/:id", (req, res) => {
  Workout.updateOne({ _id: req.params.id }, { $push: { exercises: req.body } })
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

module.exports = router;
