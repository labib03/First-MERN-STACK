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

  let emptyFields = [];

  if (!title) {
    emptyFields.push("title");
  }
  if (!load) {
    emptyFields.push("load");
  }
  if (!reps) {
    emptyFields.push("reps");
  }
  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill all field", emptyFields });
  }

  try {
    const newWorkout = await WorkoutCollection.create({ title, reps, load });
    const allWorkouts = await WorkoutCollection.find({}).sort({
      createdAt: -1,
    });
    res.status(200).json({ newWorkout, total: allWorkouts.length });
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
  const allWorkouts = await WorkoutCollection.find({}).sort({
    createdAt: -1,
  });

  if (!workout) {
    return res.status(404).json({ error: `No file found with id : ${id}` });
  }

  res
    .status(200)
    .json({ delete: true, dataDeleted: workout, total: allWorkouts.length });
};

module.exports = {
  getWorkouts,
  getSingleWorkout,
  createWorkout,
  updateWorkout,
  deleteWorkout,
};
