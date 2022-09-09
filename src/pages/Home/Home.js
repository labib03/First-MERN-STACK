import React, { useEffect, useState } from "react";
import axios from "axios";
import { WorkoutDetail, WorkoutForm } from "../../components";

function Home() {
  const [workouts, setWorkouts] = useState(null);

  useEffect(() => {
    async function getWorkouts() {
      const response = await axios.get("http://localhost:4000/api/workout");
      setWorkouts(response?.data);
    }

    getWorkouts();
  }, []);

  return (
    <div className="home">
      <div className="workouts">
        {workouts && workouts?.data?.length > 0 ? (
          workouts?.data?.map((workout) => (
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
