// AdminDashboard.jsx
import React, { useState } from "react";
import "tailwindcss/tailwind.css";
import Navbar from "../Navbar";
import Overview from "./Overview";
import Users from "./Users";
import Revenue from "./Revenue";

const AdminDashboard = () => {
  const [selectedSection, setSelectedSection] = useState("overview");

  const data = React.useMemo(
    () => [
      { col1: "Row 1", col2: "Data 1" },
      { col1: "Row 2", col2: "Data 2" },
      { col1: "Row 3", col2: "Data 3" },
    ],
    []
  );

  const chartData = [
    { name: "Jan", uv: 4000, pv: 2400, amt: 2400 },
    { name: "Feb", uv: 3000, pv: 1398, amt: 2210 },
    { name: "Mar", uv: 2000, pv: 9800, amt: 2290 },
    { name: "Apr", uv: 2780, pv: 3908, amt: 2000 },
    { name: "May", uv: 1890, pv: 4800, amt: 2181 },
    { name: "Jun", uv: 2390, pv: 3800, amt: 2500 },
    { name: "Jul", uv: 3490, pv: 4300, amt: 2100 },
  ];

  const columns = React.useMemo(
    () => [
      {
        Header: "Column 1",
        accessor: "col1",
      },
      {
        Header: "Column 2",
        accessor: "col2",
      },
    ],
    []
  );

  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      <Navbar />
      <header className="bg-gray-800 text-white p-4 text-center">
        <h1 className="text-2xl">Admin Dashboard</h1>
      </header>
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
          </ul>
        </nav>
        <main className="flex-1 p-4">
          {selectedSection === "overview" && (
            <Overview data={data} columns={columns} />
          )}
          {selectedSection === "users" && <Users />}
          {selectedSection === "revenue" && <Revenue chartData={chartData} />}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;