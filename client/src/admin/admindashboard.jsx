import React, { useState, useEffect } from "react";
import "tailwindcss/tailwind.css";
import Navbar from "../Navbar";
import Overview from "./Overview";
import Users from "./Users";
import Revenue from "./Revenue";
import Bookings from "./Bookings";

const AdminDashboard = () => {
  const [selectedSection, setSelectedSection] = useState("overview");
  const [turfData, setTurfData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3001/admin/turfs");
        const result = await response.json();
        console.log(result);

        // Set the fetched data directly to the state
        setTurfData(result);
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
        <nav
          className="w-64 bg-gray-900 p-4"
          aria-label="Admin Dashboard Navigation"
        >
          <ul role="menu">
            <li className="mb-4" role="none">
              <a
                href="#overview"
                className="text-gray-300 hover:text-white"
                onClick={() => setSelectedSection("overview")}
                role="menuitem"
                tabIndex="0"
              >
                Overview
              </a>
            </li>
            <li className="mb-4" role="none">
              <a
                href="#users"
                className="text-gray-300 hover:text-white"
                onClick={() => setSelectedSection("users")}
                role="menuitem"
                tabIndex="0"
              >
                Users
              </a>
            </li>
            <li className="mb-4" role="none">
              <a
                href="#revenue"
                className="text-gray-300 hover:text-white"
                onClick={() => setSelectedSection("revenue")}
                role="menuitem"
                tabIndex="0"
              >
                Revenue
              </a>
            </li>
            <li className="mb-4" role="none">
              <a
                href="#Bookings"
                className="text-gray-300 hover:text-white"
                onClick={() => setSelectedSection("Bookings")}
                role="menuitem"
                tabIndex="0"
              >
                Bookings
              </a>
            </li>
          </ul>
        </nav>
        <main className="flex-1 p-4">
          {selectedSection === "overview" && (
            <Overview
              data={turfData}
              columns={[
                { Header: "Turf Name", accessor: "name" },
                { Header: "Price", accessor: "price" },
                { Header: "Area", accessor: "area" },
                { Header: "Dimension", accessor: "Dimension" },
                {
                  Header: "Cricket",
                  accessor: "cricket",
                  Cell: ({ value }) => (value ? "Yes" : "No"),
                },
                {
                  Header: "Football",
                  accessor: "football",
                  Cell: ({ value }) => (value ? "Yes" : "No"),
                },
                {
                  Header: "Badminton",
                  accessor: "badminton",
                  Cell: ({ value }) => (value ? "Yes" : "No"),
                },
                {
                  Header: "Swimming",
                  accessor: "SWIMMING",
                  Cell: ({ value }) => (value ? "Yes" : "No"),
                },
                {
                  Header: "Multisports",
                  accessor: "MULTISPORTS",
                  Cell: ({ value }) => (value ? "Yes" : "No"),
                },
                // { Header: "Detailed Info", accessor: "detailed_info" },
                // { Header: "Image URL", accessor: "imageURL" },
                // { Header: "Created At", accessor: "created_at" },
              ]}
            />
          )}
          {selectedSection === "users" && <Users />}
          {selectedSection === "revenue" && <Revenue />}
          {selectedSection === "Bookings" && <Bookings />}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
