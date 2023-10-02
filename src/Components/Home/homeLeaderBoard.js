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

     // this code creates an array of promises to map over each unique useres user id gotten from userCoinTotals 
    const fetchUserPromises = Object.keys(userCoinTotals).map((userId) => { 
      return fetchUserData(userId);      // for each userId fetch data 
    });

    // Wait for all user data promises to resolve
    Promise.all(fetchUserPromises) //im waiting  for all promises to resolve and all the data to come back 
      .then((userObjects) => {  //then once resolved create an array to combine user data and cointotals
        
        const updatedUsersWithCoinTotal = userObjects.map((user, index) => ({    // Create an array with user data and coin totals
          id: user.id,
          fullName: user.fullName, // Access the user's fullName for me to use in my jsx display 
          coinTotal: userCoinTotals[Object.keys(userCoinTotals)[index]],  //object.keys(userCoinTotals) gets all keys from object and turns into array)

          //ovject.keys(userCointTotals) 
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
  {usersWithCoinTotal.map((user) => (
    <div key={user.id} className="user-container">
      <span className="goldenrod-text"> {user.fullName}</span>
      <span className="coin-container">
        <span className="goldenrod-text">Coin Total:</span>
        <span className="goldenrod-text">{user.coinTotal}</span>
      </span>
    </div>
  ))}
      </div>
    </div>
  );
};
        