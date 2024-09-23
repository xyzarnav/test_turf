import React from "react";
import { Link } from "react-router-dom";
import { UserOutlined } from "@ant-design/icons";
import { Avatar, Space } from "antd";

const url =
  "https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg";

const Navbar = () => {
  return (
    <nav className="bg-gray-800 bg-opacity-75 p-4 shadow-lg border-b border-gray-700">
      <div className="container mx-auto flex justify-between items-center">
        <Link
          to="/"
          id="sitetitle"
          className="text-white text-3xl font-bold hover:text-gray-300 transition duration-300"
        >
          Book My Turf
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
            <li className="navitem">
              <Link
                to="/contact"
                className="text-white hover:text-gray-300 transition duration-300"
              >
                Contact
              </Link>
            </li>
            <li className="navitem">
              <Link
                to="/Calendar"
                className="text-white hover:text-gray-300 transition duration-300"
              >
                Calender
              </Link>
            </li>
            <li className="navitem">
              <Link
                to="/addturf"
                className="text-white hover:text-gray-300 transition duration-300"
              >
                Add Turf
              </Link>
            </li>
            <li className="navitem">
              <Link
                to="/bookingwindow"
                className="text-white hover:text-gray-300 transition duration-300"
              >
                Book now
              </Link>
            </li>
          </ul>

          <Link to="/profile" className="avatar-link">
            <div className="avatar-container">
              <Space size={16} wrap>
                <Avatar icon={<UserOutlined />} />
              </Space>
            </div>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
