import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./ForgotPassword.css"; // Import CSS file

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const baseApiUrl = import.meta.env.VITE_BASE_API_URL;
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");

        try {
            const res = await axios.post(`${baseApiUrl}/forgot-password`, { email });
            setMessage(res.data.message);
            
        } catch (error) {
            setMessage(error.response?.data?.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div id="forgot-password">
            <div className="container">
                {/* Left Section */}
                <div className="col-left">
                    <div className="text">
                        <h2>Forgot Password?</h2>
                        <p>Enter your email to receive a password reset link.</p>
                    </div>
                </div>

                {/* Right Section */}
                <div className="col-right">
                    <div className="forgot-form">
                        <h2>Reset Your Password</h2>
                        <form onSubmit={handleSubmit}>
                            <label>Email Address</label>
                            <input
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <button type="submit" disabled={loading}>
                                {loading ? "Sending..." : "Send OTP"}
                            </button>
                        </form>
                        {message && <p className="success-message">{message}</p>}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
