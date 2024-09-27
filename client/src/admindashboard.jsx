import React, { useState } from "react"; // Import useState
import "tailwindcss/tailwind.css"; // Ensure Tailwind CSS is imported
import { useTable } from "react-table";
import Navbar from "./Navbar";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const AdminDashboard = () => {
  const [selectedSection, setSelectedSection] = useState("overview"); // State for selected section

  // Sample data for the table
  const data = React.useMemo(
    () => [
      { col1: "Row 1", col2: "Data 1" },
      { col1: "Row 2", col2: "Data 2" },
      { col1: "Row 3", col2: "Data 3" },
    ],
    []
  );

  // Sample data for the chart
  const chartData = [
    { name: "Jan", uv: 4000, pv: 2400, amt: 2400 },
    { name: "Feb", uv: 3000, pv: 1398, amt: 2210 },
    { name: "Mar", uv: 2000, pv: 9800, amt: 2290 },
    { name: "Apr", uv: 2780, pv: 3908, amt: 2000 },
    { name: "May", uv: 1890, pv: 4800, amt: 2181 },
    { name: "Jun", uv: 2390, pv: 3800, amt: 2500 },
    { name: "Jul", uv: 3490, pv: 4300, amt: 2100 },
  ];

  // Define columns for the table
  const columns = React.useMemo(
    () => [
      {
        Header: "Column 1",
        accessor: "col1", // accessor is the "key" in the data
      },
      {
        Header: "Column 2",
        accessor: "col2",
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

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
                onClick={() => setSelectedSection("overview")} // Update state on click
              >
                Overview
              </a>
            </li>
            <li className="mb-4">
              <a
                href="#users"
                className="text-gray-300 hover:text-white"
                onClick={() => setSelectedSection("users")} // Update state on click
              >
                Users
              </a>
            </li>
            <li className="mb-4">
              <a
                href="#settings"
                className="text-gray-300 hover:text-white"
                onClick={() => setSelectedSection("revenue")} // Update state on click
              >
                Revenue
              </a>
            </li>
          </ul>
        </nav>
        <main className="flex-1 p-4">
          <section id="overview" className="mb-8">
            <h2 className="text-xl font-bold mb-2">Overview</h2>
            <p>Welcome to the admin dashboard.</p>
            {selectedSection === "overview" && ( // Conditionally render the data table
              <section id="data-table" className="mb-8">
                <h2 className="text-xl font-bold mb-2">Data Table</h2>
                <table
                  {...getTableProps()}
                  className="min-w-full bg-gray-800 text-white"
                >
                  <thead>
                    {headerGroups.map((headerGroup) => (
                      <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map((column) => (
                          <th
                            {...column.getHeaderProps()}
                            className="px-4 py-2 border-b border-gray-700 bg-gray-900 text-left text-sm leading-4 font-medium text-gray-300 uppercase tracking-wider"
                          >
                            {column.render("Header")}
                          </th>
                        ))}
                      </tr>
                    ))}
                  </thead>
                  <tbody {...getTableBodyProps()}>
                    {rows.map((row) => {
                      prepareRow(row);
                      return (
                        <tr {...row.getRowProps()}>
                          {row.cells.map((cell) => (
                            <td
                              {...cell.getCellProps()}
                              className="px-4 py-2 border-b border-gray-700 text-sm"
                            >
                              {cell.render("Cell")}
                            </td>
                          ))}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </section>
            )}
          </section>
          <section
            id="users"
            className="mb-8"
            style={{ display: selectedSection === "users" ? "block" : "none" }}
          >
            <h2 className="text-xl font-bold mb-2">Users</h2>
            <p>Manage your users here.</p>
          </section>
          <section
            id="settings"
            className="mb-8"
            style={{
              display: selectedSection === "revenue" ? "block" : "none",
            }}
          >
            <h2 className="text-xl font-bold mb-2">Revenue</h2>
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" stroke="#ffffff" />
                <YAxis stroke="#ffffff" />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="pv" stroke="#8884d8" />
                <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
              </LineChart>
            </ResponsiveContainer>
          </section>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
