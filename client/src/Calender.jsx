import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css"; // Import default styles
import Navbar from "./Navbar";
import Footer from "./Footer";
import axios from "axios";
import "./CustomCalendar.css"; // Import custom styles
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClock,
  faRupeeSign,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";

const CalendarComponent = () => {
  const [value, setValue] = useState(new Date());
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchBookings = async (selectedDate) => {
    const formattedDate = selectedDate.toISOString().split("T")[0];
    setLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:3001/bookings/${formattedDate}`
      );
      setBookings(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings(value);
  }, [value]);

  const formatBookings = () => {
    if (loading) {
      return <p>Loading...</p>;
    }
    if (bookings.length === 0) {
      return <p>No bookings for {value.toDateString()}</p>;
    }
    return bookings.map((booking) => (
      <div key={booking.id} className="p-4 border-b border-gray-700 w-full">
        <h3 className="font-semibold text-lg text-black mb-2 text-center">
          {booking.turfName}
        </h3>
        <p className="text-black flex items-center mb-1">
          <FontAwesomeIcon icon={faClock} className="mr-2 text-blue-400" />
          Time: {booking.time_slot}:00 - {booking.time_slot + 1}:00
        </p>
        <p className="text-black flex items-center">
          <FontAwesomeIcon icon={faUsers} className="mr-2 text-yellow-400" />
          Number of People:{" "}
          <span className="font-bold text-black ml-1">
            {booking.numberOfPeople}
          </span>
        </p>
      </div>
    ));
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <div className="flex-grow flex items-center justify-center p-6">
        <div className="bg-white shadow-lg rounded-lg p-6 w-full flex max-w-full">
          <div className="flex-grow">
            <Calendar
              onChange={setValue}
              value={value}
              className="custom-calendar text-lg"
            />
          </div>
          <div className="ml-6 w-1/2 bg-gray-100 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-center mb-4">
              Bookings for {value.toDateString()}:
            </h2>
            <div className="text-gray-700">{formatBookings()}</div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CalendarComponent;
