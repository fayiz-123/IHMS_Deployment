import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios'
import "./Nav.css";

function Nav() {
  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const baseApiUrl = import.meta.env.VITE_BASE_API_URL;
  

  useEffect(()=>{
    const fetchUser = async () => {
      const authToken = localStorage.getItem('authToken');
      if(!authToken){
        setUser(null);
        return;
      }
      

      try {
        const response = await axios.get(`${baseApiUrl}/profile`,{
          headers: {
            Authorization : `Bearer ${authToken}`   
            
          }
          
        })
       
        setUser({username:response.data.username})
        
      } catch (error) {
        console.error("Token invalid or user fetch failed:", error);
        // Token might be invalid or expired — log user out
        localStorage.removeItem("authToken");
        setUser(null);
      }
    }
    fetchUser()
  },[])

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("username");
    setUser(null);
    navigate("/login");
  };

  return (
    <div id="nav">
      <header>
        <nav>
          {/* Logo */}
          <div className="logo">
            <span>I H M S</span>
          </div>

          {/* Mobile Menu Button */}
          <div
            className={`menu-icon ${menuOpen ? "toggle" : ""}`}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <div className="nav-icon"></div>
          </div>

          {/* Navigation Links */}
          <ul className={`nav-links ${menuOpen ? "nav-active" : ""}`}>
            <li><Link to="/" onClick={() => setMenuOpen(false)}>Home</Link></li>
            <li><Link to="/about" onClick={() => setMenuOpen(false)}>About</Link></li>
            <li><Link to="/contact" onClick={() => setMenuOpen(false)}>Contact</Link></li>
            <li><Link to="/myBookings" onClick={() => setMenuOpen(false)}>Bookings</Link></li>

            {user ? (
              <>
                {/* ✅ Username (Clickable Link, Different Style) */}
                <li>
                  <Link to="/profile" className="user-link" onClick={() => setMenuOpen(false)}>
                    Hello, {user.username}!
                  </Link>
                </li>
                <li>
                  <button onClick={handleLogout} className="logout-btn">
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <li><Link to="/login" onClick={() => setMenuOpen(false)}>Login</Link></li>
            )}
          </ul>
        </nav>
      </header>
    </div>
  );
}

export default Nav;
