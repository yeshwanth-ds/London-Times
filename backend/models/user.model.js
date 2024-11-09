import mongoose from "mongoose";

// Define the user schema with mongoose
const userSchema = new mongoose.Schema({
    email: {
        type: String,  // Email is a string
        required: true,  // Email is required
        unique: true,  // Email must be unique
    },
    password: {
        type: String,  // Password is a string
        required: true  // Password is required
    },
    name: {
        type: String,  // Name is a string
        required: true  // Name is required
    },
    lastLogin: {
        type: Date,  // Last login is a date
        default: Date.now  // Defaults to the current date/time
    },
    isVerified: {
        type: Boolean,  // isVerified is a boolean
        default: false  // Defaults to false
    },
    resetPasswordToken: String,  // Token for resetting password
    resetPasswordExpiresAt: Date,  // Expiry date for password reset token
    verificationToken: String,  // Token for email verification
    verificationTokenExpiresAt: Date,  // Expiry date for verification token

}, { timestamps: true });  // Enable automatic timestamps for createdAt and updatedAt

// Create a User model from the schema
export const User = mongoose.model("User", userSchema);
