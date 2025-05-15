import React from "react";
import "./Electricity.css"; // Shared CSS
import Footer from "../components/Footer";
import Nav from "../components/Nav";
import { Link } from 'react-router-dom';

const Electricity = () => {
  window.scrollTo(0, 0);

  return (
    <>
      <Nav />
      <div id="elec">
        <div id="home" className="electricity-services pattern-section">
          <div className="hero-section">
            <div className="hero-content">
              <h1>Our Electricity Services</h1>
              <p className="subheading">
                At IHMS, we provide top-quality electrical services for both residential and commercial properties. Our team of certified electricians ensures safe and efficient electrical installations, repairs, and maintenance. 
              </p>
            </div>
          </div>

          <div className="electricity-details">
            <p>
              Electricity is an essential part of modern life, powering everything from home appliances to industrial machinery. A well-maintained electrical system ensures safety, efficiency, and reliability in your daily operations. Whether you're facing frequent power outages, faulty wiring, or planning a complete electrical setup, our skilled professionals are here to help.
            </p>

            <p>
              We specialize in a wide range of electrical solutions, including wiring and rewiring, circuit breaker installations, electrical panel upgrades, lighting solutions, and surge protection. Our experts assess your specific needs and provide tailored solutions that meet industry standards.
            </p>

            <p>
              Safety is our top priority. Poor electrical installations and outdated wiring can pose serious risks, including fire hazards and electrical shocks. Our licensed electricians use high-quality materials and follow strict safety guidelines to ensure your home and business remain secure.
            </p>

            <p>
              Whether you need minor electrical repairs or large-scale installations, our experienced team is committed to delivering prompt and reliable services. We believe in transparency and offer competitive pricing with no hidden charges.
            </p>

            <p>
              Need immediate assistance? Our 24/7 emergency electrical services are designed to address urgent electrical failures, ensuring minimal downtime for your home or business.
            </p>
          </div>

          {/* Book Now Button Section */}
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

export default Electricity;
