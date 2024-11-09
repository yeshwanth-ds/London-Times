import express from "express";
import { login, logout, signup, verifyEmail, forgotPassword, resetPassword, checkAuth} from "../controllers/auth.controllers.js"; // Import necessary controller functions
import { verifyToken } from "../middleware/verifyToken.js"; // Import middleware to verify token

const router = express.Router(); // Create a new Express router

// Route to check if the user is authenticated
router.get("/check-auth", verifyToken, checkAuth);

// Route for user signup
router.post("/signup", signup);

// Route for user login
router.post("/login", login);

// Route for user logout
router.post("/logout", logout);

// Route for verifying email
router.post("/verify-email", verifyEmail);

// Route for requesting password reset
router.post("/forgot-password", forgotPassword);

// Route for resetting password using a token
router.post("/reset-password/:token", resetPassword);

// Route for getting treatment suggestions (requires authentication)
// router.post("/get-treatment", verifyToken, getTreatment);

// Public route for getting treatment trial (no authentication required)

export default router; // Export the router for use in other parts of the app
