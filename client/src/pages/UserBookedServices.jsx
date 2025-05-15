import React, { useEffect, useState } from "react";
import axios from "axios";
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import "./UserBookedServices.css"; 

function UserBookedServices() {
  const [services, setServices] = useState([]);
  const [error, setError] = useState(null);
  const baseApiUrl = import.meta.env.VITE_BASE_API_URL;

  useEffect(() => {
    const fetchUserServices = async () => {
      try {
        const token = localStorage.getItem("authToken");

        if (!token) {
          setError("User not authenticated. Please log in.");
          return;
        }

        const response = await axios.get(`${baseApiUrl}/service/viewServices`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data.success) {
          setServices(response.data.allServices || []); 
        } else {
          setError("Failed to fetch booked services.");
        }
      } catch (error) {
        setError("Error fetching booked services: " + error.message);
      }
    };

    fetchUserServices();
  }, []);

  return (
    <>
    <Nav/>
    <div id="user-services-page"> {/* Main ID for the page */}
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
              services.map((service, index) => (
                <tr key={service._id} className="table-row">
                  <td className="table-cell">{index + 1}</td>
                  <td className="table-cell">{service.service}</td> {/* Corrected property name */}
                  <td className="table-cell">{new Date(service.createdAt).toLocaleDateString()}</td>
                  <td className="table-cell">{service.status || "Pending"}</td> {/* Corrected property name */}
                </tr>
              ))
            ) : (
              <tr className="table-row">
                <td colSpan="4" className="table-cell">No booked services found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </section>
    </div>
    <Footer/>
    </>
  );
}

export default UserBookedServices;
