require("dotenv").config();
const express = require("express");
const workoutRoutes = require("./routes/workout");
const userRoutes = require("./routes/user");
const mongoose = require("mongoose");
const cors = require("cors");

// init
const app = express();
const PORT = process.env.PORT;
const MONGO_URL = process.env.MONGO_URL;

// midleware
app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// routes
app.use("/api/workout", workoutRoutes);
app.use("/api/user", userRoutes);

// connect to db
mongoose
  .connect(MONGO_URL)
  .then(() => {
    // listen app
    app.listen(PORT, () => {
      console.log(
        `connect to databases & listening on http://localhost:${PORT}/`
      );
    });
  })
  .catch((err) => {
    console.log(err);
  });
