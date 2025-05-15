import React from "react";
import { Link } from "react-router-dom";
import "../pages/AdminDash.css"; 

function AdminSidebar({ handleLogout }) {
  return (
    <aside className="sidebar">
      <h2>Admin Panel</h2>
      <nav>
        <ul>
          <li><Link to="/admin-dashboard">Users</Link></li>
          <li><Link to="/userBookings">Users Booking Services</Link></li>
          <li><Link to="/contactMessages">Contact Messages</Link></li>
          <li>
            <a href="#" onClick={handleLogout} className="logout-btn">
              Logout
            </a>
          </li>
        </ul>
      </nav>
    </aside>
  );
}

export default AdminSidebar;
