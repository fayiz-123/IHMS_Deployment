import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Profile.css";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";

function Profile() {
  const [username, setUserName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState({
    addressLine: "",
    city: "",
    state: "",
    postalCode: "",
    primary: true,
  });
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const baseApiUrl = import.meta.env.VITE_BASE_API_URL;

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem("authToken");
        if (!token) {
          setError("User not authenticated.");
          return;
        }

        const response = await axios.get(`${baseApiUrl}/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.data.success) {
          setUserName(response.data.userProfile.username);
          setPhone(response.data.userProfile.phone || "");
          setAddress(response.data.address || {
            addressLine: "",
            city: "",
            state: "",
            postalCode: "",
            primary: true,
          });
        } else {
          setError("Failed to fetch user details.");
        }
      } catch (err) {
        setError(err.response?.data?.message || "An error occurred.");
      }
    };

    fetchUserProfile();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const token = localStorage.getItem("authToken");
    if (!token) {
      setError("Unauthorized: Please log in again.");
      return;
    }

    const requestData = { username, phone };

    try {
      const response = await axios.put("http://localhost:8000/updateProfile", requestData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data.success) {
        setSuccess(response.data.message);
        setTimeout(() => navigate("/"), 2000);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Profile update failed. Please try again.");
    }
  };

  const handleAddressChange = (field, value) => {
    setAddress((prev) => ({ ...prev, [field]: value }));
  };

  const handleAddressUpdate = async () => {
    setError("");
    setSuccess("");

    const token = localStorage.getItem("authToken");
    if (!token) {
      setError("Unauthorized: Please log in again.");
      return;
    }

    try {
      const response = await axios.put(
        "http://localhost:8000/updateProfile",
        { addresses: [address] }, // Send it as array
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.data.success) {
        setSuccess("Address updated successfully.");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Address update failed.");
    }
  };

  return (
    <>
      <Nav />
      <div id="profile-update">
        <div className="wrapper profile-update">
          <div className="container">
            <div className="col-left">
              <div className="update-text">
                <h2>Update Your Profile</h2>
                <p>Keep your information up-to-date for a better experience.</p>
              </div>
            </div>
            <div className="col-right">
              <div className="update-form">
                <h2>Profile Update</h2>
                {success && <p className="success">{success}</p>}
                {error && <p className="error">{error}</p>}

                <form onSubmit={handleUpdate}>
                  <p>
                    <label>Full Name<span>*</span></label>
                    <input
                      type="text"
                      placeholder="Full Name"
                      value={username}
                      onChange={(e) => setUserName(e.target.value)}
                      required
                    />
                  </p>

                  <p>
                    <label>Phone Number<span>*</span></label>
                    <input
                      type="text"
                      placeholder="Phone Number"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                    />
                  </p>

                  <p>
                    <input type="submit" value="Update Profile Info" />
                  </p>
                </form>

                <div className="address-section">
                  <label>Primary Address</label>
                  <div className="address-card">
                    <div className="single-field">
                      <label>Address Line</label>
                      <input
                        type="text"
                        value={address.addressLine}
                        onChange={(e) => handleAddressChange("addressLine", e.target.value)}
                      />
                    </div>
                    <div className="single-field">
                      <label>City</label>
                      <input
                        type="text"
                        value={address.city}
                        onChange={(e) => handleAddressChange("city", e.target.value)}
                      />
                    </div>
                    <div className="single-field">
                      <label>State</label>
                      <input
                        type="text"
                        value={address.state}
                        onChange={(e) => handleAddressChange("state", e.target.value)}
                      />
                    </div>
                    <div className="single-field">
                      <label>Postal Code</label>
                      <input
                        type="text"
                        value={address.postalCode}
                        onChange={(e) => handleAddressChange("postalCode", e.target.value)}
                      />
                    </div>
                  </div>
                  <br />
                  <button type="button" className="add-btn" onClick={handleAddressUpdate}>
                    Update Address
                  </button>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Profile;
