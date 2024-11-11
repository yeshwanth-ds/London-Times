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
import path from 'path';

// Configure environment variables
dotenv.config();

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 5000;

const __dirname = path.resolve(); // Resolves the current directory path

// Middleware setup
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true })); // Enable CORS dynamically based on the CLIENT_URL
app.use(express.json()); // Parse JSON request bodies
app.use(cookieParser()); // Parse cookies

// Route setup
app.use("/api/auth", authRoutes); // Authentication routes
app.use("/api/watch", watchRoutes); // Watch-related routes

// Serve static files in production
if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "/frontend/dist")));

	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
	});
}

// Start the server and connect to the database
app.listen(PORT, () => {
  connectDB(); // Establish connection to the database
  console.log("Server is running on port:", PORT);
});
// Schedule a cron job to run every day at 10:30 PM
cron.schedule('30 1 * * *', async () => {  // Runs every day at 10:30 PM
  console.log("Cron job started: Fetching upcoming estimated orders...");
  try {
    const apiUrl = process.env.API_BASE_URL || 'http://localhost:5000'; // Default to local API for dev
    const response = await axios.get(`${apiUrl}/api/watch/getUpcomingEstimatedOrders`);
    console.log(apiUrl);
    console.log('Scheduled task response:', response.data); // Log the response data
  } catch (error) {
    console.error('Error in scheduled task (getUpcomingEstimatedOrders):', error.message); // Handle errors in the scheduled task
  }
});

// Schedule a cron job to run every 1st day of the month at 10:30 PM
cron.schedule('30 1 * * *', async () => {  // Runs every 1st day of the month at 10:30 PM
  console.log("Cron job started: Fetching delivered watches...");
  try {
    const apiUrl = process.env.API_BASE_URL || 'http://localhost:5000'; // Default to local API for dev
    const response = await axios.get(`${apiUrl}/api/watch/deliveredWatches`);
    console.log('Scheduled task response (deliveredWatches):', response.data); // Log the response data
  } catch (error) {
    console.error('Error in scheduled task (deliveredWatches):', error.message); // Handle errors in the scheduled task
  }
});
