import React, { useEffect, useState } from "react";
import { getAllWorkouts, updateWorkout } from "../../Services/workoutsService";
import "./workouts.css";
import { CoinIcon } from "../coinIcon";
import { postCompletedWorkout } from "../../Services/userService.js";
import { useNavigate } from "react-router-dom";

export const WorkoutTickets = ({ currentUser }) => {
  const [workouts, setWorkouts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch all workouts and set them in the state when the component mounts
    getAllWorkouts().then((data) => {
      setWorkouts(data);
    });
  }, []);

  const [editingWorkoutId, setEditingWorkoutId] = useState(null);
  const [editedTitle, setEditedTitle] = useState("");
  const [editedDescription, setEditedDescription] = useState("");

  const handleComplete = (workoutId) => {
    // Mark a workout as completed for the current user
    postCompletedWorkout(currentUser.id, workoutId).then(() => {
      navigate("/completedWorkouts");
    });
  };

  const handleEdit = (workoutId, title, description) => {
    // Trigger the editing state for a workout
    //allows the user to make changes to the title and description fields and eventually save those changes
    setEditingWorkoutId(workoutId);
    setEditedTitle(title);
    setEditedDescription(description);
  };

  const handleSave = (workoutId) => {
    // Update the workout with the edited title and description
    updateWorkout(workoutId, {
      title: editedTitle,
      description: editedDescription,
    })
      .then(() => {
        // Refresh the component to display the updated data
        getAllWorkouts().then((data) => {
          setWorkouts(data);
        });
        // Clear the editing state
        setEditingWorkoutId(null);  //this line sets the editingWorkoutId state to null, indicating that no workout is currently in edit mode.it will go back to displaying workout details
        setEditedTitle("");
        setEditedDescription("");
      })
      //these lines ensure that the component's editing state is reset, and the UI reflects the changes made during the editing process or cancels editing,
      .catch((error) => {
        // Handle error (e.g., show an error message)
      });
  };

  const isEditing = (workoutId) => editingWorkoutId === workoutId; //checks if in editing mode
  const canEdit = (workoutUserId) => currentUser.id === workoutUserId; //indicates user can edit because currentUser.id matches workoutUserId 

  return (
    <div className="workouts-container">
      <h1 className="workouts-title">Workouts</h1>
      <div className="workouts-list">
        {workouts.map((exercise) => (
          <div key={exercise.id} className="workout-ticket">
            <div className="workout-info">
              {isEditing(exercise.id) ? (  //ternary statement checking for the mode of user 
                // Render an input field for title when in edit mode
                <input
                  type="text"
                  value={editedTitle}
                  onChange={(e) => setEditedTitle(e.target.value)}
                />
              ) : (
                // Render the workout title when not in edit mode
                <h2 className="workout-title">{exercise.title}</h2>
              )}
              {isEditing(exercise.id) ? (
                // Render an input field for description when in edit mode
                <input
                  type="text"
                  value={editedDescription}
                  onChange={(e) => setEditedDescription(e.target.value)}
                />
              ) : (
                // Render the workout description when not in edit mode
                <p className="workout-description">{exercise.description}</p>
              )}
              <p className="workout-coinTotal">
                <CoinIcon />
                {exercise.coinTotal}
              </p>
              <p className="workout-type">Type: {exercise.type.TypeName}</p>
            </div>
            <div className="button-container">
              {canEdit(exercise.userId) && (
                <>
                  {isEditing(exercise.id) ? (
                    // Render a "Save" button when in edit mode
                    <button
                      className="complete-button"
                      onClick={() => handleSave(exercise.id)}
                    >
                      Save
                    </button>
                  ) : (
                    // Render an "Edit" button when not in edit mode
                    <button
                      className="complete-button"
                      onClick={() =>
                        handleEdit(exercise.id, exercise.title, exercise.description)
                      }
                    >
                      Edit
                    </button>
                  )}
                </>
              )}
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







