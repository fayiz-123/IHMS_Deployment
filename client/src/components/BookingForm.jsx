import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import './BookingForm.css';

const BookingForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    service: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate(); 
  const baseApiUrl = import.meta.env.VITE_BASE_API_URL;

  
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem('authToken');
        if (!token) {
          setErrorMessage('User not authenticated.');
          return;
        }

        const response = await axios.get(`${baseApiUrl}/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.data.success) {
          setFormData({
            ...formData,
            name: response.data.userProfile.username,
            email: response.data.userProfile.email,
            phone: response.data.userProfile.phone || '', 
          });
        } else {
          setErrorMessage('Failed to fetch user details.');
        }
      } catch (err) {
        setErrorMessage(err.response?.data?.message || 'An error occurred.');
      }
    };

    fetchUserProfile();
  }, []); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitted(false);
    setIsLoading(true);
    setErrorMessage('');

    try {
      const response = await axios.post('http://localhost:8000/service/regService', formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
      });

      if (response.data.success) {
        setIsSubmitted(true);
        
        setTimeout(() => {
          navigate('/myBookings'); 
        }, 3000); 
      }
    } catch (error) {
      setErrorMessage(error.response?.data?.message || 'An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
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
            <p>Thank you for your registration. We will contact you soon!</p>
          </div>
        ) : (
          <>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <form onSubmit={handleSubmit}>
              <div>
                <label>Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  disabled
                />
              </div>
              <div>
                <label>Phone</label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label>Address</label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
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
              </div>
              <button type="submit" className="submit-button">Submit</button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default BookingForm;
