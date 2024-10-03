import React, { useState, useEffect } from "react";
import axios from "axios";
import "./pageStyle/Login.css";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("isLoggedIn")
  );
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  useEffect(() => {
    if (isLoggedIn) {
      setFirstName(localStorage.getItem("firstName") || "");
      setLastName(localStorage.getItem("lastName") || "");
    }
  }, [isLoggedIn]);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    if (email === "" || password === "") {
      setError("Please fill in all fields");
    } else {
      setError("");
      try {
        const response = await axios.get("http://localhost:5000/users");
        const users = response.data;

        console.log(users); // Log all users to see their structure
        const user = users.find(
          (user) => user.email === email && user.password === password
        );

        console.log(user); // Log the user found

        if (user) {
          alert("Successfully logged in");
          setIsLoggedIn(true);
          localStorage.setItem("isLoggedIn", "true");
          localStorage.setItem("firstName", user.firstName);
          localStorage.setItem("lastName", user.lastName);
          navigate("/");
        } else {
          setError("Invalid email or password");
        }
      } catch (error) {
        console.error("Error fetching users:", error);
        setError("Error logging in. Please try again later.");
      }
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("firstName");
    localStorage.removeItem("lastName");
    setEmail("");
    setPassword("");
    alert("You have been logged out");
  };

  return (
    <div className="login-container">
      {isLoggedIn ? (
        <>
          <h2>
            Hi {firstName} {lastName}!
          </h2>
          <button onClick={handleLogout} className="logout-btn">
            Logout
          </button>
          &nbsp;&nbsp;
          <button onClick={() => navigate("/")} className="back-btn">
            Back to Home
          </button>
        </>
      ) : (
        <>
          <h2>Login</h2>
          <form onSubmit={handleLoginSubmit}>
            <div className="input-group">
              <label>Email:</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="input-group">
              <label>Password:</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error && <p className="error-message">{error}</p>}
            <button type="submit">Login</button>
            <p className="log-register">
              Don't have an Account? <Link to="/Register">Register</Link>
            </p>
          </form>
        </>
      )}
    </div>
  );
};

export default Login;
