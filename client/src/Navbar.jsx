import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserOutlined } from "@ant-design/icons";
import { Avatar, Space } from "antd";

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
    <nav className="bg-gray-800 bg-opacity-75 p-4 shadow-lg border-b border-gray-700">
      <div className="container mx-auto flex justify-between items-center">
        <Link
          to="/"
          id="sitetitle"
          className="text-white text-3xl font-bold hover:text-gray-300 transition duration-300"
        >
          TurfIt
        </Link>

        <div className="flex items-center space-x-4">
          <ul className="flex space-x-6">
            <li className="navitem">
              <Link
                to="/home"
                className="text-white hover:text-gray-300 transition duration-300"
              >
                Home
              </Link>
            </li>
            <li className="navitem">
              <Link
                to="/about"
                className="text-white hover:text-gray-300 transition duration-300"
              >
                About
              </Link>
            </li>
            {!isAdmin && (
              <li className="navitem">
                <Link
                  to="/contact"
                  className="text-white hover:text-gray-300 transition duration-300"
                >
                  Contact
                </Link>
              </li>
            )}
            {isAdmin && (
              <li className="navitem">
                <Link
                  to="/Dashboard"
                  className="text-white hover:text-gray-300 transition duration-300"
                >
                  Dashboard
                </Link>
              </li>
            )}
            <li className="navitem">
              <Link
                to="/calendar"
                className="text-white hover:text-gray-300 transition duration-300"
              >
                Calendar
              </Link>
            </li>

            {/* Conditionally render Add Turf if the user is an admin */}
            {isAdmin && (
              <li className="navitem">
                <Link
                  to="/addturf"
                  className="text-white hover:text-gray-300 transition duration-300"
                >
                  Add Turf
                </Link>
              </li>
            )}
            {!isAdmin && (
              <li className="navitem">
                <Link
                  to="/bookingwindow"
                  className="text-white hover:text-gray-300 transition duration-300"
                >
                  Book now
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
            className="text-white hover:text-gray-300 transition duration-300"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
