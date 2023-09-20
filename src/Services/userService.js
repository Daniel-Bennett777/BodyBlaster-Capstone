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

  export const getUserByCointTotal = (coinTotal) => {
  return fetch (`http://localhost:8088/users?coinTotal=${coinTotal}`).then((res) =>
  res.json()
)
}

export const getCointTotal = (user) => {
  return fetch (`http://localhost:8088/users?${user.coinTotal}`).then((res) =>
  res.json()
)
}

export const postCompletedWorkout = async (userId, workoutId) => {
  try {
    const response = await fetch(`http://localhost:8088/userCompletedWorkouts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId, workoutId }),
    });

    if (!response.ok) {
      throw new Error('Failed to post completed workout');
    }

    // Optionally, you can handle success or update state here.
  } catch (error) {
    console.error('Error posting completed workout:', error);
  }
};