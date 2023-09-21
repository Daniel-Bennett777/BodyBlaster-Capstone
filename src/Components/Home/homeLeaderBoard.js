import React, { useEffect, useState } from "react";
import "./homeLeaderBoard.css";
import { completeWorkout } from "../../Services/workoutsService.js"; // Import your completeWorkout function
import { fetchUserData } from "../../Services/userService";

export const HomeLeader = () => {
  const [usersWithCoinTotal, setUsersWithCoinTotal] = useState([]);
  const [userCompletedWorkouts, setUserCompletedWorkouts] = useState([]);

  useEffect(() => {
    // Fetch user completed workouts when the component mounts on initial render
    completeWorkout()
      .then((completedWorkouts) => {
        setUserCompletedWorkouts(completedWorkouts); //completedWorkouts is value of fetch in our state array of objects 
      });
  }, []);  //empty dependency array to show when which is initial render

  useEffect(() => {
    // Calculate user coin totals
    const userCoinTotals = {}; //initialized empty onject to store total coins for each user

    for (const completedWorkout of userCompletedWorkouts) {
      const userId = completedWorkout.user.id;
      const coinTotal = completedWorkout.workout.coinTotal;  

      if (!userCoinTotals.hasOwnProperty(userId)) {
        userCoinTotals[userId] = 0;   //.hasOwnProperty checking if has a property if not I made it 0 
      }

      userCoinTotals[userId] += coinTotal; //Add coinTotal to the user's total coins
    }

     // Create an array of promises to fetch user data for each unique user ID
    const fetchUserPromises = Object.keys(userCoinTotals).map((userId) => { //use the Object.keys() method to extract the keys (in this case, userID) from the userCoinTotals object. 
      return fetchUserData(userId);      //fetching the users data 
    });

    // Wait for all user data promises to resolve
    Promise.all(fetchUserPromises) //im waiting  for all promises to resolve and all the data to come back 
      .then((userObjects) => {  //then once resolved create an array to combine user data and cointotals
        
        const updatedUsersWithCoinTotal = userObjects.map((user, index) => ({    // Create an array with user data and coin totals
          id: user.id,
          fullName: user.fullName, // Access the user's fullName
          coinTotal: userCoinTotals[Object.keys(userCoinTotals)[index]],
        }));
        //updatedUsersWithCoinTotal is an array of objects. we 

        setUsersWithCoinTotal(updatedUsersWithCoinTotal); // show new state with the newly constructed array
      });
  }, [userCompletedWorkouts]);

  return (
    <div className="leaderboard-container">
      <video autoPlay loop muted className="video-background">
        <source src="Video\pexels-tima-miroshnichenko-6389061 (Original).mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="leaderboard-content">
        <h1 className="leaderboard-text">Leaderboard</h1>
        <ul>
          {usersWithCoinTotal.map((user) => (
            <li key={user.id}>
              <span className="goldenrod-text">User: {user.fullName} - Coin Total: </span>
              <span className="goldenrod-text">{user.coinTotal}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
        