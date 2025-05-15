import React from "react";
import "./WasteManagement.css"; 
import Footer from "../components/Footer";
import Nav from "../components/Nav";
import { Link } from 'react-router-dom';

const WasteManagement = () => {
  window.scrollTo(0, 0);

  return (
    <>
      <Nav />
      <div id="waste-management">
        <div className="hero-section">
          <div className="hero-content">
            <h1>Our Waste Management Services</h1>
            <p className="subheading">
              At IHMS, we offer a wide range of waste management services for homes and businesses. Whether you're looking for residential waste collection, commercial solutions, or eco-friendly disposal, we provide comprehensive and environmentally responsible services to meet your needs.
            </p>
          </div>
        </div>

        <div className="waste-details">
          <p>
            Our waste management solutions cover everything from regular household waste collection to large-scale commercial waste disposal. We prioritize sustainability, ensuring that all waste is disposed of in an eco-friendly manner. Whether you need a one-time cleanup or regular waste collection, our team of professionals will handle it all with efficiency and care.
          </p>
          <p>
            We also provide tailored waste management services to businesses, ensuring that your office or commercial property stays clean and compliant with environmental regulations. Our eco-friendly disposal methods aim to reduce landfill waste and encourage recycling and waste reduction.
          </p>
          <p>
            With years of experience in the industry, we are committed to providing reliable, cost-effective, and green waste management solutions to keep your space clean and contribute to a healthier planet.
          </p>
        </div>

        <div className="book-now-section">
          <Link to="/book-now">
            <button className="book-now-button">Book Now</button>
          </Link>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default WasteManagement;
