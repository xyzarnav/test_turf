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
  console.log("Connected to the database .");
});

app.get("/", (req, res) => {
  return res.json("From Backend Side - Prasad");
});

// Fetch user profile
// Fetch bookings for a specific user
// Fetch bookings for a specific user
app.get("/bookings/:userId", (req, res) => {
    const userId = req.params.userId;

    const sql = `
        SELECT bookings.*, turfs.name 
        FROM bookings 
        JOIN turfs ON bookings.turf_id = turfs.id 
        WHERE bookings.user_id = ?`; // Assuming user_id is available in bookings

    db.query(sql, [userId], (err, result) => {
        if (err) {
            console.error("Error fetching bookings:", err);
            return res.status(500).json({ error: "Failed to fetch bookings" });
        }
        if (result.length === 0) {
            return res.status(404).json({ error: "No bookings found" });
        }
        return res.status(200).json(result);
    });
});
app.get("/wallet/:userId", (req, res) => {
  const userId = req.params.userId;

  const sql = "SELECT balance FROM wallet WHERE id = ?";

  // Ensure the database connection is correctly configured
  db.query(sql, [userId], (err, result) => {
    if (err) {
      console.error("Error fetching wallet balance:", err);
      return res.status(500).json({ error: "Failed to fetch wallet balance" });
    }
    if (result.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    // Log the result for debugging
    console.log("Wallet balance fetched successfully:---", result);

    // Return the balance in the response
    return res.status(200).json({ wallet_balance: result[0].balance });
  });
});


db.getUserById = (userId, callback) => {
  const query = "SELECT * FROM userprofile WHERE UserID = ?";
  db.query(query, [userId], (err, results) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, results[0]);
  });
};

// Route to get user by ID
app.get("/user/:id", (req, res) => {
  const userId = req.params.id;
  db.getUserById(userId, (err, user) => {
    if (err) {
      return res.status(500).json({ error: "Failed to retrieve user" });
    }
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user);
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
// Login endpoint
app.post("/login", (req, res) => {
  const { email, password } = req.body;
  const sql = "SELECT * FROM userprofile WHERE Email = ?";

  db.query(sql, [email], async (err, result) => {
    if (err) {
      console.error("Error logging in:", err);
      return res.status(500).json({ error: "Internal server error" });
    }
    if (result.length === 0) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const user = result[0];
    const validPassword = await bcrypt.compare(password, user.Password);

    if (!validPassword) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    return res.status(200).json({ message: "Login successful", user });
  });
});

const bcrypt = require("bcrypt");

app.post("/register", async (req, res) => {
  const { name, email, password, dateOfBirth, gender, contact } = req.body;

  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    const sql =
      "INSERT INTO userprofile (FullName, Email, Password, DateOfBirth, Gender,Contact) VALUES (?, ?, ?, ?, ?, ?)";
    const values = [name, email, hashedPassword, dateOfBirth, gender, contact];

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
  } catch (err) {
    console.error("Error hashing password:", err);
    return res.status(500).json({ error: "Failed to register user" });
  }
});
//

// Admin Signup Endpoint
app.post("/admin/signup", async (req, res) => {
  const { FullName, Email, Password, Role } = req.body;

  // Check if the admin already exists
  const sqlCheck = "SELECT * FROM admin WHERE Email = ?";
  db.query(sqlCheck, [Email], async (err, result) => {
    if (err) {
      console.error("Error checking admin:", err);
      return res.status(500).json({ error: "Internal server error" });
    }
    if (result.length > 0) {
      return res.status(400).json({ error: "Admin already exists" });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(Password, 10);

    const sql =
      "INSERT INTO admin (FullName, Email, Password, Role) VALUES (?, ?, ?, ?)";
    db.query(sql, [FullName, Email, hashedPassword, Role], (err, result) => {
      if (err) {
        console.error("Error registering admin:", err);
        return res.status(500).json({ error: "Failed to register admin" });
      }
      console.log("Admin registered successfully");
      return res.status(200).json({ message: "Admin registered successfully" });
    });
  });
});

// Admin Login Endpoint
// Admin Login Endpoint
app.post("/admin/login", (req, res) => {
  const { Email, Password } = req.body; // Ensure these keys match exactly

  console.log("Admin login attempt:", { Email, Password }); // For debugging

  const sql = "SELECT * FROM admin WHERE Email = ?"; // SQL query to check email

  db.query(sql, [Email], async (err, result) => {
    if (err) {
      console.error("Error logging in:", err);
      return res.status(500).json({ error: "Internal server error" });
    }
    if (result.length === 0) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const admin = result[0];
    const validPassword = await bcrypt.compare(Password, admin.Password);

    if (!validPassword) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    return res.status(200).json({ message: "Admin login successful", admin });
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
    date,
    time_slot,
    numberOfPeople,
    turfId,
    method_of_booking,
    player_finder,
    contact,
    user_id, // Add user_id to the destructured request body
  } = req.body;
  const paymentProof = req.file ? req.file.filename : null;

  // Update the SQL query to include user_id
  const sql =
    "INSERT INTO bookings (name, date, time_slot, paymentProof, numberOfPeople, turf_id, method_of_booking, player_finder, contact, user_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
  const values = [
    name,
    date,
    time_slot,
    paymentProof,
    numberOfPeople,
    turfId,
    method_of_booking,
    player_finder,
    contact,
    user_id, // Include user_id in the values array
  ];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("Error adding booking:", err);
      return res.status(500).json({ error: "Failed to add booking" });
    }
    console.log("Booking added successfully:", result);
    return res.status(200).json({ message: "Booking added successfully" });
  });
});
app.post("/deduct-balance", (req, res) => {
  const { userId, amount } = req.body;

  const getBalanceSql = "SELECT balance FROM wallet WHERE id = ?";
  db.query(getBalanceSql, [userId], (err, result) => {
    if (err) {
      console.error("Error fetching wallet balance:", err);
      return res.status(500).json({ error: "Failed to fetch wallet balance" });
    }
    if (result.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    const currentBalance = result[0].balance;
    const newBalance = currentBalance - amount;

    const updateBalanceSql = "UPDATE wallet SET balance = ? WHERE id = ?";
    db.query(updateBalanceSql, [newBalance, userId], (err, updateResult) => {
      if (err) {
        console.error("Error updating wallet balance:", err);
        return res
          .status(500)
          .json({ error: "Failed to update wallet balance" });
      }
      console.log("Balance deducted successfully:", updateResult);
      res
        .status(200)
        .json({ message: "Balance deducted successfully", newBalance });
    });
  });
});
// server.js
app.post('/deduct-wallet', (req, res) => {
    const { userId, newBalance } = req.body;

    const sql = 'UPDATE users SET wallet_balance = ? WHERE id = ?';

    db.query(sql, [newBalance, userId], (err, result) => {
        if (err) {
            console.error('Error updating wallet balance:', err);
            return res.status(500).json({ error: 'Failed to update wallet balance' });
        }
        return res.status(200).json({ message: 'Wallet balance updated successfully' });
    });
});

app.get("/admin/bookings", (req, res) => {
  const sql = `
    SELECT bookings.*, turfs.name AS turf_name,turfs.price AS turf_price
    FROM bookings
    JOIN turfs ON bookings.turf_id = turfs.id
    ORDER BY bookings.created_at DESC
  `;

  db.query(sql, (err, results) => {
    if (err) {
      console.error("Error fetching bookings:", err);
      return res.status(500).json({ error: "Failed to fetch bookings" });
    }
    return res.status(200).json(results); // Return all bookings
  });
});

app.get("/admin/turfs", (req, res) => {
  const query = "SELECT * FROM turfs";
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching data:", err);
      res.status(500).send("Error fetching data");
      return;
    }
    res.json(results);
  });
});

