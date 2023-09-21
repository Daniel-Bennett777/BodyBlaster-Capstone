export const getUserByEmail = (email) => {
  return fetch(`http://localhost:8088/users?email=${email}`).then((res) =>
    res.json()
  )
}
  export const createUser = (customer) => {
    return fetch("http://localhost:8088/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(customer),
    }).then((res) => res.json())
  }

  export const fetchUsers = () => {
    return fetch("http:localhost:8088/users").then((res) => 
    res.json()
    )
  }

  





export const postCompletedWorkout = (userId, workoutId) => {
  return fetch(`http://localhost:8088/userCompletedWorkouts`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ userId, workoutId }),
  })
    .then((res) => res.json())
}


export const fetchUserData = (userId) => {
  return fetch(`http://localhost:8088/users/${userId}`)
    .then((response) => response.json());
};