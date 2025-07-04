import React, { useEffect, useState } from "react";
import axios from "axios";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import "./UserBookedServices.css";

function UserBookedServices() {
  const [services, setServices] = useState([]);
  const [error, setError] = useState(null);
  const [loading,setLoading] = useState(false)
  const baseApiUrl = import.meta.env.VITE_BASE_API_URL;
  

  useEffect(() => {
    const fetchUserServices = async () => {
      try {
        const token = localStorage.getItem("authToken");

        if (!token) {
          setError("User not authenticated. Please log in.");
          return;
        }
        setLoading(true)

        const response = await axios.get(
          `${baseApiUrl}/service/viewServices`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data.success) {
          setServices(response.data.allServices || []);
        } else {
          setError("Failed to fetch booked services.");
        }
      } catch (error) {
        setError("Error fetching booked services: " + error.message);
      }
      finally{
        setLoading(false)
      }
    };

    fetchUserServices();
  }, []);

   if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>🔄 Details are loading... Please wait</p>
      </div>
    );
  }

  return (
    <>
      <Nav />
      <div id="user-services-page">
        <header id="user-services-header">
          <h1>My Booked Services</h1>
        </header>

        {error && <p id="user-services-error">{error}</p>}

        <section id="user-services-table-section">
          <h2>Booked Services</h2>
          <table id="user-services-table">
            <thead>
              <tr>
                <th className="table-header">ID</th>
                <th className="table-header">Service Type</th>
                <th className="table-header">Booking Date</th>
                <th className="table-header">Status</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(services) && services.length > 0 ? (
                services.map((service) => (
                  <tr key={service._id} className="table-row">  
                    <td
                      className="table-cell"
                      data-label="ID"
                      data-value={service._id}
                    >
                      {service._id}
                    </td>
                    <td
                      className="table-cell"
                      data-label="Service Type"
                      data-value={service.service}
                    >
                      {service.service}
                    </td>
                    <td
                      className="table-cell"
                      data-label="Booking Date"
                      data-value={new Date(
                        service.createdAt
                      ).toLocaleDateString("en-GB")}
                    >
                      {new Date(service.createdAt).toLocaleDateString("en-GB")}
                    </td>
                    <td
                      className="table-cell"
                      data-label="Status"
                      data-value={service.status || "Pending"}
                    >
                      {service.status || "Pending"}
                    </td>
                  </tr>
                ))
              ) : (
                <tr className="table-row">
                  <td colSpan="4" className="table-cell">
                    No booked services found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </section>
      </div>
      <Footer />
    </>
  );
}

export default UserBookedServices;
