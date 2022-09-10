import React, { useContext, useEffect } from "react";
import axios from "axios";
import { WorkoutDetail, WorkoutForm } from "../../components";
import { WorkoutsContext } from "../../context/WorkoutsContext";
import { useAutoAnimate } from "@formkit/auto-animate/react";

function Home() {
  const { state, dispatch } = useContext(WorkoutsContext);
  const [parent] = useAutoAnimate();

  useEffect(() => {
    async function getWorkouts() {
      const response = await axios.get("http://localhost:4000/api/workout");
      dispatch({ type: "SET_WORKOUTS", payload: response?.data });
    }

    getWorkouts();
  }, [dispatch]);

  console.log(state);

  return (
    <div className="home">
      <div ref={parent} className="workouts">
        <span>Total Workout : {state?.workouts?.total} Workouts</span>
        {state?.workouts && state?.workouts?.data?.length > 0 ? (
          state?.workouts?.data?.map((workout) => (
            <WorkoutDetail key={workout._id} workout={workout} />
          ))
        ) : (
          <div className="empty">Tidak Ada Data</div>
        )}
      </div>
      <WorkoutForm />
    </div>
  );
}

export default Home;