app.get("/users", (req, res) => {
  const sql = "SELECT * FROM userprofile";
  db.query(sql, (err, result) => {
    if (err) {
      return res.status(500).json({ error: "Failed to fetch users" });
    }
    res.status(200).json(result);
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
// app.get("/bookings/:email", (req, res) => {
//   const email = req.params.email;
//   const sql = `
//         SELECT b.*, t.name as turfName, t.price
//         FROM bookings b
//         JOIN turfs t ON b.turf_id = t.id
//         WHERE b.email = ?
//     `;

//   db.query(sql, [email], (err, result) => {
//     if (err) {
//       console.error("Error fetching bookings:", err);
//       return res.status(500).json({ error: "Failed to fetch bookings" });
//     }
//     return res.status(200).json(result);
//   });
// });

app.get("/bookings/:date", (req, res) => {
  const selectedDate = req.params.date;

  const query = `
      SELECT bookings.*, turfs.name 
      FROM bookings 
      JOIN turfs ON bookings.turf_id = turfs.id 
      WHERE bookings.date = ?
    `;

  db.query(query, [selectedDate], (err, results) => {
    if (err) {
      console.error("Error fetching bookings:", err);
      return res.status(500).json({ error: "Failed to fetch bookings" });
    }

    // Return the bookings for the selected date
    res.json(results);
  });
});

// Fetch all turfs with sorting and filtering by area
app.get("/turfs", (req, res) => {
  const { priceOrder, area } = req.query;
  let sql = "SELECT id, name, price, area, imageUrl,Dimension FROM turfs"; // Include imageUrl in the select query
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
        return res.status(200).json({
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
        return res.status(200).json({
          message: "Wallet created and updated successfully",
          balance: amount,
        });
      });
    }
  });
});

 


// Export the db object
module.exports = { db };
