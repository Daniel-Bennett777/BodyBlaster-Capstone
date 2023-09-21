import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUserByEmail } from "../../Services/userService";
import "./login.css"
import { Link } from "react-router-dom";

export const Login = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();


  const handleLogin = async (e) => {
    e.preventDefault();
  
    getUserByEmail(email).then((foundUsers) => {
      if (foundUsers.length === 1) {
        const user = foundUsers[0]
        
        const storedUserData = JSON.parse(localStorage.getItem("bodyblaster_user")) || {};
        user.cointotal = storedUserData.cointotal || 0;

        localStorage.setItem(
          "bodyblaster_user",
          JSON.stringify({
            id: user.id,
            fullName: user.fullName,
            email: user.email,

          })
        )
        navigate("/home")
      } else {
        window.alert("Error during login:");
      }
    })};

  return (
    <main className="login-container">
      <form className="login-form" onSubmit={handleLogin}>
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
      <section>
            <Link to="/register">Not a member yet?</Link>
            </section>
    </main>
  );
};