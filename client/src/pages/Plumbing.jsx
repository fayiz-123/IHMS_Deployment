import React from "react";
import "./Plumbing.css"; // Shared CSS
import Footer from "../components/Footer";
import Nav from "../components/Nav";
import { Link } from 'react-router-dom';

const Plumbing = () => {
  window.scrollTo(0, 0);

  return (
    <>
      <Nav />
      <div id="plumbing">
        <div id="home" className="plumbing-services pattern-section">
          <div className="hero-section">
            <div className="hero-content">
              <h1>Our Plumbing Services</h1>
              <p className="subheading">
                At IHMS, we offer a comprehensive range of plumbing solutions to keep your property in top condition. Whether you're facing an emergency or need routine maintenance, our licensed plumbers are always available to ensure your plumbing systems are running smoothly.
              </p>
            </div>
          </div>

          <div className="plumbing-details">
            <p>
              We specialize in providing residential, commercial, and emergency plumbing services. Our team of professionals is well-equipped to handle everything from simple repairs to complex installations. Whether you need help with fixing a leaky faucet or installing new plumbing systems in your property, we ensure quick, reliable, and affordable solutions.
            </p>
            <p>
              Our residential services include fixing leaks, cleaning drains, and ensuring your water systems are functioning properly. For commercial properties, we handle large-scale plumbing systems and ensure minimal disruption to your business. Additionally, our 24/7 emergency plumbing services ensure that no matter the time of day, you're covered for urgent plumbing needs.
            </p>
            <p>
              With years of experience and a commitment to customer satisfaction, we guarantee high-quality service every time. We use only top-grade materials and the latest tools to ensure durability and efficiency in all of our plumbing solutions.
            </p>
          </div>

          <div className="book-now-section">
            <Link to="/book-now">
              <button className="book-now-button">Book Now</button>
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Plumbing;
