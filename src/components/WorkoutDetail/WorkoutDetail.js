import axios from "axios";
import React, { useContext } from "react";
import { WorkoutsContext } from "../../context/WorkoutsContext";
import "./style.css";
import formatDistanceToNow from "date-fns/formatDistanceToNow";

function WorkoutDetail(props) {
  const { workout } = props;
  const { dispatch } = useContext(WorkoutsContext);

  const removeHandler = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:4000/api/workout/${workout._id}`
      );
      dispatch({ type: "DELETE_WORKOUT", payload: response.data });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="workout-details">
      <h4>{workout.title}</h4>
      <p>
        <strong>Load (kg):</strong> {workout.load}
      </p>
      <p>
        <strong>Reps:</strong> {workout.reps}
      </p>
      <p>
        {formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}
      </p>
      <span onClick={removeHandler}>Remove</span>
    </div>
  );
}

export default WorkoutDetail;
