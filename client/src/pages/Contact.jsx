import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Contact.css";
import Footer from "../components/Footer";
import Nav from "../components/Nav";

function Contact() {
  window.scrollTo(0, 0);

  const [userData, setUserData] = useState({
    name: "",
    email: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [message, setMessage] = useState(""); // For the message input
  const [successMessage, setSuccessMessage] = useState(""); // Success response
  const baseApiUrl = import.meta.env.VITE_BASE_API_URL;

  // Fetch User Details Automatically
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem("authToken");

        if (!token) {
          setErrorMessage("User not authenticated.");
          return;
        }

        const response = await axios.get(`${baseApiUrl}/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.data.success) {
          setUserData({
            name: response.data.userProfile.username,
            email: response.data.userProfile.email,
          });
        } else {
          setErrorMessage("Failed to fetch user details.");
        }
      } catch (err) {
        setErrorMessage(err.response?.data?.message || "An error occurred.");
      }
    };

    fetchUserProfile();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        setErrorMessage("User not authenticated.");
        return;
      }
  
      const response = await axios.post(
        "http://localhost:8000/contact/contact",
        {
          name: userData.name,
          email: userData.email,
          message: message,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
  
      if (response.data.success) {
        setSuccessMessage("Message sent successfully!");
        setMessage(""); // Reset the message field after successful submission
  
        // Set timeout to clear success message after 5 seconds
        setTimeout(() => {
          setSuccessMessage(""); // Clear the success message
        }, 5000); // 5000 milliseconds (5 seconds)
      } else {
        setErrorMessage("Failed to send message.");
      }
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "An error occurred.");
    }
  };
  

  return (
    <>
      <Nav />
      <main id="contact">
        <section id="contact-introduction" className="hero-section">
          <div className="hero-content">
            <h1>Contact Us</h1>
            <p>Have questions? Our team is here to help you with all your home management needs.</p>
          </div>
        </section>

        <section id="contact-form">
          <div className="container">
            <h2>Get In Touch</h2>
            <p style={{ color: "black" }}>We'd love to hear from you! Here are your details:</p>

            {errorMessage && <p className="error-message">{errorMessage}</p>}
            {successMessage && <p className="success-message">{successMessage}</p>}

            <form action="#" method="POST" onSubmit={handleSubmit}>
              <div className="contact-form" style={{ border: "2px solid blue", padding: "50px" }}>
                <div className="form-field">
                  <label htmlFor="name">Name:</label>
                  <input
                    type="text"
                    id="name"
                    value={userData.name}
                    disabled
                    placeholder="Your Name"
                  />
                </div>

                <div className="form-field">
                  <label htmlFor="email">Email:</label>
                  <input
                    type="email"
                    id="email"
                    value={userData.email}
                    disabled
                    placeholder="Your Email"
                  />
                </div>

                <div className="form-field">
                  <label htmlFor="message">Message:</label>
                  <textarea
                    id="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Your Message"
                    rows="4"
                    style={{ resize: "none" }}
                  ></textarea>
                </div>

                <div className="form-field">
                  <button type="submit" className="submit-btn">
                    Submit
                  </button>
                </div>
              </div>
            </form>
          </div>
        </section>

        <section id="contact-info">
          <div className="info-container">
            <div className="info-item">
              <h3>Address</h3>
              <p style={{ color: "black" }}>
                Companypady, Opp: Piller No:106, Aluva, Ernakulam, Kerala, India
              </p>
            </div>
            <div className="info-item">
              <h3>Phone</h3>
              <p style={{ color: "black" }}>(+91) 8714585932</p>
            </div>
            <div className="info-item">
              <h3>Email</h3>
              <p style={{ color: "black" }}>support@ihms.com</p>
            </div>
          </div>
        </section>

        {/* Google Map Section */}
        <section id="contact-map">
          <div>
            <h3>Find Us Here:</h3>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4224.787825222754!2d76.34571588091708!3d10.088267033804296!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b080ec05032e0f5%3A0xc975eb4323679ba8!2sCompanypady!5e1!3m2!1sen!2sin!4v1739331438324!5m2!1sen!2sin"
              width="100%"
              height="400px"
              style={{ border: "0", borderRadius: "8px" }}
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default Contact;
