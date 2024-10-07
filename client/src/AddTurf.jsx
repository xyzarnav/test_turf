import React, { useState } from "react";
import axios from "axios";
import "./AppTurf.css";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { toast } from "react-toastify";

const AddTurf = () => {
  const [turfData, setTurfData] = useState({
    imageURL: "",
    name: "",
    price: "",
    cricket: false,
    football: false,
    badminton: false,
    area: "",
    detailed_info: "",
    Dimension:"",
  });

  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;
    setTurfData((prevState) => ({ ...prevState, [name]: newValue }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await axios.post(
        "http://localhost:3001/addTurf",
        turfData
      );
      toast.success("Turf added successfully:", response.data);

      setTurfData({
        imageURL: "",
        name: "",
        price: "",
        cricket: false,
        football: false,
        badminton: false,
        area: "",
        detailed_info: "",
        Dimension: "",
      });
    } catch (error) {
      console.error("Error adding turf:", error);
      setError("Failed to add turf. Please try again.");
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <div className="navmistake"></div>
      <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
        <h2 className="text-2xl font-bold mb-6 text-center">Add Turf</h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="imageURL"
              className="block text-sm font-medium text-gray-700"
            >
              Image URL:
            </label>
            <input
              type="text"
              id="imageURL"
              name="imageURL"
              value={turfData.imageURL}
              onChange={handleChange}
              required
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={turfData.name}
              onChange={handleChange}
              required
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label
              htmlFor="price"
              className="block text-sm font-medium text-gray-700"
            >
              Price:
            </label>
            <input
              type="text"
              id="price"
              name="price"
              value={turfData.price}
              onChange={handleChange}
              required
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="checkbox-group">
            <label className="block text-sm font-medium text-gray-700">
              Sports:
            </label>
            <div className="flex items-center space-x-4 mt-1">
              <div>
                <input
                  type="checkbox"
                  id="cricket"
                  name="cricket"
                  checked={turfData.cricket}
                  onChange={handleChange}
                  className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label htmlFor="cricket" className="ml-2 text-sm text-gray-700">
                  Cricket
                </label>
              </div>
              <div>
                <input
                  type="checkbox"
                  id="football"
                  name="football"
                  checked={turfData.football}
                  onChange={handleChange}
                  className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label
                  htmlFor="football"
                  className="ml-2 text-sm text-gray-700"
                >
                  Football
                </label>
              </div>
              <div>
                <input
                  type="checkbox"
                  id="badminton"
                  name="badminton"
                  checked={turfData.badminton}
                  onChange={handleChange}
                  className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label
                  htmlFor="badminton"
                  className="ml-2 text-sm text-gray-700"
                >
                  Badminton
                </label>
              </div>
            </div>
          </div>

          <div>
            <label
              htmlFor="area"
              className="block text-sm font-medium text-gray-700"
            >
              Place:
            </label>
            <input
              type="text"
              id="area"
              name="area"
              value={turfData.area}
              onChange={handleChange}
              required
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label
              htmlFor="Dimension"
              className="block text-sm font-medium text-gray-700"
            >
              Dimension9(sq-meters)
            </label>
            <input
              type="text"
              id="Dimension"
              name="Dimension"
              value={turfData.Dimension}
              onChange={handleChange}
              required
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label
              htmlFor="detailed_info"
              className="block text-sm font-medium text-gray-700"
            >
              Detailed Info:
            </label>
            <textarea
              id="detailed_info"
              name="detailed_info"
              value={turfData.detailed_info}
              onChange={handleChange}
              required
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Add Turf
          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default AddTurf;
