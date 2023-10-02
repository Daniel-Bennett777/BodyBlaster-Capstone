import React, { useEffect, useState } from "react";
import { completeWorkout } from "../../Services/workoutsService";
import { CoinIcon } from "../coinIcon";
import { deleteWorkout } from "../../Services/workoutsService";
import "./workouts.css"
export const CompletedWorkouts = ({ currentUser }) => {
  const [completedWorkouts, setCompletedWorkouts] = useState([]); //completedWorkouts is where the data of state is stored 
//setCompletedWorkouts is my data setting function will re render my component with the new state from the fetch completeWorkout
  useEffect(() => {
    // Fetch completed workouts and all the expanded data for users and workouts 
    completeWorkout(currentUser.id).then((completeArray) => {
      setCompletedWorkouts(completeArray);
    });
  }, [currentUser]);

  const handleDelete = (userCompletedWorkoutId) => {   //userCompleted workout is my unique identifier for the one that way clicked 
    // Call the deleteWorkout function to delete the completed workout
    deleteWorkout(userCompletedWorkoutId).then(() => {
      // Reload the page after deleting the completed workout
      window.location.reload();
    });
  };

  // Initialize an array to store filtered completed workouts
  const filteredCompletedWorkouts = [];

  // Loop through completedWorkouts  
  for (const completedWorkout of completedWorkouts) {
    if (completedWorkout.userId === currentUser.id) {   //filtering through where this is true push it to my array
      filteredCompletedWorkouts.push(completedWorkout);
    }
  }

  return (
    <div className="workouts-container">
      <h1 className="workouts-title">Completed Workouts</h1>
      <div className="workouts-list">
        {filteredCompletedWorkouts.map((completedWorkout) => (  //mapping over all those completed workouts for that user in the arry   key= is unique id for each jsx element 
          <div key={completedWorkout.id}  className="workout-ticket"> 
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