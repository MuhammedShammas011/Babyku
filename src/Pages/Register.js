import React, { useState } from "react";
import axios from "axios";
import "./pageStyle/Register.css";
import {  toast } from 'react-toastify';

import { useNavigate } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    gender: "",
    address: "",
    password: "",
    confirmPassword: "",
    admin: "false",
    blocked: "false",
    cart:[]
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };


  const notifyRegister=()=> {
    toast.success('Registered Successfully', {
      position: "top-right",
      autoClose: 3000, // Longer timeout for better visibility
      hideProgressBar: false,
      closeOnClick: true, // Allows closing with cross button
      pauseOnHover: false,
      draggable: true,
      theme: "colored",
      transition: "Slide",
      style: { whiteSpace: "nowrap" },
    });
  }

  const validate = () => {
    const newErrors = {};
    if (!formData.firstName) newErrors.firstName = "First Name is required";
    if (!formData.lastName) newErrors.lastName = "Last Name is required";
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!formData.phone) newErrors.phone = "Phone number is required";
    if (!formData.gender) newErrors.gender = "Gender is required";
    if (!formData.address) newErrors.address = "Address is required";
    if (!formData.password) newErrors.password = "Password is required";
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    return newErrors;
  };
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setErrors({});

      try {
         await axios.post(
          "http://localhost:5000/users",
          formData
        );
         
        navigate("/login");

        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          gender: "",
          address: "",
          password: "",
          confirmPassword: "",
      
        });
      } catch (error) {
        console.error("Error in registration:", error);
      }
    }
  };
  return (
    <div className="registration-container">
      <h2 className="registration-title">Registration</h2>
      <form className="registration-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>First Name:</label>
          <input
            className="form-input"
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
          />
          {errors.firstName && (
            <span className="error-message">{errors.firstName}</span>
          )}
        </div>
        <div className="form-group">
          <label>Last Name:</label>
          <input
            className="form-input"
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
          />
          {errors.lastName && (
            <span className="error-message">{errors.lastName}</span>
          )}
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input
            className="form-input"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && (
            <span className="error-message">{errors.email}</span>
          )}
        </div>
        <div className="form-group">
          <label>Phone Number:</label>
          <input
            className="form-input"
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
          {errors.phone && (
            <span className="error-message">{errors.phone}</span>
          )}
        </div>
        <div className="form-group">
          <label>Gender:</label>
          <select
            className="form-select"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
          >
            <option value="">Select</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          {errors.gender && (
            <span className="error-message">{errors.gender}</span>
          )}
        </div>
        <div className="form-group">
          <label>Address:</label>
          <input
            className="form-input"
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
          />
          {errors.address && (
            <span className="error-message">{errors.address}</span>
          )}
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            className="form-input"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && (
            <span className="error-message">{errors.password}</span>
          )}
        </div>
        <div className="form-group">
          <label>Confirm Password:</label>
          <input
            className="form-input"
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          {errors.confirmPassword && (
            <span className="error-message">{errors.confirmPassword}</span>
          )}
        </div>
        <button className="register-button" type="submit" onClick={notifyRegister}>
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
