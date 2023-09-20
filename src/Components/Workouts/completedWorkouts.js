import { useEffect, useState } from "react";
import { completeWorkout } from "../../Services/workoutsService";
import { getAllWorkouts } from "../../Services/workoutsService"; // Assuming you have a service to fetch original workouts
import { CoinIcon } from "../coinIcon";

export const CompletedWorkouts = ({ currentUser }) => {

  const [completedWorkouts, setCompletedWorkouts] = useState([]);
  const [workouts, setWorkouts] = useState([]); // Store all workouts here

  useEffect(() => {
    // Fetch completed workouts
    completeWorkout(currentUser.id).then((completeArray) => {
      setCompletedWorkouts(completeArray);
    });


    getAllWorkouts().then((workoutArray) => {
      setWorkouts(workoutArray);
    });
  }, [currentUser]);
  // Filter completed workouts that match userCompletedWorkouts
  const completedWorkoutDetails = completedWorkouts
  .filter((completedWorkout) => completedWorkout.userId === currentUser.id)
  .map((completedWorkout) => {
    const matchingWorkout = workouts.find((workout) => workout.id === completedWorkout.workoutId);
    if (matchingWorkout) {

      return (
        <div key={matchingWorkout.id} className="workout-ticket">
          <div className="workout-info">
            <h2 className="workout-title">{matchingWorkout.title}</h2>
            <p className="workout-description">{matchingWorkout.description}</p>
            <p className="workout-coinTotal">
              <CoinIcon />
              {matchingWorkout.coinTotal}
            </p>
            {completedWorkout.completedAt && (
                    <p>Completed on: {new Date(completedWorkout.completedAt).toLocaleDateString()}</p>
                  )}
          </div>
        </div>
      );
    }
    return null; // Skip if no matching workout found
  });

  return (
    <div className="workouts-container">
      <h1 className="workouts-title">Completed Workouts</h1>
      <div className="workouts-list">{completedWorkoutDetails}</div>
    </div>
  );
};
