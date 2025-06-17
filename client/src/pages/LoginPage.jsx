import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./LoginPage.css"; // Ensure it's correctly imported

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [isloading,setIsLoading] = useState(false)
  const [unverifiedEmail, setUnverifiedEmail] = useState("");
  const baseApiUrl = import.meta.env.VITE_BASE_API_URL;
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors
    setUnverifiedEmail(""); // Reset unverified email
    setIsLoading(true)

    try {
      const response = await axios.post(`${baseApiUrl}/login`, formData);

      if (response.data.success) {
        localStorage.setItem("authToken", response.data.token);
        navigate("/"); // Redirect after successful login
      }
    } catch (error) {
      if (error.response) {
        const errorMessage = error.response.data.message;

        if (errorMessage === "Verify the email First") {
          setUnverifiedEmail(formData.email);
          setError(""); // Clear duplicate message
        } else {
          setError(errorMessage);
        }
      } else {
        setError("Something went wrong. Please try again.");
      }
    }
    setIsLoading(false)
  };

  return (
    <div id="log">
      <div className="container">
        {/* Left Column (Welcome Message) */}
        <div className="col-left">
          <div className="login-text">
            <h2>Welcome Back!</h2>
            <p>Sign in to your account and manage your home services.</p>
            <p>
              Don't have an account?{" "}
              <Link to="/signup">
                <strong>Sign Up</strong>
              </Link>
            </p>
          </div>
        </div>

        {/* Right Column (Login Form) */}
        <div className="col-right">
          <div className="login-form">
            <h2>Login</h2>
            {error && <p className="error-message">{error}</p>}

            <form onSubmit={handleSubmit}>
              <p>
                <label>Email:</label>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </p>

              <p>
                <label>Password:</label>
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </p>

              <p>
                <input type="submit" value={isloading?"Signing In...":"Sign In"} />
              </p>
            </form>

            {/* Forgot Password Link */}
            <p className="forgot-password">
              <Link to="/forgot-password">Forgot password?</Link>
            </p>

            {/* Verify Email Link (Shown only when email is not verified) */}
            {unverifiedEmail && (
              <p className="verify-email-link">
                <Link to="/otp-verification" state={{ email: unverifiedEmail }}>
                  Verify your email
                </Link>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
