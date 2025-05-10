require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const app = express();
const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const taskRoutes = require("./routes/taskRoutes");
const reportRoutes = require("./routes/reportRoutes");

// Middleware to handle CORS
// app.use(cors({
//   origin: process.env.CLIENT_URL || "s", // Replace with your frontend URL
//   methods: ["GET", "POST", "PUT", "DELETE"],
//   allowedHeaders: ["Content-Type", "Authorization"],
// }));
app.use(cors()); // <-- SIMPLIFIED: Allow all origins for testing

// Connect Database
connectDB();

// Middleware
app.use(express.json());

// ---> ADD THIS MIDDLEWARE <---
app.use((req, res, next) => {
  console.log(`\n--- Incoming Request ---`);
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  console.log(`Headers: ${JSON.stringify(req.headers, null, 2)}`);
  // Log body only if Content-Type is application/json and body exists
  if (req.headers['content-type'] === 'application/json' && req.body) {
      console.log(`Body: ${JSON.stringify(req.body, null, 2)}`);
  }
  console.log(`------------------------\n`);
  next(); // Pass control to the next middleware/route handler
});
// ---> END OF ADDED MIDDLEWARE <---



//Routes

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/reports", reportRoutes);

// Server uploads folder
app.use("/uploads", express.static(path.join(__dirname, "uploads")));


// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
