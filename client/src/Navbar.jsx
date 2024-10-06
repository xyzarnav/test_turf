import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserOutlined } from "@ant-design/icons";
import { Avatar, Space } from "antd";
import "./Navbar.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const Navbar = () => {
  const navigate = useNavigate();

  // Get admin status from localStorage
  const isAdmin = localStorage.getItem("isAdmin") === "true";

  const handleLogout = () => {
    // Clear user session or token
    localStorage.removeItem("userToken"); // Remove user token
    localStorage.removeItem("isAdmin"); // Remove admin status

    // Redirect to the home page or login page
    navigate("/");
  };
  return (
    <nav id="nav1">
      <div id="top-nav">
        <Link
          to="/"
          id="sitetitle"
          className="text-white text-3xl font-bold hover:text-white transition duration-300"
        >
          TurfIt
        </Link>

        <div className="flex items-center space-x-4">
          <ul className="flex space-x-6">
            <li className="navitem">
              <Link
                to="/home"
                className="text-white hover:text-white transition duration-300"
              >
                HOME
              </Link>
            </li>
            <li className="navitem">
              <Link
                to="/about"
                className="text-white hover:text-white transition duration-300"
              >
                ABOUT
              </Link>
            </li>
            {!isAdmin && (
              <li className="navitem">
                <Link
                  to="/contact"
                  className="text-white hover:text-white transition duration-300"
                >
                  CONTACT
                </Link>
              </li>
            )}
            {isAdmin && (
              <li className="navitem">
                <Link
                  to="/Dashboard"
                  className="text-white hover:text-white transition duration-300"
                >
                  DASHBOARD
                </Link>
              </li>
            )}
            <li className="navitem">
              <Link
                to="/calendar"
                className="text-white hover:text-white transition duration-300"
              >
                CALENDER
              </Link>
            </li>
            <li className="navitem">
              <Link
                to="/ShowEvents"
                className="text-white hover:text-white transition duration-300"
              >
                EVENTS
              </Link>
            </li>

            {/* Conditionally render Add Turf if the user is an admin */}
            {isAdmin && (
              <li className="navitem">
                <Link
                  to="/addturf"
                  className="text-white hover:text-white transition duration-300"
                >
                  ADD TURF
                </Link>
              </li>
            )}
            {isAdmin && (
              <li className="navitem">
                <Link
                  to="/AddEvent"
                  className="text-white hover:text-white transition duration-300"
                >
                  ADD EVENT
                </Link>
              </li>
            )}
            {!isAdmin && (
              <li className="navitem">
                <Link
                  to="/bookingwindow"
                  className="text-white hover:text-white transition duration-300"
                >
                  BOOK NOW
                </Link>
              </li>
            )}
          </ul>

          <Link to="/profile" className="avatar-link">
            <div className="avatar-container">
              <Space size={16} wrap>
                <Avatar icon={<UserOutlined />} />
              </Space>
            </div>
          </Link>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="text-white hover:text-white transition duration-300"
          >
            LOGOUT
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
