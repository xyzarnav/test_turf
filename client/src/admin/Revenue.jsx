// Revenue.jsx
import React, { useEffect, useState } from "react";
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
import { format, parseISO } from "date-fns";

const Revenue = () => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3001/admin/bookings");
        const data = await response.json();

        // Process data to fit the chart format
        const processedData = data.map((booking) => ({
          date: booking.date,
          month: format(parseISO(booking.date), "MMM yyyy"), // Format the date to show month and year
          revenue: booking.turf_price,
        }));

        // Sort data by date in ascending order
        processedData.sort((a, b) => new Date(a.date) - new Date(b.date));

        setChartData(processedData);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <section id="revenue" className="mb-8">
      <h2 className="text-xl font-bold mb-2">Revenue</h2>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" stroke="#ffffff" />
          <YAxis stroke="#ffffff" />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="revenue" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
    </section>
  );
};

export default Revenue;
