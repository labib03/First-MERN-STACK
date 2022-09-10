import { createContext, useReducer } from "react";

export const WorkoutsContext = createContext();

const initialState = {
  workouts: null,
};

const workoutsReducer = (state, action) => {
  switch (action.type) {
    case "SET_WORKOUTS":
      return { workouts: action.payload };
    case "CREATE_WORKOUT":
      return {
        workouts: {
          ...state.workouts,
          total: action.payload.total,
          data: [action.payload.newWorkout, ...state.workouts.data],
        },
      };
    case "DELETE_WORKOUT":
      const filteredWorkouts = state.workouts.data.filter(
        ({ _id }) => _id !== action.payload.dataDeleted._id
      );

      return {
        workouts: {
          ...state.workouts,
          total: action.payload.total,
          data: filteredWorkouts,
        },
      };
    default:
      return state;
  }
};

export const WorkoutsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(workoutsReducer, initialState);

  return (
    <WorkoutsContext.Provider value={{ state, dispatch }}>
      {children}
    </WorkoutsContext.Provider>
  );
};
