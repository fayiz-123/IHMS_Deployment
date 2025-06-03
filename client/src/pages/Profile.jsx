import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Profile.css";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";

function Profile() {
  const [username, setUserName] = useState("");
  const [phone, setPhone] = useState("");
  const [addresses, setAddresses] = useState([]); // array of addresses
  const [newAddress, setNewAddress] = useState({
    addressLine: "",
    city: "",
    state: "",
    postalCode: "",
  });
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const baseApiUrl = import.meta.env.VITE_BASE_API_URL;

  const fetchUserProfile = async () => {
  try {
    const token = localStorage.getItem("authToken");
    if (!token) {
      setError("User not authenticated.");
      setTimeout(() => {
        navigate("/");
      }, 400);
      return;
    }

    const response = await axios.get(`${baseApiUrl}/profile`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (response.data.success) {
      setUserName(response.data.userProfile.username);
      setPhone(response.data.userProfile.phone || "");
      setAddresses(response.data.userProfile.addresses || []);
    } else {
      setError("Failed to fetch user details.");
    }
  } catch (err) {
    setError(err.response?.data?.message || "An error occurred.");
  }
};

useEffect(() => {
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
      const response = await axios.put(
        `${baseApiUrl}/updateProfile`,
        requestData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.data.success) {
        setSuccess(response.data.message);
        setTimeout(() => navigate("/"), 2000);
      }
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Profile update failed. Please try again."
      );
    }
  };

  const handleNewAddressChange = (field, value) => {
    setNewAddress((prev) => ({ ...prev, [field]: value }));
  };

  const handleAddNewAddress = async () => {
    setError("");
    setSuccess("");

    const token = localStorage.getItem("authToken");
    if (!token) {
      setError("Unauthorized: Please log in again.");
      return;
    }

    if (
      !newAddress.addressLine ||
      !newAddress.city ||
      !newAddress.state ||
      !newAddress.postalCode
    ) {
      setError("All address fields are required.");
      return;
    }

    if (addresses.length >= 3) {
      setError("Only 3 addresses are allowed.");
      return;
    }

    try {
      const response = await axios.post(
        `${baseApiUrl}/addAddress`,
        {
          ...newAddress,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.data.success) {
        setSuccess("Address added successfully.");
        setAddresses(response.data.user.addresses || []);
        setNewAddress({
          addressLine: "",
          city: "",
          state: "",
          postalCode: "",
        });
      }
    } catch (err) {
      setError(err.response?.data?.message || "Address add failed.");
    }
  };

  const handleSetPrimary = async (addressId) => {
    setError("");
    setSuccess("");

    const token = localStorage.getItem("authToken");
    if (!token) {
      setError("Unauthorized: Please log in again.");
      return;
    }

    try {
      // Assuming backend API to set primary address by address index or id
      const response = await axios.put(
        `${baseApiUrl}/setPrimaryAddress`,
        { addressId },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.data.success) {
        setAddresses(response.data.user.addresses || []);
      }
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to update primary address."
      );
    }
  };

  const handleRemoveAddress = async (addressId) => {
  setError("");
  setSuccess("");

  const token = localStorage.getItem("authToken");
  if (!token) {
    setError("Unauthorized: Please log in again.");
    return;
  }

  try {
    const response = await axios.delete(`${baseApiUrl}/deleteAddress/${addressId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (response.data.success) {
      setSuccess("Address removed.");
      await fetchUserProfile(); // now works fine since it’s outside useEffect
    }
  } catch (err) {
    setError(err.response?.data?.message || "Failed to remove address.");
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
                    <input type="submit" value="Update Profile Info" />
                  </p>
                </form>

                <div className="address-section">
                  <label>Saved Addresses</label>

                  {addresses.length === 0 && <p>No addresses saved yet.</p>}

                  {addresses.map((addr, idx) => (
                    <div
                      key={addr._id}
                      className={`address-card ${
                        addr.primary ? "primary-address" : ""
                      }`}
                    >
                      <div className="display-field">
                        <strong>Address Line:</strong> {addr.addressLine}
                      </div>
                      <div className="display-field">
                        <strong>City:</strong> {addr.city}
                      </div>
                      <div className="display-field">
                        <strong>State:</strong> {addr.state}
                      </div>
                      <div className="display-field">
                        <strong>Postal Code:</strong> {addr.postalCode}
                      </div>

                      <div className="address-buttons">
                        {!addr.primary && (
                          <button
                            className="add-btn"
                            type="button"
                            onClick={() => handleSetPrimary(addr._id)}
                          >
                            Make Primary
                          </button>
                        )}
                        <button
                          className="remove-btn"
                          type="button"
                          onClick={() => handleRemoveAddress(addr._id)}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}

                  {addresses.length < 3 && (
                    <>
                      <label>Add New Address</label>
                      <div className="address-card">
                        <div className="single-field">
                          <label>Address Line</label>
                          <input
                            type="text"
                            value={newAddress.addressLine}
                            onChange={(e) =>
                              handleNewAddressChange(
                                "addressLine",
                                e.target.value
                              )
                            }
                            placeholder="Enter address line"
                          />
                        </div>
                        <div className="single-field">
                          <label>City</label>
                          <input
                            type="text"
                            value={newAddress.city}
                            onChange={(e) =>
                              handleNewAddressChange("city", e.target.value)
                            }
                            placeholder="Enter city"
                          />
                        </div>
                        <div className="single-field">
                          <label>State</label>
                          <input
                            type="text"
                            value={newAddress.state}
                            onChange={(e) =>
                              handleNewAddressChange("state", e.target.value)
                            }
                            placeholder="Enter state"
                          />
                        </div>
                        <div className="single-field">
                          <label>Postal Code</label>
                          <input
                            type="text"
                            value={newAddress.postalCode}
                            onChange={(e) =>
                              handleNewAddressChange(
                                "postalCode",
                                e.target.value
                              )
                            }
                            placeholder="Enter postal code"
                          />
                        </div>
                      </div>
                      <button
                        className="add-btn"
                        type="button"
                        onClick={handleAddNewAddress}
                      >
                        Add Address
                      </button>
                    </>
                  )}
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
