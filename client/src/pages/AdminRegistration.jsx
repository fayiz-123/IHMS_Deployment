import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import axios from "axios";
import "./AdminRegistration.css";

function AdminRegistration() {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    username: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const navigate = useNavigate(); // Initialize navigate
  const baseApiUrl = import.meta.env.VITE_BASE_API_URL;

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${baseApiUrl}/admin/adminRegistration`, {
        name: `${formData.firstname} ${formData.lastname}`, // Combine first and last name
        email: formData.email,
        password: formData.password,
      });

      setMessage("Registration successful! Redirecting to login...");
      
      // Reset form fields
      

      // Redirect to admin login page after 2 seconds
      setTimeout(() => {
        navigate("/admin");
      }, 2000);
      
    } catch (error) {
      setMessage(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div id="admReg">
      <div className="registration-container">
        <h1>Admin Registration</h1>
        {message && <p style={{ color: message.includes("successful") ? "green" : "red" }}>{message}</p>}
        <form onSubmit={handleSubmit}>
          <label htmlFor="firstname" style={{ color: "black" }}>First Name:</label>
          <input type="text" id="firstname" name="firstname" placeholder="Enter your first name" value={formData.firstname} onChange={handleChange} required />

          <label htmlFor="lastname" style={{ color: "black" }}>Last Name:</label>
          <input type="text" id="lastname" name="lastname" placeholder="Enter your last name" value={formData.lastname} onChange={handleChange} required />

          <label htmlFor="email" style={{ color: "black" }}>Email:</label>
          <input type="email" id="email" name="email" placeholder="Enter your email address" value={formData.email} onChange={handleChange} required />

          <label htmlFor="username" style={{ color: "black" }}>Username:</label>
          <input type="text" id="username" name="username" placeholder="Enter your username" value={formData.username} onChange={handleChange} required />

          <label htmlFor="password" style={{ color: "black" }}>Password:</label>
          <input type="password" id="password" name="password" placeholder="Enter your password" value={formData.password} onChange={handleChange} required />

          <button type="submit" id="register-button">Register</button>
        </form>
      </div>
    </div>
  );
}

export default AdminRegistration;
