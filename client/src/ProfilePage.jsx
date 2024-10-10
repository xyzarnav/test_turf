import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";
import { BookOutlined, DollarOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { format } from "date-fns";

const ProfilePage = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [walletBalance, setWalletBalance] = useState(null);
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
        
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    const userId = localStorage.getItem("UserID");

    const fetchWalletBalance = async () => {
      try {
        const response = await fetch(`http://localhost:3001/wallet/${userId}`);
        if (!response.ok) {
          throw new Error("Network response was not ok " + response.statusText);
        }
        const data = await response.json();
        console.log(data);
        setWalletBalance(data.wallet_balance);
      } catch (err) {
        console.error("Error fetching wallet balance:", err);
      }
    };

    if (userId) {
      fetchWalletBalance();
    }
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

  const formattedDate = userData ? format(new Date(userData.DateOfBirth), 'MMMM dd, yyyy') : '';

  return (
    <div className="min-h-screen flex flex-col justify-between bg-gray-50">
      <Navbar />
      <div className="container mx-auto p-6 sm:p-8">
        <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-8">
          User Profile
        </h1>
        {userData && (
          <div className="bg-white shadow-lg rounded-lg p-6 sm:p-8 mb-8 transition-transform transform flex flex-col space-y-4">
            <p className="text-lg mb-4 text-gray-700">
              <strong className="font-semibold">Name:</strong>{" "}
              {userData.FullName}
            </p>
            <p className="text-lg mb-4 text-gray-700">
              <strong className="font-semibold">Email:</strong> {userData.Email}
            </p>
            <p className="text-lg mb-4 text-gray-700">
              <strong className="font-semibold">Date of Birth:</strong>{" "}
              {formattedDate}
            </p>
            <p className="text-lg mb-4 text-gray-700">
              <strong className="font-semibold">Gender:</strong>{" "}
              {userData.Gender}
            </p>
            <div>
              <p className="text-lg mb-4 text-gray-700">
                <strong className="font-semibold">Wallet:</strong>{" "}
                {walletBalance !== null ? `₹${walletBalance}` : "Loading..."}
              </p>
            </div>
          </div>
        )}
        <div className="flex flex-col space-y-4 items-center">
          <Link to="/view-bookings">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors duration-200 ease-in-out flex items-center">
              <BookOutlined className="mr-2" />
              View Bookings
            </button>
          </Link>
          <Link to="/Addmoney">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors duration-200 ease-in-out flex items-center">
              <DollarOutlined className="mr-2" />
              Add Money
            </button>
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProfilePage;