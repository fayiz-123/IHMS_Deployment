import React from 'react'
import './home.css'
import Footer from '../components/Footer';
import Nav from '../components/Nav';
import {Link} from 'react-router-dom'




function Home() {
  window.scrollTo(0, 0);
  return (
    <>
     <Nav/>
      
        <main id='home'>
          {/* Hero Section */}
          <section id="introduction" className="hero-section">
            <div className="hero-overlay" />
            <div className="hero-content container">
              <h1>Welcome to Integrated Home Management System</h1>
              <p className="subheading">
                Discover Integrated Home Management System (IHMS) is a web-based platform designed to provide homeowners with a convenient and
                efficient way to manage their homes. IHMS offers a range of services, including electrical, plumbing, and waste management,
                through a network of verified professionals.
              </p>
              <a href="#services" className="btn">
                Explore More
              </a>
            </div>
          </section>
          {/* Services */}
          <section id="services">hi<br></br>hi</section>
          <section
            id="theory"
            className="color-theory-section section-container pattern-section">
            <div className="container section-flex">
              <div className="text-content">
                <h2>SERVICES </h2>
                <p>
                  Electrical, plumbing, and waste management services encompass a range of solutions designed to address critical issues in homes and businesses.
                  These services provide essential repairs to ensure functionality, safety, and efficiency in daily operations.
                </p>
              </div>
              <div className="graphic-content">
                <img className='img1' src="/images/plumm.jpg" alt="img1" />
                <img className='img2' src="/images/wastee.jpg" alt="img2" />
                <img className='img3' src="/images/mech.jpg" alt="img3" />
                <img className='img4' src="/images/electric.jpg" alt="img4" />
                <img className='img5' src="/images/Plumb.jpg" alt="img5" />
              </div>
            </div>
          </section>
          {/* Choosing services */}
          <section
            id="primary"
            className="primary-colors-section section-container pattern-section">
            <div className="container">
              <h2>CHOOSE SERVICES</h2>
              <p>
                Essential services that ensure the smooth functioning of your home, including electrical systems, plumbing solutions,
                and waste management solutions and provides 24x7 services.
              </p>
              {/* services types */}
              <div className="color-cards">
                {/* electricity box */}
                <div className="color-card one">
                  <h3>Electricity</h3>
                  <p>
                    Are electrical problems disrupting your routine?
                    Is finding an electrician during peak hours in Kerala difficult for quick solution to restore power?
                  </p>
                  <Link to='/electricity'> <button className="animated-button">
                    <svg xmlns="http://www.w3.org/2000/svg" className="arr-2" viewBox="0 0 24 24">
                      <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z" />
                    </svg>
                    <span className="text">CLICK HERE</span>
                    <span className="circle" />
                    <svg xmlns="http://www.w3.org/2000/svg" className="arr-1" viewBox="0 0 24 24">
                      <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z" />
                    </svg>
                  </button></Link>
                </div>
                {/* plumbing box */}
                <div className="color-card two">
                  <h3>Plumbing</h3>
                  <p>
                    Are plumbing issues causing inconvenience in your daily life?
                    Is it challenging to find a reliable plumber during urgent situations in Kerala?
                  </p>
                  <Link to='/plumbing'> <button className="animated-button">
                    <svg xmlns="http://www.w3.org/2000/svg" className="arr-2" viewBox="0 0 24 24">
                      <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z" />
                    </svg>
                    <span className="text">CLICK HERE</span>
                    <span className="circle" />
                    <svg xmlns="http://www.w3.org/2000/svg" className="arr-1" viewBox="0 0 24 24">
                      <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z" />
                    </svg>
                  </button></Link>
                </div>
                {/* waste managemnt box */}
                <div className="color-card three">
                  <h3>Waste Mangement</h3>
                  <p>
                    Is improper waste disposal affecting your surroundings? Finding a reliable waste management service in Kerala during peak times can be a challenge.
                  </p>
                 <Link to='/wastemanagement'> <button className="animated-button">
                    <svg xmlns="http://www.w3.org/2000/svg" className="arr-2" viewBox="0 0 24 24">
                      <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z" />
                    </svg>
                    <span className="text">CLICK HERE</span>
                    <span className="circle" />
                    <svg xmlns="http://www.w3.org/2000/svg" className="arr-1" viewBox="0 0 24 24">
                      <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z" />
                    </svg>
                  </button></Link>
                </div>
              </div>
            </div>
          </section>
          {/* newsletter */}
          <section className="newsletter-section section-container pattern-section">
            <div className="container">
              <h2>Stay Updated</h2>
              <p>
                Subscribe to our newsletter to stay updated on the latest tips
                and expert advice for repairing electrical, plumbing, and waste management solutions.
              </p>
              <form className="newsletter-form" action="#" method="post">
                <input type="email" name="email" placeholder="Your email address" />
                <button type="submit">Subscribe</button>
              </form>
            </div>
          </section>
          {/* newsltter end */}
        </main>
      

      <Footer/>
    </>

  )
}

export default Home