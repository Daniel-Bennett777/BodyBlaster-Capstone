import React, { useEffect, useState } from "react";
import "./homeLeaderBoard.css";
import { completeWorkout } from "../../Services/workoutsService.js"; // Import your completeWorkout function

export const HomeLeader = () => {
  const [usersWithCoinTotal, setUsersWithCoinTotal] = useState([]);
  const [userCompletedWorkouts, setUserCompletedWorkouts] = useState([]); // Assuming you have an array of completed workouts

  useEffect(() => {
    // Fetch user completed workouts
    completeWorkout()
      .then((completedWorkouts) => {
        setUserCompletedWorkouts(completedWorkouts);
      })
      .catch((error) => {
        console.error("Error fetching completed workouts:", error);
      });
  }, []);

  useEffect(() => {
    // Calculate user coin totals
    const userCoinTotals = {};

    for (const completedWorkout of userCompletedWorkouts) {
      const userId = completedWorkout.user.id;
      const coinTotal = completedWorkout.workout.coinTotal;

      if (userCoinTotals[userId] === undefined) {
        userCoinTotals[userId] = 0;
      }

      userCoinTotals[userId] += coinTotal;
    }

    // Convert userCoinTotals to an array of user objects
    const updatedUsersWithCoinTotal = [];
    for (const userId in userCoinTotals) {
      updatedUsersWithCoinTotal.push({
        id: userId,
        coinTotal: userCoinTotals[userId],
      });
    }

    setUsersWithCoinTotal(updatedUsersWithCoinTotal);
  }, [userCompletedWorkouts]);


  return (
    <div className="leaderboard-container">
      <video autoPlay loop muted className="video-background">
        <source src="Video\pexels-tima-miroshnichenko-6389061 (Original).mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <h1 className="leaderboard-text">Leaderboard</h1>
      <ul>
        {usersWithCoinTotal.map((user) => (
          <li key={user.id}>
            User ID: {user.id} - Coin Total: {user.coinTotal}
          </li>
        ))}
      </ul>
    </div>
  );
};

        