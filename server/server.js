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

    // Retrieve the insertId, which is the UserID of the newly registered user
    const user_id = result.insertId;

    console.log("User registered successfully with ID:", user_id);
    return res.status(200).json({
      message: "User registered successfully",
      user_id: user_id, // Return the UserID to the frontend
    });
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
        return res.status(404).json({ error: "Turf not found." });
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



const stripe = require("stripe")(
  "sk_test_51Q3JV201cMS3vICJu3SgShx91j1BASqCarunkfHZrDqLoXYie5ffG9fkFwJnTUoxixQDIgc9v2J3hQv8ingae1FK00TOU7X0Vk"
);



app.post("/create-payment-intent", async (req, res) => {
  const { amount } = req.body; // amount in rupees

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, // Stripe uses smallest currency unit (paise)
      currency: "inr",
      automatic_payment_methods: {
        enabled: true,
      },
    });

    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});


app.post("/update-wallet", (req, res) => {
  const { user_id, amount } = req.body;

  console.log("Received update-wallet request:", { user_id, amount });

  // Query to check if the wallet exists for the user
  const checkWalletQuery = "SELECT balance FROM wallet WHERE user_id = ?";

  db.query(checkWalletQuery, [user_id], (err, result) => {
    if (err) {
      console.error("Error fetching wallet:", err);
      return res.status(500).json({ error: "Error fetching wallet" });
    }
 
    if (result.length > 0) {
      // Wallet exists, update balance
      const newBalance = parseFloat(result[0].balance) + parseFloat(amount);
      const updateQuery = "UPDATE wallet SET balance = ? WHERE user_id = ?";

      console.log("Updating wallet balance:", { newBalance, user_id });

      db.query(updateQuery, [newBalance, user_id], (err, updateResult) => {
        if (err) {
          console.error("Error updating wallet:", err);
          return res.status(500).json({ error: "Error updating wallet" });
        }
        console.log("Wallet updated successfully");
        return res
          .status(200)
          .json({
            message: "Wallet updated successfully",
            balance: newBalance,
          });
      });
    } else {
      // Wallet doesn't exist, insert new record
      const insertQuery = "INSERT INTO wallet (user_id, balance) VALUES (?, ?)";

      console.log("Inserting new wallet for user:", { user_id, amount });

      db.query(insertQuery, [user_id, amount], (err, insertResult) => {
        if (err) {
          console.error("Error inserting wallet:", err);
          return res.status(500).json({ error: "Error inserting wallet" });
        }
        console.log("Wallet created and updated successfully");
        return res
          .status(200)
          .json({
            message: "Wallet created and updated successfully",
            balance: amount,
          });
      });
    }
  });
});




  


// Export the db object
module.exports = { db };
