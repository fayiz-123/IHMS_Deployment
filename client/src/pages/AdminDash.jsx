import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AdminSidebar from "../components/AdminSidebar";
import "./AdminDash.css";

function AdminDash() {
  const navigate = useNavigate();
  const [adminName, setAdminName] = useState("");
  const [users, setUsers] = useState([]); 
  const [error, setError] = useState(null); // State to handle errors
  const baseApiUrl = import.meta.env.VITE_BASE_API_URL;

  useEffect(() => {
    const storedAdminName = localStorage.getItem("adminName");
    if (storedAdminName) {
      setAdminName(storedAdminName);
    } else {
      navigate("/adminlogin"); // Redirect if not logged in
    }

   
    const fetchUsers = async () => {
      try {
        console.log("Sending request to backend...");
            
        const token = localStorage.getItem("adminToken");
        
        if (!token) {
          setError("Admin not authenticated. Please login again.");
          return; 
        }
        
        
        const response = await axios.get(`${baseApiUrl}/admin/getUsers`, {
          headers: {
            Authorization: `Bearer ${token}`, // Include token in the headers
          },
        });
        
        if (response.data.success) {
          setUsers(response.data.allUsers);
          console.log("Users data:", response.data.allUsers);
        } else {
          setError("Failed to fetch users.");
        }
      } catch (error) {
        setError("Error fetching users: " + error.message);
        console.error("Error fetching users:", error);
      }
    };
    

    fetchUsers();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminName");
    navigate("/admin");
  };

  return (
    <div id="ad">
      <div className="container">
        {/* Sidebar as separate component */}
        <AdminSidebar handleLogout={handleLogout} />

        {/* Main Content */}
        <main className="main-content">
          <header>
            <h1>Welcome, {adminName || "Admin"}!</h1>
          </header>

          {/* Table Section */}
          <section className="table-section">
            <h2>Recent Users</h2>
            {error && <p className="error">{error}</p>}  {/* Display error message if any */}
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Date Created</th>
                </tr>
              </thead>
              <tbody>
                {users.length > 0 ? (
                  users.map((user, index) => (
                    <tr key={user._id}>
                      <td>{index + 1}</td>
                      <td>{user.username}</td>
                      <td>{user.email}</td>
                      <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4">No users found.</td>
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

export default AdminDash;
