import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import Footer from "./Footer";

const ShowEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchEvents = async () => {
    try {
      const response = await axios.get("http://localhost:3001/showevents");
      setEvents(response.data);
    } catch (error) {
      console.error("Error fetching events:", error);
      setError("Failed to load events.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  if (loading) {
    return <p className="text-center text-gray-500">Loading events...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  return (
    <>
    <Navbar />
      <div className="bg-gray-50 py-12 px-4">
        <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-10">
          Upcoming Events
        </h2>
        <div className="flex flex-wrap justify-center gap-8 px-4 max-w-7xl mx-auto">
          {events.map((event) => (
            <div
              key={event.event_id}
              className="bg-white rounded-lg shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition duration-300 w-80"
            >
              <img
                src={event.imageURL}
                alt={event.title}
                className="rounded-t-lg w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  {event.title}
                </h3>
                <p className="text-gray-700 text-base mb-4">
                  {event.description}
                </p>
                <div className="text-gray-600 mb-4">
                  <p>
                    <strong>Date:</strong> {new Date(event.date).toDateString()}
                  </p>
                  <p>
                    <strong>Time:</strong> {event.time}
                  </p>
                  <p>
                    <strong>Location:</strong> {event.location}
                  </p>
                </div>
                <a
                  href={event.link}
                  className="inline-block text-center text-white bg-blue-500 hover:bg-blue-600 rounded-full py-2 px-4 transition duration-300"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View More
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ShowEvents;
