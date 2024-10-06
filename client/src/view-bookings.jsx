import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Link } from "react-router-dom";
import { BookOutlined, DollarOutlined } from "@ant-design/icons";

const ViewBookings = () => {
  const [bookingsData, setBookingsData] = useState([]); // Store bookings array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserBookings = async () => {
      const userId = localStorage.getItem("UserID");
      console.log("user id is", userId);

      if (!userId) {
        setError("User ID not found in localStorage");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          `http://localhost:3001/bookings/${userId}`
        );
        if (!response.ok) {
          if (response.status === 404) {
            throw new Error("No bookings found for this user.");
          } else {
            throw new Error(
              "Network response was not ok: " + response.statusText
            );
          }
        }
        const data = await response.json();
        setBookingsData(data); // Set bookings data
      } catch (error) {
        setError(error.message);
        console.error("Fetch bookings data error:", error); // Log error for debugging
      } finally {
        setLoading(false);
      }
    };

    fetchUserBookings();
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

  return (
    <div className="min-h-screen flex flex-col justify-between bg-gray-50">
      <Navbar />
      <div className="container mx-auto p-6 sm:p-8">
        <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-8">
          Your Bookings
        </h1>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {bookingsData.length > 0 ? (
            bookingsData.map((booking) => (
              <div
                key={booking.id}
                className="bg-white shadow-lg rounded-lg p-6 transition-transform transform hover:scale-105"
              >
                <p className="text-lg mb-4 text-gray-700">
                  <strong className="font-semibold">Turf Name:</strong>{" "}
                  {booking.name}
                </p>
                <p className="text-lg mb-4 text-gray-700">
                  <strong className="font-semibold">Date:</strong>{" "}
                  {new Date(booking.date).toLocaleDateString()}
                </p>
                <p className="text-lg mb-4 text-gray-700">
                  <strong className="font-semibold">Time Slot:</strong>{" "}
                  {booking.time_slot}
                </p>
                <p className="text-lg mb-4 text-gray-700">
                  <strong className="font-semibold">Number of People:</strong>{" "}
                  {booking.numberOfPeople}
                </p>
                {/* <p className="text-lg mb-4 text-gray-700">
                  <strong className="font-semibold">Payment Proof:</strong>{" "}
                  {booking.paymentProof ? "Uploaded" : "Not Uploaded"}
                </p> */}
                <p className="text-lg mb-4 text-gray-700">
                  <strong className="font-semibold">Method of Booking:</strong>{" "}
                  {booking.method_of_booking}
                </p>
              </div>
            ))
          ) : (
            <div className="text-lg text-center text-gray-700">
              No bookings found for this user.
            </div>
          )}
        </div>
        <div className="flex justify-center space-x-4 mt-8">
          <Link to="/profile">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors duration-200 ease-in-out flex items-center">
              <BookOutlined className="mr-2" />
              Profile
            </button>
          </Link>
          <Link to="/add-money">
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

export default ViewBookings;
