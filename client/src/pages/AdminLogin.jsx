import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./AdminLogin.css";

function AdminLogin() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const baseApiUrl = import.meta.env.VITE_BASE_API_URL;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
  
    try {
      const response = await axios.post(`${baseApiUrl}/admin/adminLoggedIn`, formData);
  
      if (response.data.success) {
        // Store auth token, admin ID, and admin name
        localStorage.setItem("adminToken", response.data.token);
        localStorage.setItem("adminName", response.data.adminName); // Store admin name
  
        setMessage("Login successful! Redirecting...");
  
        // Redirect after 2 seconds
        setTimeout(() => {
          navigate("/admin-dashboard");
        }, 2000);
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong, please try again.");
    }
  };
  
  return (
    <div id="adlog">
      <div className="login-page">
        <div className="form">
          <h2>Admin Login</h2>
          {message && <p className="success">{message}</p>}
          {error && <p className="error">{error}</p>}
          <form className="login-form" onSubmit={handleLogin}>
            <input
              type="email"
              placeholder="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <button type="submit">Login</button>
            <p className="message">
              Not registered? <Link to="/adminRegistration">Create an account</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;
