import express from "express"; // Importing the Express framework for building the web server
import dotenv from "dotenv"; // Importing dotenv to load environment variables from a .env file
import cors from "cors"; // Importing CORS middleware for enabling cross-origin resource sharing
import cookieParser from "cookie-parser"; // Importing cookie-parser middleware for parsing cookies in incoming requests
import { connectDB } from "./db/connectDB.js"; // Importing the database connection function
import authRoutes from "./routes/auth.route.js"; // Importing authentication routes
import watchRoutes from "./routes/watch.route.js";
// import path from "path"; // Provides utilities for working with file and directory paths

// Load environment variables from .env file
dotenv.config();

const app = express(); // Creating an instance of an Express application

// Set the port to the value from the environment variable or default to 5000
const PORT = process.env.PORT || 5000;

// const __dirname = path.resolve();
//Resolves the current directory path

// CORS configuration to allow requests from a specific origin with credentials
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

// Middleware to parse incoming JSON requests
app.use(express.json());  

// Middleware to parse cookies from incoming requests
app.use(cookieParser()); 

// Mounting the authentication routes under the /api/auth endpoint
app.use("/api/auth", authRoutes);

app.use("/api/watch", watchRoutes);

// if (process.env.NODE_ENV === "production") {
// 	// Serve static files from the frontend 'dist' folder in production
// 	app.use(express.static(path.join(__dirname, "/frontend/dist")));

// 	// For any other route, serve the main index.html file from the frontend
// 	app.get("*", (req, res) => {
// 		res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
// 	});
// }

// Starting the server and connecting to the database
app.listen(PORT, () => {
    connectDB(); // Connect to the database
    console.log("Server is running on port :", PORT); // Log the server status
});
