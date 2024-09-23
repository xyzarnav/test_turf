import React, { useEffect, useState } from "react";
import "./Bookings.css"; // You can remove this if you're using Tailwind for all styling
import Navbar from "./Navbar";
import Footer from "./Footer";
import axios from "axios";

const BookingsPage = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      const userEmail = localStorage.getItem("UserEmail");
      if (!userEmail) {
        setError("User email not found in localStorage");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(
          `http://localhost:3001/bookings/${userEmail}`
        );
        setBookings(response.data);
      } catch (error) {
        setError("Failed to fetch bookings");
        console.error("Error fetching bookings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Navbar />
      <div className="flex-grow p-4">
        <h2 className="text-3xl font-bold text-center mb-6">Your Bookings</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookings.map((booking, index) => (
            <div
              key={index}
              className="bg-white shadow-lg rounded-lg p-4 transition-transform transform hover:scale-105"
            >
              <h3 className="text-xl font-semibold">{booking.turfName}</h3>
              <p>Date: {booking.date}</p>
              <p>
                Time: {booking.time_slot}:00 - {booking.time_slot + 1}:00
              </p>
              <p>Amount: {booking.price} Rupees</p>
              <p>Number of People: {booking.numberOfPeople}</p>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BookingsPage;
