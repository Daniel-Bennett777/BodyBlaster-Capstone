import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUserByEmail } from "../../Services/userService";

export const Login = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
  
    // Get the list of users from the server
    getUserByEmail().then((users) => {
      const user = users.find((u) => u.email === email);
  
      if (user) {
        // Successfully found a user with the provided email
        localStorage.setItem(
          "bodyblaster_user",
          JSON.stringify({
            id: user.id,
            fullName: user.fullName,
          })
        );
  
        navigate("/");
      } else {
        // User not found, show an error message
        window.alert("Invalid login. Please check your email.");
      }
    });
  };

  return (
    <main className="container-login">
      <form className="form-login" onSubmit={handleLogin}>
        <h1>BodyBlaster Login</h1>
        <fieldset>
          <div className="form-group">
            <input
              type="email"
              value={email}
              onChange={(evt) => setEmail(evt.target.value)}
              className="form-control"
              placeholder="Email address"
              required
              autoFocus
            />
          </div>
        </fieldset>
        <fieldset>
          <div className="form-group">
            <button className="login-btn btn-info" type="submit">
              Sign In
            </button>
          </div>
        </fieldset>
      </form>
    </main>
  );
};