import { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import './ResetPassword.css';

const ResetPassword = () => {
  const { token } = useParams();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const baseApiUrl = import.meta.env.VITE_BASE_API_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }
    try {
      const response = await axios.post(
        `${baseApiUrl}/reset-password/${token}`,
        { newPassword }
      );
      setMessage(response.data.message);
      setSuccess(true); // ✅ Hide form on success
    } catch (error) {
      setMessage(
        error.response?.data?.message || "Something went wrong. Try again."
      );
    }
  };

  return (
    <div id="reset-password">
      <div className="container">
        <div className="col-left">
          <h2>Reset Password</h2>
          <p>Enter your new password below.</p>
        </div>

        <div className="col-right">
          {success ? ( 
            <p className="success-message">✅ Password successfully updated!</p> 
          ) : ( 
            <form className="reset-form" onSubmit={handleSubmit}>
              <label>New Password</label>
              <div className="password-container">
                <input
                  type={showPassword ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
                <input
                  type="checkbox"
                  id="show-password"
                  checked={showPassword}
                  onChange={() => setShowPassword(!showPassword)}
                />
                <label htmlFor="show-password">Show</label>
              </div>

              <label>Confirm Password</label>
              <div className="password-container">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
                <input
                  type="checkbox"
                  id="show-confirm-password"
                  checked={showConfirmPassword}
                  onChange={() => setShowConfirmPassword(!showConfirmPassword)}
                />
                <label htmlFor="show-confirm-password">Show</label>
              </div>

              {message && <p className="error-message">{message}</p>}

              <button type="submit">Update Password</button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
