import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

export const NavBar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("bodyblaster_user");
    navigate("/");
  };

  return (
    <ul className="navbar">
      <li className="navbar-item">
        <Link to="/home">Home</Link>
      </li>
      <li className="navbar-item">
      <Link to="/workouts">Workouts</Link>
      </li>
      <li className="navbar-item">
        <Link to="/createWorkout">Create Workout</Link>
      </li>
      <li className="navbar-item">
        <Link to="/completedWorkouts">Completed Workouts</Link>
      </li>
      <li className="navbar-item navbar-logout">
        <button className="navbar-link" onClick={handleLogout}>
          Logout
        </button>
      </li>
    </ul>
  );
};