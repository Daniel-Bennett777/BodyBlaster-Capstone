export const getSpecificWorkouts = (userId) => {
  return fetch(`http://localhost:8088/workouts?userId=${userId}`).then((res) => res.json());
};

export const deleteWorkout = (workoutId) => {
  return fetch(`http://localhost:8088/workouts/${workoutId}`, { method: "DELETE" })
}

  

  export const performActionOnWorkout = (userId, workoutId) => {
    const apiUrl = `http://localhost:8088/users/${userId}/workouts/${workoutId}/perform-action`;
  
    return fetch(apiUrl, {
      method: "POST", // You can use POST to indicate a non-deletion action
      headers: {
        "Content-Type": "application/json",
      },
      // You can specify any additional data needed for the action here.
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Failed to perform action on workout");
        }
      })
      .catch((error) => {
        throw new Error(error.message);
      });
  };

  export const completeWorkout = () => {
    return fetch(`http://localhost:8088/userCompletedWorkouts?_expand=workout&_expand=user`).then((res) => res.json());
  };




  export const getAllWorkouts = () => {
    return fetch(`http://localhost:8088/workouts`).then((res) => res.json());
  };




