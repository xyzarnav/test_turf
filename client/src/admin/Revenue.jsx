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
  const [bookingData, setBookingData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3001/admin/bookings");
        const data = await response.json();

        // Step 1: Process data to fit the chart format
        const monthlyRevenue = {};
        const monthlyBookings = {};

        data.forEach((booking) => {
          if (booking.date && booking.turf_price) {
            const monthYear = format(parseISO(booking.date), "MMM yyyy"); // e.g., "Sep 2024"
            const revenue = Number(booking.turf_price) || 0;

            // Step 2: Aggregate revenue and bookings for each month
            if (monthlyRevenue[monthYear]) {
              monthlyRevenue[monthYear] += revenue; // Add to existing month
              monthlyBookings[monthYear] += 1; // Increment booking count
            } else {
              monthlyRevenue[monthYear] = revenue; // Initialize new month
              monthlyBookings[monthYear] = 1; // Initialize booking count
            }
          }
        });

        // Step 3: Convert the aggregated data into arrays suitable for Recharts
        const processedRevenueData = Object.keys(monthlyRevenue).map(
          (monthYear) => ({
            monthYear,
            revenue: monthlyRevenue[monthYear],
          })
        );

        const processedBookingData = Object.keys(monthlyBookings).map(
          (monthYear) => ({
            monthYear,
            bookings: monthlyBookings[monthYear],
          })
        );

        // Sort data by date in ascending order (if necessary)
        processedRevenueData.sort(
          (a, b) => new Date(a.monthYear) - new Date(b.monthYear)
        );

        processedBookingData.sort(
          (a, b) => new Date(a.monthYear) - new Date(b.monthYear)
        );

        setChartData(processedRevenueData);
        setBookingData(processedBookingData);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <section id="revenue" className="mb-8">
      <h2 className="text-xl font-bold mb-2">Monthly Revenue</h2>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="monthYear" stroke="#ffffff" />
          <YAxis stroke="#ffffff" />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="revenue" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>

      <h2 className="text-xl font-bold mb-2">Monthly Bookings</h2>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={bookingData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="monthYear" stroke="#ffffff" />
          <YAxis stroke="#ffffff" />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="bookings" stroke="#82ca9d" />
        </LineChart>
      </ResponsiveContainer>
    </section>
  );
};

export default Revenue;
