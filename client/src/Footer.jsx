import React from "react";
import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaLinkedin,
  FaWordpress,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto flex flex-wrap justify-between p-6">
        <div className="footer-section w-full md:w-1/4 mb-6">
          <h3 className="text-lg font-semibold mb-2">CUSTOMER SUPPORT</h3>
          <ul className="space-y-1">
            <li>Book Online</li>
            <li>Cancel Booking</li>
            <li>Customer Care (Mon - Fri | 10am - 5pm)</li>
            <li>&#9742; 81697 29906</li>
          </ul>
        </div>

        <div className="footer-section w-full md:w-1/4 mb-6">
          <h3 className="text-lg font-semibold mb-2">SPORLOC</h3>
          <ul className="space-y-1">
            <li>About Us</li>
            <li>Press</li>
            <li>We Are Hiring</li>
            <li>Contact Us</li>
            <li>Feedback</li>
          </ul>
        </div>

        <div className="footer-section w-full md:w-1/4 mb-6">
          <h3 className="text-lg font-semibold mb-2">KEEP PLAYING</h3>
          <div className="flex space-x-4 mb-4">
            <a href="#" className="text-xl hover:text-blue-500">
              <FaFacebook />
            </a>
            <a href="#" className="text-xl hover:text-blue-500">
              <FaInstagram />
            </a>
            <a href="#" className="text-xl hover:text-blue-500">
              <FaTwitter />
            </a>
            <a href="#" className="text-xl hover:text-blue-500">
              <FaLinkedin />
            </a>
            <a href="#" className="text-xl hover:text-blue-500">
              <FaWordpress />
            </a>
          </div>
          <div className="flex space-x-2">
            <input
              type="email"
              placeholder="Enter your Email address"
              className="p-2 rounded bg-gray-700 text-white placeholder-gray-400"
            />
            <button className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-500 transition">
              Subscribe
            </button>
          </div>
        </div>

        <div className="footer-section w-full md:w-1/4 mb-6">
          <h3 className="text-lg font-semibold mb-2">FOR BUSINESSES</h3>
          <ul className="space-y-1">
            <li>How This Works</li>
            <li>Add A Ground</li>
            <div className="flex space-x-2 mt-2">
              <li>
                <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500 transition">
                  BUSINESS LOGIN
                </button>
              </li>
              <li>
                <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500 transition">
                  REGISTER WITH US
                </button>
              </li>
            </div>
          </ul>
        </div>

        <div className="footer-section w-full md:w-1/4 mb-6">
          <h3 className="text-lg font-semibold mb-2">FOR SPORTS BRANDS</h3>
          <ul className="space-y-1">
            <li>Advertise With Us</li>
            <li>Partnerships Form</li>
          </ul>
        </div>
      </div>
      <div className="text-center py-4 border-t border-gray-700">
        <p className="text-sm">© 2024 Sporloc. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
