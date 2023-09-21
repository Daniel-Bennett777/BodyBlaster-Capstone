import React, { useEffect, useState } from "react";
import { completeWorkout } from "../../Services/workoutsService";
import { CoinIcon } from "../coinIcon";
import { deleteWorkout } from "../../Services/workoutsService";

export const CompletedWorkouts = ({ currentUser }) => {
  const [completedWorkouts, setCompletedWorkouts] = useState([]);

  useEffect(() => {
    // Fetch completed workouts, including completion dates
    completeWorkout(currentUser.id).then((completeArray) => {
      setCompletedWorkouts(completeArray);
    });
  }, [currentUser]);

  const handleDelete = (userCompletedWorkoutId) => {
    // Call the deleteWorkout function to delete the completed workout
    deleteWorkout(userCompletedWorkoutId).then(() => {
      // Reload the page after deleting the completed workout
      window.location.reload();
    });
  };

  // Initialize an array to store filtered completed workouts
  const filteredCompletedWorkouts = [];

  // Loop through completedWorkouts and filter by currentUser.id
  for (const completedWorkout of completedWorkouts) {
    if (completedWorkout.userId === currentUser.id) {
      filteredCompletedWorkouts.push(completedWorkout);
    }
  }

  return (
    <div className="workouts-container">
      <h1 className="workouts-title">Completed Workouts</h1>
      <div className="workouts-list">
        {filteredCompletedWorkouts.map((completedWorkout) => (
          <div key={completedWorkout.id} className="workout-ticket">
            <div className="workout-info">
              <h2 className="workout-title">
                {completedWorkout.workout.title}
              </h2>
              <p className="workout-description">
                {completedWorkout.workout.description}
              </p>
              <p className="workout-coinTotal">
                <CoinIcon />
                {completedWorkout.workout.coinTotal}
              </p>
            </div>
            <div className="button-container">
              <button
                className="delete-button"
                onClick={() =>
                  handleDelete(completedWorkout.id)
                }
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};