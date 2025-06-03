import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./BookingForm.css";

const BookingForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    service: "",
  });

  const [allAddresses, setAllAddresses] = useState([]);
  const [isAddingNewAddress, setIsAddingNewAddress] = useState(false);
  const [newAddressInput, setNewAddressInput] = useState({
    addressLine: "",
    city: "",
    state: "",
    postalCode: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const baseApiUrl = import.meta.env.VITE_BASE_API_URL;

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem("authToken");
        if (!token) return setErrorMessage("User not authenticated.");

        const res = await axios.get(`${baseApiUrl}/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.data.success) {
          const user = res.data.userProfile;
          const addresses = user.addresses || [];
          setAllAddresses(addresses);

          const primaryAddr =
            addresses.find((a) => a.isPrimary) || addresses[0];
          const formattedAddr = primaryAddr
            ? `${primaryAddr.addressLine}, ${primaryAddr.city}, ${primaryAddr.state}, ${primaryAddr.postalCode}`
            : "";

          setFormData({
            name: user.username,
            email: user.email,
            phone: user.phone || "",
            address: formattedAddr,
            service: "",
          });
        } else {
          setErrorMessage("Failed to fetch user data.");
        }
      } catch (err) {
        setErrorMessage(err.response?.data?.message || "Error fetching data.");
      }
    };

    fetchUserProfile();
  }, [baseApiUrl]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddressSelect = (e) => {
    const selectedIndex = e.target.value;
    if (selectedIndex === "new") {
      setIsAddingNewAddress(true);
      setFormData((prev) => ({ ...prev, address: "" }));
    } else {
      const addr = allAddresses[selectedIndex];
      const formatted = `${addr.addressLine}, ${addr.city}, ${addr.state}, ${addr.postalCode}`;
      setFormData((prev) => ({ ...prev, address: formatted }));
      setIsAddingNewAddress(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setIsSubmitted(false);
    setErrorMessage("");

    try {
      const token = localStorage.getItem("authToken");
      const res = await axios.post(
        `${baseApiUrl}/service/regService`,
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (res.data.success) {
        setIsSubmitted(true);
        setTimeout(() => navigate("/myBookings"), 3000);
      }
    } catch (err) {
      setErrorMessage(err.response?.data?.message || "Booking failed.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleNewAddressChange = (e) => {
    const { name, value } = e.target;
    setNewAddressInput((prev) => ({ ...prev, [name]: value }));
  };

  const saveNewAddress = async () => {
    const { addressLine, city, state, postalCode } = newAddressInput;
    if (!addressLine || !city || !state || !postalCode || isNaN(postalCode)) {
      alert("Please fill all fields correctly.");
      return;
    }

    try {
      const token = localStorage.getItem("authToken");
      const res = await axios.post(
        `${baseApiUrl}/addAddress`,
        { ...newAddressInput, postalCode: Number(postalCode) },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.data.success) {
        const newAddr = res.data.user.addresses.slice(-1)[0];
        const formatted = `${newAddr.addressLine}, ${newAddr.city}, ${newAddr.state}, ${newAddr.postalCode}`;

        setFormData((prev) => ({ ...prev, address: formatted }));
        setAllAddresses((prev) => [...prev, newAddr]);
        setNewAddressInput({
          addressLine: "",
          city: "",
          state: "",
          postalCode: "",
        });
        setIsAddingNewAddress(false);
      } else {
        alert("Failed to add address.");
      }
    } catch (err) {
      alert(err.response?.data?.message || "Error adding address.");
    }
  };

  return (
    <div id="book">
      <div className="booking-form-container">
        <h2>Register for Service</h2>

        {isLoading && <div className="loading-spinner">Loading...</div>}
        {isSubmitted ? (
          <div id="success-message">
            <h3>Booked Successfully!</h3>
            <p>Thank you! We’ll contact you shortly.</p>
          </div>
        ) : (
          <>
            {errorMessage && <p className="error-message">{errorMessage}</p>}

            <form onSubmit={handleSubmit}>
              <label>Name</label>
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />

              <label>Email</label>
              <input name="email" value={formData.email} disabled />

              <label>Phone</label>
              <input
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                pattern="[0-9]{10}"
                maxLength={10}
              />

              <label>Select Address</label>
              <select
                value={
                  isAddingNewAddress
                    ? "new"
                    : allAddresses.findIndex(
                        (a) =>
                          `${a.addressLine}, ${a.city}, ${a.state}, ${a.postalCode}` ===
                          formData.address
                      )
                }
                onChange={handleAddressSelect}
                required
              >
                <option value="" disabled>
                  Select an Address
                </option>

                {allAddresses.map((addr, i) => (
                  <option key={i} value={i}>
                    {`${addr.addressLine}, ${addr.city}, ${addr.state}, ${addr.postalCode}`}{" "}
                    {addr.isPrimary && "(Primary)"}
                  </option>
                ))}

                {/* Only show "+ Add New Address" if user has less than 3 addresses */}
                {allAddresses.length < 3 && (
                  <option value="new">+ Add New Address</option>
                )}
              </select>

              {isAddingNewAddress && (
                <div className="new-address-form">
                  <label>Address Line</label>
                  <input
                    name="addressLine"
                    value={newAddressInput.addressLine}
                    onChange={handleNewAddressChange}
                    required
                  />

                  <label>City</label>
                  <input
                    name="city"
                    value={newAddressInput.city}
                    onChange={handleNewAddressChange}
                    required
                  />

                  <label>State</label>
                  <input
                    name="state"
                    value={newAddressInput.state}
                    onChange={handleNewAddressChange}
                    required
                  />

                  <label>Postal Code</label>
                  <input
                    name="postalCode"
                    type="number"
                    value={newAddressInput.postalCode}
                    onChange={handleNewAddressChange}
                    required
                  />

                  <button
                    type="button"
                    onClick={saveNewAddress}
                    className="submit-button"
                  >
                    Save Address
                  </button>
                </div>
              )}

              <label>Address (editable)</label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
              />

              <label>Service Type</label>
              <select
                name="service"
                value={formData.service}
                onChange={handleChange}
                required
              >
                <option value="">Select a Service</option>
                <option value="electricity">Electricity</option>
                <option value="plumbing">Plumbing</option>
                <option value="wasteManagement">Waste Management</option>
              </select>

              <button type="submit" className="submit-button">
                Submit
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default BookingForm;
