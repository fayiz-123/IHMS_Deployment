import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminSidebar from "../components/AdminSidebar";
import "./AdminDash.css";

function ContactMessages() {
  const [messages, setMessages] = useState([]); // Initialize as an empty array
  const [error, setError] = useState(null); // To handle any errors
  const baseApiUrl = import.meta.env.VITE_BASE_API_URL;

  // Fetch messages when the component mounts
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const token = localStorage.getItem("adminToken");
        if (!token) {
          setError("Admin not authenticated. Please login again.");
          return;
        }

        const response = await axios.get(`${baseApiUrl}/admin/contactMessages`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data.success) {
          setMessages(response.data.contactMessages || []); // Ensure it's an empty array if no messages
        } else {
          setError("Failed to fetch messages.");
        }
      } catch (error) {
        setError("Error fetching messages: " + error.message);
        console.error("Error fetching messages:", error);
      }
    };

    fetchMessages();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminName");
    window.location.href = "/admin"; // Redirect to admin login
  };

  return (
    <div id="ad">
      <div className="container">
        {/* Sidebar as separate component */}
        <AdminSidebar handleLogout={handleLogout} />

        {/* Main Content */}
        <main className="main-content">
          <header>
            <h1>Contact Messages</h1>
          </header>

          {/* Table Section */}
          <section className="table-section">
            {error && <p className="error">{error}</p>} {/* Display error message if any */}
            <h2>User Contact Messages</h2>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Message</th>
                  <th>Date Sent</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(messages) && messages.length > 0 ? ( // Check if messages is an array
                  messages.map((message, index) => (
                    <tr key={message._id}>
                      <td>{index + 1}</td>
                      <td>{message.name}</td>
                      <td>{message.email}</td>
                      <td>{message.message}</td>
                      <td>{new Date(message.createdAt).toLocaleDateString()}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5">No messages found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </section>
        </main>
      </div>
    </div>
  );
}

export default ContactMessages;
