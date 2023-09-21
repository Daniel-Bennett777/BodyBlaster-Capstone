import React, { useEffect, useState } from "react";
import { getAllWorkouts } from "../../Services/workoutsService";
import "./workouts.css";
import { CoinIcon } from "../coinIcon";
import { postCompletedWorkout } from "../../Services/userService.js";
import { useNavigate } from "react-router-dom";

export const WorkoutTickets = ({ currentUser }) => {
  const [workouts, setWorkouts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getAllWorkouts().then((data) => {
      setWorkouts(data);
    });
  }, []);

  const handleComplete = (workoutId) => {
    postCompletedWorkout(currentUser.id, workoutId).then(() => {
      navigate("/completedWorkouts");
    });
  };

  return (
    <div className="workouts-container">
      <h1 className="workouts-title">Workouts</h1>
      <div className="workouts-list">
        {workouts.map((exercise) => (
          <div key={exercise.id} className="workout-ticket">
            <div className="workout-info">
              <h2 className="workout-title">{exercise.title}</h2>
              <p className="workout-description">{exercise.description}</p>
              <p className="workout-coinTotal">
                <CoinIcon />
                {exercise.coinTotal}
              </p>
              <p className="workout-type">
                Type: {exercise.type.TypeName}
              </p>
            </div>
            <div className="button-container">
              <button
                className="complete-button"
                onClick={() => handleComplete(exercise.id)}
              >
                Complete
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="total-coins"></div>
    </div>
  );
};






