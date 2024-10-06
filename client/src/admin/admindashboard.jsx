// AdminDashboard.jsx
import React, { useState, useEffect } from "react";
import "tailwindcss/tailwind.css";
import Navbar from "../Navbar";
import Overview from "./Overview";
import Users from "./Users";
import Revenue from "./Revenue";
import Bookings from "./Bookings";

const AdminDashboard = () => {
  const [selectedSection, setSelectedSection] = useState("overview");
  const [data, setData] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [columns, setColumns] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3001/admin/bookings");
        const result = await response.json();

        // Process data for Overview and Revenue components
        const processedData = result.map((booking) => ({
          col1: booking.turf_name,
          col2: booking.turf_price,
        }));

        const processedChartData = result.map((booking) => ({
          name: booking.turf_name,
          revenue: booking.turf_price,
        }));

        setData(processedData);
        setChartData(processedChartData);
        setColumns([
          {
            Header: "Turf Name",
            accessor: "col1",
          },
          {
            Header: "Price",
            accessor: "col2",
          },
        ]);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      <Navbar />
      <header className="bg-gray-800 text-white p-4"></header>
      <h1 className="bg-gray-800 text-2xl pt-2 pl-5">Admin Dashboard</h1>
      <div className="flex flex-1">
        <nav className="w-64 bg-gray-900 p-4">
          <ul>
            <li className="mb-4">
              <a
                href="#overview"
                className="text-gray-300 hover:text-white"
                onClick={() => setSelectedSection("overview")}
              >
                Overview
              </a>
            </li>
            <li className="mb-4">
              <a
                href="#users"
                className="text-gray-300 hover:text-white"
                onClick={() => setSelectedSection("users")}
              >
                Users
              </a>
            </li>
            <li className="mb-4">
              <a
                href="#revenue"
                className="text-gray-300 hover:text-white"
                onClick={() => setSelectedSection("revenue")}
              >
                Revenue
              </a>
            </li>
            <li className="mb-4">
              <a
                href="#Bookings"
                className="text-gray-300 hover:text-white"
                onClick={() => setSelectedSection("Bookings")}
              >
                Bookings
              </a>
            </li>
          </ul>
        </nav>
        <main className="flex-1 p-4">
          {selectedSection === "overview" && (
            <Overview data={data} columns={columns} />
          )}
          {selectedSection === "users" && <Users />}
          {selectedSection === "revenue" && <Revenue chartData={chartData} />}
          {selectedSection === "Bookings" && <Bookings />}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
