import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminSidebar from "../components/AdminSidebar";
import "./AdminDash.css";

function UserServices() {
  const [users, setUsers] = useState([]); 
  const [error, setError] = useState(null);
  const baseApiUrl = import.meta.env.VITE_BASE_API_URL;

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const token = localStorage.getItem("adminToken");
        if (!token) {
          setError("Admin not authenticated. Please login again.");
          return;
        }

        const response = await axios.get(`${baseApiUrl}/admin/bookedServices`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data.success) {
          setUsers(response.data.allServices); 
        } else {
          setError("Failed to fetch services.");
        }
      } catch (error) {
        setError("Error fetching services: " + error.message);
        console.error("Error fetching services:", error);
      }
    };

    fetchServices();
  }, []);


  const handleUpdate = async (serviceId, newStatus) => {
    try {
      const token = localStorage.getItem("adminToken");
      if (!token) {
        setError("Admin not authenticated. Please login again.");
        return;
      }
  
      // Prevent updating to "Booked"
      if (newStatus === "Booked") {
        alert("You cannot update the service back to 'Booked'.");
        return;
      }
  
      const response = await axios.put(
        `${baseApiUrl}/admin/updateService/${serviceId}`,
        { status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      if (response.data.success) {
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user._id === serviceId ? { ...user, status: newStatus } : user
          )
        );
        alert(`Service status updated to '${newStatus}'`);
      } else {
        alert("Failed to update service status.");
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        alert(error.response.data.message); // Show backend error message
      } else {
        alert("Error updating service: " + error.message);
      }
    }
  };
  

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminName");
    window.location.href = "/admin"; 
  };

  return (
    <div id="ad">
      <div className="container">
       
        <AdminSidebar handleLogout={handleLogout} />

       
        <main className="main-content">
          <header>
            <h1>Booked Services</h1>
          </header>

          
          <section className="table-section">
            {error && <p className="error">{error}</p>}
            <h2>Booked Services</h2>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>User Name</th>
                  <th>Email</th>
                  <th>Service Type</th>
                  <th>Date Booked</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {users && users.length > 0 ? (
                  users.map((user, index) => (
                    <tr key={user._id}>
                      <td>{index + 1}</td>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>{user.service}</td>
                      <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                      <td>
                        <select
                          value={user.status}
                          onChange={(e) => handleUpdate(user._id, e.target.value)} 
                        >
                          <option value="Booked">Booked</option>
                          <option value="Confirmed">Confirm Service</option>
                          <option value="Completed">Complete Service</option>
                          
                        </select>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5">No services found.</td>
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

export default UserServices;
