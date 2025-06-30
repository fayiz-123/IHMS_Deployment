// Profile.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Profile.css";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";

function Profile() {
  window.scrollTo(0, 0);
  const [username, setUserName] = useState("");
  const [phone, setPhone] = useState("");
  const [addresses, setAddresses] = useState([]);
  const [newAddress, setNewAddress] = useState({
    addressLine: "",
    city: "",
    state: "",
    postalCode: "",
  });
  const [profilePic, setProfilePic] = useState("");
  const [preview, setPreview] = useState(null);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [uploading, setUploading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const navigate = useNavigate();
  const baseApiUrl = import.meta.env.VITE_BASE_API_URL;

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem("authToken");
        if (!token) {
          setError("User not authenticated.");
          setTimeout(() => navigate("/"), 400);
          return;
        }

        const { data } = await axios.get(`${baseApiUrl}/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (data.success) {
          const user = data.userProfile;
          setUserName(user.username);
          setPhone(user.phone || "");
          setAddresses(user.addresses || []);
          setProfilePic(user.profilePic || "");
        } else {
          setError("Failed to fetch user details.");
        }
      } catch (err) {
        setError(err.response?.data?.message || "An error occurred.");
      }
    };

    fetchUserProfile();
  }, [navigate, baseApiUrl]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const token = localStorage.getItem("authToken");
    if (!token) {
      setError("Unauthorized. Please log in again.");
      return;
    }

    try {
      const { data } = await axios.put(
        `${baseApiUrl}/updateProfile`,
        { username, phone }, // ✅ plain JSON body
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (data.success) {
        setSuccess(data.message);
        setTimeout(() => navigate("/"), 4000);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Profile update failed.");
    }
  };

  //handleFileChange -- AddProfilePicture

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
    if (!allowedTypes.includes(file.type)) {
      alert("Only JPG, JPEG, and PNG files are allowed!");
      return;
    }

    setUploading(true); // start loader
    setPreview(null); // ❌ Don't show preview yet

    const token = localStorage.getItem("authToken");
    if (!token) {
      alert("Unauthorized. Please log in again.");
      setUploading(false);
      return;
    }

    const formData = new FormData();
    formData.append("pic", file);

    try {
      const { data } = await axios.put(
        `${baseApiUrl}/profile-photo`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (data.success) {
        setProfilePic(data.user.profilePic); // ✅ set only after upload succeeds
        alert("✅ Profile picture uploaded successfully.");
      } else {
        alert("❌ Image upload failed.");
      }
    } catch (err) {
      alert(err.response?.data?.message || "❌ Failed to upload image.");
    } finally {
      setUploading(false);
    }
  };

  //Delete ProfilePicture
  const handleDeleteProfilePic = async () => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      alert("Unauthorized. Please log in again.");
      return;
    }

    setDeleting(true);

    try {
      const { data } = await axios.delete(
        `${baseApiUrl}/profile-photo/delete`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (data.success) {
        // ✅ Show alert FIRST
        alert("🗑️ Profile picture removed.");

        // ✅ THEN remove image after a short delay
        setTimeout(() => {
          setProfilePic("");
          setPreview(null);
          setDeleting(false);
        }, 10); // just 10ms is enough to let browser render alert first
      } else {
        alert("❌ Failed to delete profile picture.");
        setDeleting(false);
      }
    } catch (err) {
      alert(
        err.response?.data?.message || "❌ Error deleting profile picture."
      );
      setDeleting(false);
    }
  };

  //addnewAddress

  const handleNewAddressChange = (field, value) => {
    setNewAddress((prev) => ({ ...prev, [field]: value }));
  };

  const handleAddNewAddress = async () => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      alert("Unauthorized.");
      return;
    }

    const { addressLine, city, state, postalCode } = newAddress;
    if (!addressLine || !city || !state || !postalCode) {
      alert("All address fields are required.");
      return;
    }

    if (addresses.length >= 3) {
      alert("Maximum of 3 addresses allowed.");
      return;
    }

    try {
      const { data } = await axios.post(
        `${baseApiUrl}/addAddress`,
        newAddress,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (data.success) {
        alert("Address added.");
        setAddresses(data.user.addresses || []);
        setNewAddress({ addressLine: "", city: "", state: "", postalCode: "" });
      }
    } catch (err) {
      alert(err.response?.data?.message || "Address add failed.");
    }
  };

  const handleSetPrimary = async (addressId) => {
    try {
      const token = localStorage.getItem("authToken");
      const { data } = await axios.put(
        `${baseApiUrl}/setPrimaryAddress`,
        { addressId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (data.success) setAddresses(data.user.addresses || []);
    } catch (err) {
      setError("Failed to set primary address.");
    }
  };

  const handleRemoveAddress = async (addressId) => {
    try {
      const token = localStorage.getItem("authToken");

      const { data } = await axios.delete(
        `${baseApiUrl}/deleteAddress/${addressId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (data.success) {
        // Delay success message
        setTimeout(async () => {
          setSuccess("Address removed.");

          // Re-fetch updated addresses to reflect new primary
          const refreshed = await axios.get(`${baseApiUrl}/profile`, {
            headers: { Authorization: `Bearer ${token}` },
          });

          if (refreshed.data.success) {
            setAddresses(refreshed.data.userProfile.addresses || []);
          }
        }, 300); // Delay of 300ms (adjust as needed)
      }
    } catch (err) {
      setError("Failed to remove address.");
    }
  };

  useEffect(() => {
    if (success || error) {
      const timer = setTimeout(() => {
        setSuccess("");
        setError("");
      }, 3000); // Clear after 3 seconds

      return () => clearTimeout(timer); // Cleanup
    }
  }, [success, error]);

  const handleLogout = () => {
    alert("You Are Logged Out");
    localStorage.removeItem("authToken");
    localStorage.removeItem("username");
    navigate("/login");
  };

  return (
    <>
      <Nav />
      <div id="profile-update">
        <div className="wrapper profile-update">
          <div className="container">
            {/* LEFT SECTION: PROFILE PICTURE */}
            <div className="col-left">
              <div className="update-text">
                <h2>Your Profile</h2>
                <p>Keep your account details updated.</p>
                <div className="profile-pic-container">
                  {!uploading && !deleting && profilePic ? (
                    <img
                      src={
                        profilePic.startsWith("http")
                          ? profilePic
                          : `${baseApiUrl}${
                              profilePic.startsWith("/")
                                ? profilePic
                                : `/${profilePic}`
                            }`
                      }
                      alt="Profile"
                      className="profile-pic"
                    />
                  ) : (
                    <img
                      src="https://www.w3schools.com/howto/img_avatar.png"
                      alt="Default Avatar"
                      className="profile-pic"
                    />
                  )}

                  {uploading || deleting ? (
                    <p className="loading-text">
                      {uploading ? "Uploading..." : "Deleting..."}
                    </p>
                  ) : (
                    <>
                      <label
                        htmlFor="profilePicUpload"
                        className="upload-label"
                      >
                        {profilePic ? "Change Image" : "Upload Image"}
                      </label>
                      <input
                        type="file"
                        id="profilePicUpload"
                        onChange={handleFileChange}
                        accept="image/*"
                        hidden
                      />
                      {profilePic && (
                        <button
                          className="delete-btn"
                          onClick={handleDeleteProfilePic}
                        >
                          Delete Image
                        </button>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* RIGHT SECTION: FORM */}
            <div className="col-right">
              <div className="update-form">
                <h2>Update Info</h2>
                {success && <p className="success">{success}</p>}
                {error && <p className="error">{error}</p>}
                <form onSubmit={handleUpdate}>
                  <p>
                    <label>Full Name</label>
                    <input
                      type="text"
                      value={username}
                      onChange={(e) => setUserName(e.target.value)}
                      required
                    />
                  </p>
                  <p>
                    <label>Phone Number</label>
                    <input
                      type="text"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                    />
                  </p>
                  <p>
                    <input type="submit" value="Update Profile Info" />
                  </p>
                </form>

                {/* Address Section */}
                <div className="address-section">
                  <label>Saved Addresses</label>
                  {addresses.length === 0 && <p>No addresses saved yet.</p>}

                  {addresses.map((addr) => (
                    <div
                      key={addr._id}
                      className={`address-card ${
                        addr.primary ? "primary-address" : ""
                      }`}
                    >
                      <div className="address-details">
                        <div className="field">
                          <label>Address Line:</label>
                          <span>{addr.addressLine}</span>
                        </div>
                        <div className="field">
                          <label>City:</label>
                          <span>{addr.city}</span>
                        </div>
                        <div className="field">
                          <label>State:</label>
                          <span>{addr.state}</span>
                        </div>
                        <div className="field">
                          <label>Postal Code:</label>
                          <span>
                            {addr.postalCode.toString().padStart(6, "0")}
                          </span>
                        </div>
                      </div>

                      <div className="address-buttons">
                        {!addr.primary && (
                          <button
                            className="add-btn"
                            onClick={() => handleSetPrimary(addr._id)}
                          >
                            Make Primary
                          </button>
                        )}
                        <button
                          className="remove-btn"
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
                        {["addressLine", "city", "state", "postalCode"].map(
                          (field) => (
                            <div className="single-field" key={field}>
                              <label>{field.replace(/([A-Z])/g, " $1")}</label>
                              <input
                                type="text"
                                value={newAddress[field]}
                                onChange={(e) => {
                                  const value = e.target.value;
                                  if (field === "postalCode") {
                                    if (/^\d*$/.test(value)) {
                                      handleNewAddressChange(field, value);
                                    }
                                  } else {
                                    handleNewAddressChange(field, value);
                                  }
                                }}
                                maxLength={field === "postalCode" ? 6 : 50}
                                placeholder={
                                  field === "postalCode"
                                    ? "6-digit PIN code"
                                    : ""
                                }
                              />
                            </div>
                          )
                        )}
                      </div>
                      <button className="add-btn" onClick={handleAddNewAddress}>
                        Add Address
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Logout Button OUTSIDE container */}
          <div className="logout-wrapper">
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Profile;
