import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Nav.css";

function Nav() {
  const [userName, setUserName] = useState(null);
  const [profilePic, setProfilePic] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const baseApiUrl = import.meta.env.VITE_BASE_API_URL;

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem("authToken");
        if (!token) return;

        const { data } = await axios.get(`${baseApiUrl}/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (data.success) {
          const user = data.userProfile;
          setUserName(user.username);
          setProfilePic(user.profilePic);
        }
      } catch (err) {
        console.error("User fetch failed:", err);
      }
    };

    fetchUserProfile();
  }, []);

  return (
    <div id="nav">
      <header>
        <nav>
          {/* Logo */}
          <div className="logo">
            <Link to="/" className="logo-link">
              <img src="/IHMS.png" alt="IHMS Logo" className="logo-img" />
              <span>I H M S</span>
            </Link>
          </div>

          {/* Navigation Links */}
          <ul className={`nav-links ${menuOpen ? "nav-active" : ""}`}>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <li><Link to="/myBookings">Bookings</Link></li>

            {!userName && (
              <li><Link to="/login">Login</Link></li>
            )}

            {/* Profile inside menu on mobile */}
            {userName && (
              <li className="mobile-profile">
                <Link to="/profile" className="user-link">
                  <span className="username">Hello, <b>{userName}</b></span>
                  <img
                    src={
                      profilePic && profilePic !== "null" && profilePic !== "undefined"
                        ? `${baseApiUrl}${profilePic.startsWith("/") ? profilePic : `/${profilePic}`}`
                        : "https://www.w3schools.com/howto/img_avatar.png"
                    }
                    alt="Profile"
                    className="profile-image"
                  />
                </Link>
              </li>
            )}
          </ul>

          {/* Profile top-right on desktop */}
          {userName && (
            <div className="profile-right desktop-only">
              <Link to="/profile" className="user-link">
                <span className="username">Hello, <b>{userName}</b></span>
                <img
                  src={
                    profilePic && profilePic !== "null" && profilePic !== "undefined"
                      ? `${baseApiUrl}${profilePic.startsWith("/") ? profilePic : `/${profilePic}`}`
                      : "https://www.w3schools.com/howto/img_avatar.png"
                  }
                  alt="Profile"
                  className="profile-image"
                />
              </Link>
            </div>
          )}

          {/* Hamburger Menu Icon */}
          <div
            className={`menu-icon ${menuOpen ? "toggle" : ""}`}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <div className="nav-icon"></div>
          </div>
        </nav>
      </header>
    </div>
  );
}

export default Nav;
