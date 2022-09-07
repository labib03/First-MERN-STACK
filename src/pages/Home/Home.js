import React, { useEffect, useState } from "react";
import axios from "axios";
import { WorkoutDetail } from "../../components";

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
        {workouts &&
          workouts?.data?.map((workout) => (
            <WorkoutDetail key={workout._id} workout={workout} />
          ))}
      </div>
    </div>
  );
}

export default Home;
