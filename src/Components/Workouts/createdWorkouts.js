import React, { useState } from "react";
import { createWorkout } from "../../Services/workoutsService"; // Import the createWorkout function from your service
import { useNavigate } from "react-router-dom";
import "./createdWorkouts.css"

export const CreateWorkoutForm = () => {
  const [workoutData, setWorkoutData] = useState({
    title: "",
    description: "",
    coinTotal: 0,
    typeId: 1, // Set the default typeId here
  });
  const navigate = useNavigate();
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setWorkoutData({
      ...workoutData,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  
    // Call the createWorkout function to send the data to the server
    createWorkout(workoutData)
      .then(() => {
         
         navigate("/workouts")
        // Reload the page after creating the workout
        window.location.reload();
      });
  };
//htmlFor is used here which 
  return (
    <form onSubmit={handleSubmit} className="created-workouts-form">
  <h2 className="created-workouts-heading">Create a New Workout</h2>
  <div className="created-workouts-input">
    <label>Title:</label>
    <input
      type="text"
      id="title"
      name="title"
      value={workoutData.title}
      onChange={handleInputChange}
      className="created-workouts-input-field"
      required
    />
  </div>
  <div className="created-workouts-input">
    <label>Description:</label>
    <textarea
      id="description"
      name="description"
      value={workoutData.description}
      onChange={handleInputChange}
      className="created-workouts-input-field"
    />
  </div>
  <div className="created-workouts-input">
    <label>Coin Total:</label>
    <input
      type="number"
      id="coinTotal"
      name="coinTotal"
      value={workoutData.coinTotal}
      onChange={handleInputChange}
      className="created-workouts-input-field"
    />
  </div>
  <div className="created-workouts-input">
    <label>Type ID:</label>
    <select
      id="typeId"
      name="typeId"
      value={workoutData.typeId}
      onChange={handleInputChange}
      className="created-workouts-input-field"
    >
      <option value={1}>Beginner</option>
      <option value={2}>Intermediate</option>
      <option value={3}>Advanced</option>
    </select>
  </div>
  <button type="submit" className="created-workouts-button">Create Workout</button>
</form>

);
}