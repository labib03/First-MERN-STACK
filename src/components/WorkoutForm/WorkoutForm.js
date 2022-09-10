import axios from "axios";
import React, { useContext, useState } from "react";
import { WorkoutsContext } from "../../context/WorkoutsContext";
import "./style.css";

export default function WorkoutForm() {
  const { dispatch } = useContext(WorkoutsContext);
  const [workout, setWorkout] = useState({
    title: "",
    load: "",
    reps: "",
  });
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  const handleChange = (name, value) => {
    setEmptyFields([]);
    setError(null);
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
      const response = await axios.post("http://localhost:4000/api/workout", {
        title,
        load,
        reps,
      });
      dispatch({ type: "CREATE_WORKOUT", payload: response?.data });
      setWorkout({
        title: "",
        load: "",
        reps: "",
      });
      setError(null);
      setEmptyFields([]);
    } catch (error) {
      setError(error.response.data.error);
      setEmptyFields(error.response.data.emptyFields);
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
        className={emptyFields.includes("title") ? "error" : ""}
        onChange={titleChangeHandler}
      />

      <label>Load (in kg) :</label>
      <input
        type="number"
        name="load"
        value={workout?.load}
        className={emptyFields.includes("load") ? "error" : ""}
        onChange={loadChangeHandler}
      />

      <label>Reps :</label>
      <input
        type="number"
        name="reps"
        value={workout?.reps}
        className={emptyFields.includes("reps") ? "error" : ""}
        onChange={repsChangeHandler}
      />

      <button>Add Workout</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
}
