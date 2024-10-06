import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css'; // Assuming you have a CSS file for App styling
import HomePage from './HomePage'; // Import the HomePage component
import BookingPage from './BookingPage'; // Import the BookingPage component
import Contact from './Contact';
import Aboutus from './Aboutus';
import ProfilePage from './ProfilePage';
import Login from './Login'
import Register from'./Register'
import AddTurf from './AddTurf';
import Bookings from './Bookings'; 
import Demo from './Demo';
import Calender from './Calender';
import Addmoney from './Addmoney.jsx';
import ViewBookings from './view-bookings';
import AddEvent from './AddEvent';
import ShowEvents from "./ShowEvents";
import Dashboard from './admin/admindashboard';

import Adminregisteration from "./adminregistration";
import { ToastContainer } from "react-toastify";
// import "antd/dist/antd.css"; 
import BookingWindow from './bookingWindow'; // Correct the import statement

// import axios from 'axios'


const App = () => {

     
    const [data , setData] = useState([])
    useEffect(() => {
        fetch('http://localhost:3001/input')
        .then(res => res.json())
        .then(data => console.log(data))
        .catch(err => console.log(err));
    } , [])
   

    return (
      <BrowserRouter>
        <ToastContainer position="top-center" />
        <Routes>
          <Route path="/home" element={<HomePage />} />
          <Route path="/bookingwindow" element={<BookingWindow />} />
          <Route path="/bookingpage" element={<BookingPage />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<Aboutus />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/addturf" element={<AddTurf />} />
          <Route path="/AddEvent" element={<AddEvent />} />
          <Route path="/bookings" element={<Bookings />} />
          <Route path="/demo" element={<Demo />} />
          <Route path="/ShowEvents" element={<ShowEvents />} />
          <Route path="/Calendar" element={<Calender />} />
          <Route path="/Addmoney" element={<Addmoney />} />
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/view-bookings" element={<ViewBookings />} />
          <Route path="/register_admin" element={<Adminregisteration />} />
        </Routes>
      </BrowserRouter>
    );
};

export default App;
