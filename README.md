# Turf Booking Application

## Overview
This project is a **Turf Booking System** that allows users to browse available sports turfs, check the availability of time slots, and book a turf for various sports. The app handles booking, payment proof submission, and displays available time slots dynamically. It's built with **React**, **Node.js**, **Express**, and **MySQL**.

## Features
- View a list of available turfs with detailed information.
- Filter the turfs according to area . 
- Sort the turfs according to price . 
- Check availability for specific time slots.
- Book turfs for sports like Cricket, Football, and Badminton.
- Upload payment proof as part of the booking process.
- Dynamic availability status (booked slots marked in red).

## Technologies Used
- **Frontend**: React, Ant Design (for DatePicker and Card components)
- **Backend**: Node.js, Express.js
- **Database**: MySQL
- **Axios**: For API requests
- **Moment.js**: For handling dates

## How to Run the Project

To get started with this project, follow these steps:

1. **Clone the Repository**
   - Use the following command to clone the repository to your local machine:
     ```bash
     git clone <repository-url>
     ```

2. **Install Dependencies**
   - Navigate to the frontend (client) directory and install the required dependencies:
     ```bash
     cd client
     npm install
     ```
   - Next, navigate to the backend (server) directory and install the required dependencies:
     ```bash
     cd ../server
     npm install
     ```

3. **Set Up the MySQL Database**
   - Ensure you have XAMPP installed and running.
   - Open phpMyAdmin in your browser (usually at `http://localhost/phpmyadmin`).
   - Import the provided database file to create the necessary database structure. This can typically be done by:
     - Clicking on the "Import" tab in phpMyAdmin.
     - Selecting the database file and clicking "Go."

4. **Run the Server and Client**
   - Start the backend server first. Navigate to the server directory if you haven't already:
     ```bash
     cd server
     npm start
     ```
   - Once the server is running, open a new terminal window, navigate back to the client directory, and start the frontend:
     ```bash
     cd ../client
     npm start
     ```

Now your project should be up and running! Open your browser and navigate to `http://localhost:3000` (or the port specified for your client) to see the application in action.


## Project Images 
- Login Page 
![image](https://github.com/user-attachments/assets/8d1becf5-efbd-442f-a475-f7e753374935)
- Home Page
  ![image](https://github.com/user-attachments/assets/93da5871-4ed4-4c12-a010-2cd9890ef3f4)
- Booking Page
  ![image](https://github.com/user-attachments/assets/7771ec03-46be-4125-887c-6dcf817dcac3)


