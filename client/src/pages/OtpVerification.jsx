import React, { useState, useEffect } from "react";
import axios from "axios";
import "./OtpVerification.css";
import { useNavigate, useLocation } from "react-router-dom";

function OtpVerification() {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [resendMessage, setResendMessage] = useState("");
  const [countdown, setCountdown] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();
  const baseApiUrl = import.meta.env.VITE_BASE_API_URL;
  const email = location.state?.email; // Get email from state passed from Signup

  // Handle OTP verification
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const response = await axios.post(`${baseApiUrl}/otp-verification`, { email, otp });

      if (response.data.success) {
        setSuccess("OTP Verified Successfully!");
        setTimeout(() => navigate("/login"), 2000); // Redirect to login after success
      }
    } catch (err) {
      if (err.response && err.response.status === 400) {
        setError("Invalid OTP. Please try again.");
      } else {
        setError("OTP verification failed. Please try again later.");
      }
    }
  };

  // Handle Resend OTP
  const handleResendOtp = async (e) => {
    e.preventDefault(); // Prevent default link behavior
    setError("");
    setResendMessage("");

    try {
      const response = await axios.post(`${baseApiUrl}/otp-resend`, { email });

      if (response.data.success) {
        setResendMessage("A new OTP has been sent to your email.");
        setCountdown(60); // Start countdown (60 seconds)
      }
    } catch (err) {
      setError("Failed to resend OTP. Please try again later.");
    }
  };

  // Countdown timer effect
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  return (
    <div id="otp">
      <div className="otp-container">
        <h2>Verify Your Email</h2>
        <p>Enter the OTP sent to your email: <b>{email}</b></p>
        {success && <p className="success">{success}</p>}
        {error && <p className="error">{error}</p>}
        {resendMessage && <p className="success">{resendMessage}</p>}

        <form onSubmit={handleVerifyOtp}>
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
          />
          <button type="submit" className="verify-btn">Verify OTP</button>
        </form>

        {/* Resend OTP as a Link */}
        <p className="resend-otp">
          {countdown > 0 ? (
            <span className="countdown">Resend OTP in {countdown}s</span>
          ) : (
            <a href="#" onClick={handleResendOtp} className="resend-link">Resend OTP</a>
          )}
        </p>
      </div>
    </div>
  );
}

export default OtpVerification;
