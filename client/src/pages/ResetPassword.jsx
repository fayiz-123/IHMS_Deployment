import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
  const navigate = useNavigate()
  const baseApiUrl = import.meta.env.VITE_BASE_API_URL;

  const handleSubmit = async (e) => {
  e.preventDefault();

  // Check if passwords match
  if (newPassword !== confirmPassword) {
    setMessage("Passwords do not match");
    return;
  }

  try {
    // Send new password to the backend
    const response = await axios.post(
      `${baseApiUrl}/reset-password/${token}`,
      { newPassword }
    );

    // Set success message
    setMessage(response.data.message);
    setSuccess(true);

    

    // Redirect to login after 4 seconds
    setTimeout(() => {
      navigate('/login');
    }, 3000);

  } catch (error) {
    // Handle errors from backend
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
