import React, { useState, useEffect } from "react";
import axios from "axios";
import "./pageStyle/Login.css";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("isLoggedIn"));
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

      const user = users.find((user) => user.email === email && user.password === password);

      if (user) {
        if (user.blocked) {
        
          toast.error("Admin Blocked You", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            theme: "colored",
            transition: "Slide",
            style: { whiteSpace: "nowrap" },
          });
          return;
        }

        setIsLoggedIn(true);
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("firstName", user.firstName);
        localStorage.setItem("lastName", user.lastName);

       
        notify(); 
        if (user.admin === "true") {
          localStorage.setItem("isAdmin", "true");
          navigate("/dashboard");
        } else {
          localStorage.setItem("isAdmin", "false");
          navigate("/"); 
        }
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
  };

  const notify = () => {
    toast.success("Logged in Successfully", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      theme: "colored",
      transition: "Slide",
      style: { whiteSpace: "nowrap" },
    });
  };

  const notifylogout = () => {
    toast.error("Logged out", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      theme: "colored",
      transition: "Slide",
      style: { whiteSpace: "nowrap" },
    });
  };

  return (
    <div className="login-container">
      {isLoggedIn ? (
        <div className="logout-container">
          <h3 style={{ textAlign: "center", paddingTop: "10px" }}>
            Hi {firstName} {lastName}!
          </h3>
          <button
            onClick={() => {
              handleLogout();
              notifylogout();
            }}
            className="logout-btn"
          >
            Logout
          </button>
        </div>
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
            <button type="submit" onClick={notify}>
              Login
            </button>
            <p className="log-register">
              Don't have an account? <Link to="/Register">Register</Link>
            </p>
          </form>
        </>
      )}
    </div>
  );
};

export default Login;
