import React from "react";
import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaLinkedin,
  FaWordpress,
} from "react-icons/fa";
import "./Footer.css"; // Import the custom CSS file

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-section">
          <h3>CUSTOMER SUPPORT</h3>
          <ul>
            <li>Book Online</li>
            <li>Cancel Booking</li>
            <li>Customer Care (Mon - Fri | 10am - 5pm)</li>
            <li>&#9742; 81697 29906</li>
          </ul>
        </div>
        <div className="vertical-line" />

        <div className="footer-section">
          <h3>TURFIT</h3>
          <ul>
            <li>About Us</li>
            <li>Press</li>
            <li>We Are Hiring</li>
            <li>Contact Us</li>
            <li>Feedback</li>
          </ul>
        </div>
        <div className="vertical-line-1" />

        <div className="footer-section">
          <h3>KEEP PLAYING</h3>
          <div className="social-icons">
            <a href="#" className="icon">
              <FaFacebook />
            </a>
            <a href="#" className="icon">
              <FaInstagram />
            </a>
            <a href="#" className="icon">
              <FaTwitter />
            </a>
            <a href="#" className="icon">
              <FaLinkedin />
            </a>
            <a href="#" className="icon">
              <FaWordpress />
            </a>
          </div>
          <div className="subscribe">
            <input
              type="email"
              placeholder="Enter your Email address"
              className="email-input"
            />
            <button className="subscribe-button">Subscribe</button>
          </div>
        </div>
        <div className="vertical-line" />

        <div className="footer-section">
          <h3>FOR SPORTS BRANDS</h3>
          <ul>
            <li>Advertise With Us</li>
            <li>Partnerships Form</li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2024 TurfIt. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
