import React, { useEffect, useState } from "react";
import { deleteWorkout, getSpecificWorkouts } from "../../Services/workoutsService";
import "./workouts.css"
import { CoinIcon } from "../coinIcon";
import { postCompletedWorkout } from "../../Services/userService";

export const WorkoutTickets = ({ currentUser }) => {
  const [workouts, setWorkouts] = useState([]);
  const [showCompleted, setShowCompleted] = useState(false); 
  const [totalCoins, setTotalCoins] = useState(0);
  const [completedWorkouts, setCompletedWorkouts] = useState([]);
  

  useEffect(() => {
    // Fetch user-specific workouts for the logged-in user
    if (currentUser && currentUser.id) { // checking currentUser is defined and has an 'id' property
      getSpecificWorkouts(currentUser.id).then((data) => {
        // Filter workouts to get only those with matching userId
        const userWorkouts = data.filter((workout) => workout.userId === currentUser.id);
        setWorkouts(userWorkouts);
      });
    }
  }, [currentUser]);
  useEffect(() => {
    // Calculate total coins whenever workouts change
    const newTotalCoins = workouts.reduce((sum, workout) => {
      if (workout.isCompleted) {
        return sum + workout.coinTotal;
      }
      return sum;
    }, 0);

    setTotalCoins(newTotalCoins);
  }, [workouts]);

  const handleDelete = (workoutId) => {
    
       deleteWorkout(workoutId)
       .then(() => {
        // Optionally update the state or perform other actions here.
      })
      .catch((error) => {
        console.error("Failed to delete workout: ", error);
      });
  
      // You can optionally update the state or perform other actions here.
  };
  

  const handleComplete = async (workoutId) => {
    // Toggle the isCompleted state locally
    setWorkouts((prevWorkouts) => {
      return prevWorkouts.map((workout) => {
        if (workout.id === workoutId) {
          return {
            ...workout,
            isCompleted: !workout.isCompleted,
          };
        }
        return workout;
      });
    });
  
    // Post the completed workout to the userCompletedWorkouts
    await postCompletedWorkout(currentUser.id, workoutId);
  };

  return (
    <div className="workouts-container">
    <h1 className="workouts-title">Workouts</h1>
    <div className="workouts-list">
      {workouts.map((workout) => (
        <div key={workout.id} className="workout-ticket">
          <div className="workout-info">
            <h2 className="workout-title">{workout.title}</h2>
            <p className="workout-description">{workout.description}</p>
            <p className="workout-coinTotal">
              <CoinIcon />
              {workout.coinTotal}
            </p>
          </div>
          <div className="button-container">
            <button className="complete-button" onClick={() => handleComplete(workout.id)}>Complete</button>
            <button className="delete-button" onClick={(e) => handleDelete(workout.id)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
    <div className="total-coins">
      Total Coins: <CoinIcon /> {totalCoins}
    </div>
  </div>
);
};