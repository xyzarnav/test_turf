import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";
import { BookOutlined, DollarOutlined } from "@ant-design/icons";

const ProfilePage = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      const userId = localStorage.getItem("UserID");
      if (!userId) {
        setError("User ID not found in localStorage");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`http://localhost:3001/user/${userId}`);
        if (!response.ok) {
          throw new Error("Network response was not ok " + response.statusText);
        }
        const data = await response.json();
        setUserData(data);
        // localStorage.setItem("UserId", data.id);
        console.log(localStorage);
        
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return <div className="text-center text-xl mt-10">Loading...</div>;
  }

  if (error) {
    return (
      <div className="text-center text-xl text-red-500 mt-10">
        Error: {error}
      </div>
    );
  }

  const handleBookingsClick = () => {
    navigate("/bookings");
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-gray-50">
      <Navbar />
      <div className="container mx-auto p-6 sm:p-8">
        <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-8">
          User Profile
        </h1>
        {userData && (
          <div className="bg-white shadow-lg rounded-lg p-6 sm:p-8 mb-8 transition-transform transform hover:scale-105">
            <p className="text-lg mb-4 text-gray-700">
              <strong className="font-semibold">Name:</strong>{" "}
              {userData.FullName}
            </p>
            <p className="text-lg mb-4 text-gray-700">
              <strong className="font-semibold">Email:</strong> {userData.Email}
            </p>
            <p className="text-lg mb-4 text-gray-700">
              <strong className="font-semibold">Date of Birth:</strong>{" "}
              {userData.DateOfBirth}
            </p>
            <p className="text-lg mb-4 text-gray-700">
              <strong className="font-semibold">Gender:</strong>{" "}
              {userData.Gender}
            </p>
            <p className="text-lg mb-4 text-gray-700">
              <strong className="font-semibold">Wallet:</strong>{" "}
              {/* {userData.Gender} */}
            </p>
          </div>
        )}
        <div className="flex justify-center space-x-4">
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors duration-200 ease-in-out flex items-center"
            onClick={handleBookingsClick}
          >
            <BookOutlined className="mr-2" />
            View Bookings
          </button>
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors duration-200 ease-in-out flex items-center"
            onClick={handleBookingsClick}
          >
            <DollarOutlined className="mr-2" />
            Add Money
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProfilePage;
