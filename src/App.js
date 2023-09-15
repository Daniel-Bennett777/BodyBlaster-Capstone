import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { Login } from "./Components/auth/Login";

export const App = () => {
  return (
    <Router>
      <Routes>
        {/* Define the login page as the root URL */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        {/* Define other routes here */}
      </Routes>
    </Router>
  );
};












