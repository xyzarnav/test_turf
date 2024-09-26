const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const multer = require("multer");
const upload = multer({ dest: "uploads/" }); // Define upload middleware with destination folder

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "turfbooking",
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err);
    return;
  }
  console.log("Connected to the database.");
});

app.get("/", (req, res) => {
  return res.json("From Backend Side - Prasad");
});

// Fetch user profile
app.get("/user/:userId", (req, res) => {
  const userId = req.params.userId;
  const sql =
    "SELECT FullName, Email, DateOfBirth, Gender FROM userprofile WHERE UserID = ?";

  db.query(sql, [userId], (err, result) => {
    if (err) {
      console.error("Error fetching user profile:", err);
      return res.status(500).json({ error: "Failed to fetch user profile" });
    }
    if (result.length === 0) {
      return res.status(404).json({ error: "User not foun" });
    }
    return res.status(200).json(result[0]);
  });
});

// Add turf
app.post("/addTurf", (req, res) => {
  const turfData = req.body;
  const sql = "INSERT INTO turfs SET ?";
  db.query(sql, turfData, (err, result) => {
    if (err) {
      console.error("Error adding turf:", err);
      return res.status(500).json({ error: "Failed to add turf" });
    }
    console.log("Turf added successfully");
    return res.status(200).json({ message: "Turf added successfully" });
  });
});

// Login endpoint
app.post("/login", (req, res) => {
  const { email, password } = req.body;
  const sql = "SELECT * FROM userprofile WHERE Email = ? AND Password = ?";
  db.query(sql, [email, password], (err, result) => {
    if (err) {
      console.error("Error logging in:", err);
      return res.status(500).json({ error: "Internal server error" });
    }
    if (result.length === 0) {
      return res.status(401).json({ error: "Invalid email or password" });
    }
    return res
      .status(200)
      .json({ message: "Login successful", user: result[0] });
  });
});

// Registration endpoint
app.post("/register", (req, res) => {
  const { name, email, password, dateOfBirth, gender } = req.body;
  const sql =
    "INSERT INTO userprofile (FullName, Email, Password, DateOfBirth, Gender) VALUES (?, ?, ?, ?, ?)";
  const values = [name, email, password, dateOfBirth, gender];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("Error registering user:", err);
      return res.status(500).json({ error: "Failed to register user" });
    }
    console.log("User registered successfully");
    return res.status(200).json({ message: "User registered successfully" });
  });
});

// Get turf by ID
app.get("/turfs/:id", (req, res) => {
  const turfId = req.params.id;
  const sql = `SELECT * FROM turfs WHERE id = ?`;
  db.query(sql, [turfId], (err, result) => {
    if (err) {
      console.error("Error fetching turf:", err);
      return res.status(500).json({ error: "Error fetching turf" });
    } else {
      if (result.length > 0) {
        return res.status(200).json(result[0]);
      } else {
        return res.status(404).json({ error: "Turf not found" });
      }
    }
  });
});

app.post("/bookings", upload.single("paymentProof"), (req, res) => {
  const {
    name,
    email,
    date,
    time_slot,
    numberOfPeople,
    turfId,
    method_of_booking,
  } = req.body;
  const paymentProof = req.file ? req.file.filename : null;

  const sql =
    "INSERT INTO bookings (name, email, date, time_slot, paymentProof, numberOfPeople, turf_id, method_of_booking) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
  const values = [
    name,
    email,
    date,
    time_slot,
    paymentProof,
    numberOfPeople,
    turfId,
    method_of_booking,
  ];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("Error adding booking:", err);
      return res.status(500).json({ error: "Failed to add booking" });
    }
    console.log("Booking added successfully");
    return res.status(200).json({ message: "Booking added successfully" });
  });
});

app.get("/turfs/:turfId", (req, res) => {
  const turfId = req.params.turfId;
  const sql = "SELECT * FROM turfs WHERE id = ?";
  db.query(sql, [turfId], (err, result) => {
    if (err) {
      console.error("Error fetching turf:", err);
      return res.status(500).json({ error: "Failed to fetch turf" });
    }
    res.json(result[0]);
  });
});

app.get("/turfs/:turfId/availability", (req, res) => {
  const turfId = req.params.turfId;
  const date = req.query.date;
  const sql = "SELECT time_slot FROM bookings WHERE turf_id = ? AND date = ?";
  db.query(sql, [turfId, date], (err, result) => {
    if (err) {
      console.error("Error fetching availability:", err);
      return res.status(500).json({ error: "Failed to fetch availability" });
    }
    const bookedSlots = result.map((row) => row.time_slot);
    res.json(bookedSlots);
  });
});

// Fetch bookings for a user by email
app.get("/bookings/:email", (req, res) => {
  const email = req.params.email;
  const sql = `
        SELECT b.*, t.name as turfName, t.price
        FROM bookings b
        JOIN turfs t ON b.turf_id = t.id
        WHERE b.email = ?
    `;

  db.query(sql, [email], (err, result) => {
    if (err) {
      console.error("Error fetching bookings:", err);
      return res.status(500).json({ error: "Failed to fetch bookings" });
    }
    return res.status(200).json(result);
  });
});

// Fetch all turfs with sorting and filtering by area
app.get("/turfs", (req, res) => {
  const { priceOrder, area } = req.query;
  let sql = "SELECT id, name, price, area, imageUrl FROM turfs"; // Include imageUrl in the select query
  let params = [];

  if (area) {
    sql += " WHERE area = ?";
    params.push(area);
  }

  if (priceOrder) {
    if (priceOrder === "lowToHigh") {
      sql += " ORDER BY price ASC";
    } else if (priceOrder === "highToLow") {
      sql += " ORDER BY price DESC";
    }
  }

  db.query(sql, params, (err, result) => {
    if (err) {
      console.error("Error fetching turfs:", err);
      return res.status(500).json({ error: "Failed to fetch turfs" });
    }
    return res.status(200).json(result);
  });
});
// Fetch bookings for a specific user on a specific date
app.get("/bookings/:email/:date", (req, res) => {
  const { email, date } = req.params;
  const sql = `
        SELECT b.*, t.name AS turfName
        FROM bookings b
        JOIN turfs t ON b.turf_id = t.id
        WHERE b.email = ? AND b.date = ?
    `;

  db.query(sql, [email, date], (err, result) => {
    if (err) {
      console.error("Error fetching bookings:", err);
      return res.status(500).json({ error: "Failed to fetch bookings" });
    }
    return res.status(200).json(result);
  });
});

// Fetch distinct areas
app.get("/areas", (req, res) => {
  const sql = "SELECT DISTINCT area FROM turfs";

  db.query(sql, (err, result) => {
    if (err) {
      console.error("Error fetching areas:", err);
      return res.status(500).json({ error: "Failed to fetch areas" });
    }
    const areas = result.map((row) => row.area);
    return res.status(200).json(areas);
  });
});

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});

// Export the db object
module.exports = { db };
