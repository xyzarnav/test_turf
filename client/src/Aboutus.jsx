import React from "react";
import Navbar from "./Navbar"; // Import the Navbar component
import Footer from "./Footer";

const AboutUs = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar /> {/* Add Navbar component */}
      <div className="navmistake"></div>
      <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-lg rounded-lg p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-extrabold text-gray-900">
              About BookMyTurf
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              <b>
                BookMyTurf is your ultimate destination for hassle-free turf
                booking.
              </b>
            </p>
            <p className="mt-2 text-lg text-gray-600">
              <b>
                BookMyTurf was born out of the need to simplify the process of
                booking turfs for sports activities. Our goal is to provide
                sports enthusiasts with an effortless experience to discover,
                book, and manage turf bookings seamlessly.
              </b>
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center mb-8">
            <div className="stat bg-gray-50 p-6 rounded-lg shadow-md">
              <h3 className="text-2xl font-bold text-blue-600">2+</h3>
              <p className="mt-2 text-gray-600">Cities Covered</p>
            </div>
            <div className="stat bg-gray-50 p-6 rounded-lg shadow-md">
              <h3 className="text-2xl font-bold text-blue-600">10+</h3>
              <p className="mt-2 text-gray-600">Turf Partners</p>
            </div>
            <div className="stat bg-gray-50 p-6 rounded-lg shadow-md">
              <h3 className="text-2xl font-bold text-blue-600">100+</h3>
              <p className="mt-2 text-gray-600">Games Booked</p>
            </div>
          </div>
          <div className="about-us-story">
            <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-6">
              Our Journey
            </h2>
            <p className="text-lg text-gray-600 mb-4">
              <b>
                BookMyTurf was founded to address the challenges faced by sports
                enthusiasts in finding and booking turfs efficiently. We
                experienced the frustration of navigating through complex
                booking processes and managing multiple bookings across
                different venues.
              </b>
            </p>
            <p className="text-lg text-gray-600 mb-4">
              <b>
                Our journey led us to create a platform where turf booking is
                simplified, fast, and enjoyable. BookMyTurf is designed to
                empower sports enthusiasts to focus on their game while we take
                care of the booking logistics.
              </b>
            </p>
            <p className="text-lg text-gray-600">
              <b>
                Today, BookMyTurf stands as a trusted name in turf booking,
                offering a user-friendly interface and a wide network of turf
                partners. Join us in revolutionizing how sports enthusiasts book
                and enjoy their turf experiences with just a click!
              </b>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AboutUs;
