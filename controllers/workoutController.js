const WorkoutCollection = require("../models/workoutModel");
const mongoose = require("mongoose");

// get all workout
const getWorkouts = async (req, res) => {
  const allWorkouts = await WorkoutCollection.find({}).sort({ createdAt: -1 });
  res
    .status(200)
    .json({ success: true, total: allWorkouts.length, data: allWorkouts });
};

// get single workout
const getSingleWorkout = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: `No file with id : ${id}` });
  }

  const workout = await WorkoutCollection.findById(id);

  if (!workout) {
    return res.status(404).json({ error: `No file found with id : ${id}` });
  }

  res.status(200).json(workout);
};

// post / create a workout
const createWorkout = async (req, res) => {
  const { title, load, reps } = req.body;

  try {
    const newWorkout = await WorkoutCollection.create({ title, reps, load });
    res.status(200).json(newWorkout);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// update a workout
const updateWorkout = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: `No file found with id : ${id}` });
  }

  const workout = await WorkoutCollection.findByIdAndUpdate(id, {
    ...req.body,
  });

  if (!workout) {
    return res.status(404).json({ error: `No file found with id : ${id}` });
  }

  res.status(200).json({ updated: true, data: workout });
};

// delete a workout
const deleteWorkout = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: `No file found with id : ${id}` });
  }

  const workout = await WorkoutCollection.findByIdAndDelete(id);

  if (!workout) {
    return res.status(404).json({ error: `No file found with id : ${id}` });
  }

  res.status(200).json({ delete: true, data: workout });
};

module.exports = {
  getWorkouts,
  getSingleWorkout,
  createWorkout,
  updateWorkout,
  deleteWorkout,
};
