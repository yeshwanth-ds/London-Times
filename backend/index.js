// Import required modules
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import axios from "axios";
import cookieParser from "cookie-parser";
import cron from "node-cron"; // Import node-cron for scheduling tasks
import { connectDB } from "./db/connectDB.js"; // Import database connection function
import authRoutes from "./routes/auth.route.js"; // Import authentication routes
import watchRoutes from "./routes/watch.route.js"; // Import watch-related routes

// Configure environment variables
dotenv.config();

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware setup
app.use(cors({ origin: "http://localhost:5173", credentials: true })); // Enable CORS for a specific origin
app.use(express.json()); // Parse JSON request bodies
app.use(cookieParser()); // Parse cookies

// Route setup
app.use("/api/auth", authRoutes); // Authentication routes
app.use("/api/watch", watchRoutes); // Watch-related routes

// Start the server and connect to the database
app.listen(PORT, () => {
  connectDB(); // Establish connection to the database
  console.log("Server is running on port:", PORT);
});


cron.schedule('00 10 * * *', async () => {
  try {
    // Send a GET request to retrieve upcoming estimated orders
    const response = await axios.get('http://localhost:5000/api/watch/getUpcomingEstimatedOrders');
    console.log('Scheduled task response:', response.data); // Log the response data
  } catch (error) {
    console.error('Error in scheduled task:', error.message); // Handle errors in the scheduled task
  }
});

cron.schedule('00 10 1 * *', async () => {
  try {
    // Send a GET request to retrieve upcoming estimated orders
    const response = await axios.get('http://localhost:5000/api/watch/deliveredWatches');
    console.log('Scheduled task response:', response.data); // Log the response data
  } catch (error) {
    console.error('Error in scheduled task:', error.message); // Handle errors in the scheduled task
  }
});

