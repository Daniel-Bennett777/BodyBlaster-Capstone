export const getSpecificWorkouts = (userId) => {
  return fetch(`http://localhost:8088/workouts?userId=${userId}`).then((res) => res.json());
};


export const deleteWorkout = (userCompletedWorkoutId) => {
  return fetch(`http://localhost:8088/userCompletedWorkouts/${userCompletedWorkoutId}`, { method: "DELETE" })
}

  

  export const completeWorkout = () => {
    return fetch(`http://localhost:8088/userCompletedWorkouts?_expand=workout&_expand=user`).then((res) => res.json());
  };



  export const createWorkout = (workoutData) => {
    return fetch("http://localhost:8088/workouts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(workoutData),
    }).then((res) => res.json());
  };

  
  export const getAllWorkouts= () => {
    return fetch(`http://localhost:8088/workouts?_expand=type`).then((res) => res.json());
  };

  export const getWorkoutById = (workoutId) => {
    return fetch(`http://localhost:8088/workouts/${workoutId}`).then((res) => res.json());  //unused 
  };

  export const updateWorkout = (workoutId, updatedWorkoutData, currentUser) => {
    return fetch(`http://localhost:8088/workouts/${workoutId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedWorkoutData),
    }).then((res) => res.json());
  };