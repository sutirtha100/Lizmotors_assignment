require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const videoRoutes = require("./routes/videoRoutes");
const cors = require("cors"); // Import the CORS middleware

const app = express();

// Enable CORS for all routes
app.use(cors());

app.use(express.json());

// Connect to MongoDB
connectDB();

// Serve uploaded files statically
app.use("/uploads", express.static("uploads"));

// Routes
app.use("/api", videoRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
