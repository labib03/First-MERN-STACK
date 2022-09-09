import axios from "axios";
import React, { useState } from "react";
import "./style.css";

export default function WorkoutForm() {
  const [workout, setWorkout] = useState({
    title: "",
    load: "",
    reps: "",
  });
  const [error, setError] = useState(null);

  const handleChange = (name, value) => {
    setWorkout({ ...workout, [name]: value });
  };

  const loadChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    handleChange(name, value);
  };

  const repsChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    handleChange(name, value);
  };

  const titleChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    handleChange(name, value);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const { title, load, reps } = workout;

    try {
      await axios.post("http://localhost:4000/api/workout", {
        title,
        load,
        reps,
      });
    } catch (error) {
      setError(error.response.data.error);
    }
  };

  return (
    <form className="create" onSubmit={submitHandler}>
      <h3>Add a new Workout</h3>

      <label>Exercise Title :</label>
      <input
        type="text"
        name="title"
        value={workout?.title}
        onChange={titleChangeHandler}
      />

      <label>Load (in kg) :</label>
      <input
        type="number"
        name="load"
        value={workout?.load}
        onChange={loadChangeHandler}
      />

      <label>Reps :</label>
      <input
        type="number"
        name="reps"
        value={workout?.reps}
        onChange={repsChangeHandler}
      />

      <button>Add Workout</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
}
