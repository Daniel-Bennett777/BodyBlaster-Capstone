import React, { useEffect, useState } from "react";
import { Route, Routes, Outlet} from "react-router-dom";
import { HomeLeader } from "../Components/Home/homeLeaderBoard"; 
import { NavBar } from "../Components/Nav/Navbar";
import { WorkoutTickets } from "../Components/Workouts/workouts";
import { CompletedWorkouts } from "../Components/Workouts/completedWorkouts";
import { CreateWorkoutForm } from "../Components/Workouts/createdWorkouts";



export const ApplicationViews = () => {
  const [currentUser, setCurrentUser] = useState({});
  

  useEffect(() => {
    // Check if the current user is already stored in localStorage
    const storedUser = JSON.parse(localStorage.getItem("bodyblaster_user"));
    if (storedUser) {
      setCurrentUser(storedUser);
    }
  }, []);
  return (
    <Routes>
      <Route
        path="/home"
        element={
          <>
            <NavBar />
            <HomeLeader currentUser={currentUser} />
            <Outlet />
          </>
        }
      />
      <Route
        path="/workouts"
        element={
          <>
            <NavBar />
            <WorkoutTickets currentUser={currentUser} />
            <Outlet />
          </>
        }
      />
      <Route
        path="/completedWorkouts"
        element={
          <>
            <NavBar />
            <CompletedWorkouts currentUser={currentUser} />
            <Outlet />
          </>
        }
      />
      <Route 
      path ="/createWorkout"
      element={
        <>
        <NavBar />
        <CreateWorkoutForm currentUser ={currentUser} />
        <Outlet />
        </>
      }
      />
    
    </Routes>
  );
};