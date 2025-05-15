import React from 'react';
import './About.css';
import Nav from '../components/Nav';
import Footer from '../components/Footer';

function About() {
    window.scrollTo(0, 0);
  return (
    
    <>
    <Nav />
    <div id="about">
      <section id="about-introduction">
        <div className="hero-section">
          <div className="hero-content">
            <h1>About Us</h1>
            <p>We are an Integrated Home Management System providing efficient and reliable services for all your home needs, including electrical, plumbing, and waste management solutions.</p>
          </div>
        </div>
      </section>

      <section id="about-details">
        <div className="container">
          <h2>Our Mission</h2>
          <p>We strive to provide homeowners with a convenient and efficient platform to manage their homes with access to trusted professionals.</p>
        </div>

        <div className="features">
          <div className="feature">
            <h3>Electrical Services</h3>
            <p>Expert electricians available 24/7 for all your electrical needs.</p>
          </div>
          <div className="feature">
            <h3>Plumbing Services</h3>
            <p>Reliable plumbers ready to assist with any issues at your convenience.</p>
          </div>
          <div className="feature">
            <h3>Waste Management</h3>
            <p>Effective waste management solutions to keep your home clean and green.</p>
          </div>
        </div>
      </section>

      <section id="contact-us">
        <p>Contact us today for more information or to book a service!</p>
      </section>
    </div>
    <Footer />
    </>
  );
}

export default About;
