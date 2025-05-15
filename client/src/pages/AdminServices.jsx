import React from 'react'
import'./UserDash.css'
import { Link } from 'react-router-dom'

function AdminDash() {
  return (
    <div id='ad'>
        <div className="container">
  {/* Sidebar */}
  <aside className="sidebar">
    <h2>Admin Panel</h2>
    <nav>
      <ul>
        <li>
         <Link to="/admindash">Admin Dashboard</Link>
        </li>
        <li>
           <Link to='/userdash'>User Booking Activity</Link>
        </li>
        <li>
          <a href="#">Logout</a>
        </li>
      </ul>
    </nav>
  </aside>
  {/* Main Content */}
  <main className="main-content">
    <header>
      <h1>Welcome, Admin!</h1>
    </header>
    {/* Cards Section */}
    {/* Table Section */}
    <section className="table-section">
      <h2>Recent Activity</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Date</th>
            <th>Service</th>
            <th>Address</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>001</td>
            <td>John Doe</td>
            <td>john_doe@gmail.com</td>
            <td>2025-01-01</td>
            <td>plumbing</td>
            <td>dfygqjhhoiapok;kla</td>
            <td>active</td>
            <td>remove</td>
          </tr>
          <tr>
            <td>002</td>
            <td>Jane Smith</td>
            <td>Updated Profile</td>
            <td>2025-01-02</td>
            <td>plumbing</td>
            <td>dfygqjhhoiapok;kla</td>
            <td>active</td>
          </tr>
          <tr>
            <td>003</td>
            <td>Mike Johnson</td>
            <td>Logged Out</td>
            <td>2025-01-03</td>
            <td>plumbing</td>
            <td>dfygqjhhoiapok;kla</td>
            <td>active</td>
          </tr>
        </tbody>
      </table>
    </section>
  </main>
</div>

    </div>
  )
}

export default AdminDash