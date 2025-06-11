import React, { useState } from "react";
import axios from "axios";
import "./SignUp.css";
import Footer from "../components/Footer";
import { Link, useNavigate } from "react-router-dom";

function SignUp() {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showVerifyLink, setShowVerifyLink] = useState(false);

  const navigate = useNavigate();
  const baseApiUrl = import.meta.env.VITE_BASE_API_URL;

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setIsLoading(true);
    setShowVerifyLink(false);

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setIsLoading(false);
      return;
    }

    const requestData = { username, email, phone, password };

    try {
      const response = await axios.post(`${baseApiUrl}/signup`, requestData);

      if (response.data.success) {
        setSuccess(response.data.message);
        setTimeout(
          () => navigate("/otp-verification", { state: { email } }),
          2000
        );
      }
    } catch (err) {
      if (err.response) {
        setError(
          err.response.data.message || "Signup failed. Please try again."
        );
        if (err.response.data.isVerified === false) {
          setShowVerifyLink(true); // Show "Verify Here" link if user is not verified
        }
      } else {
        setError("Signup failed. Please try again.");
      }
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  return (
    <>
      <div id="sign-up">
        <div className="wrapper sign-up">
          <div className="container">
            <div className="col-left">
              <div className="sign-up-text">
                <h2>Create Your Account!</h2>
                <p>
                  Join us and manage your home services with ease. It's free and
                  quick to sign up!
                  <br />
                  Already have an account?{" "}
                  <Link to="/login" className="btn">
                    Login
                  </Link>
                </p>
              </div>
            </div>
            <div className="col-right">
              <div className="sign-up-form">
                <h2>Sign Up</h2>
                {success && <p className="success">{success}</p>}
                {error && <p className="error">{error}</p>}
                {showVerifyLink && (
                  <p className="verify-link">
                    <Link to="/otp-verification" state={{ email }}>
                      Verify Here
                    </Link>
                  </p>
                )}
                <form onSubmit={handleSignup}>
                  <p>
                    <label>
                      Full Name<span>*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Full Name"
                      value={username}
                      onChange={(e) => setUserName(e.target.value)}
                      required
                    />
                  </p>
                  <p>
                    <label>
                      Email address<span>*</span>
                    </label>
                    <input
                      type="email"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </p>
                  <p>
                    <label>
                      Phone Number<span>*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Phone Number"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                    />
                  </p>
                  <p>
                    <label>
                      Password<span>*</span>
                    </label>
                    <input
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </p>
                  <p>
                    <label>
                      Confirm Password<span>*</span>
                    </label>
                    <input
                      type="password"
                      placeholder="Confirm Password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                    />
                  </p>
                  <p>
                    <input
                      type="submit"
                      value={isLoading ? "Sending OTP..." : "Send OTP"}
                      disabled={isLoading}
                    />
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default SignUp;
