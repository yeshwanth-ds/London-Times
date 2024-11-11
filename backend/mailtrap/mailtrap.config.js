import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Configure the Nodemailer transporter
export const transporter = nodemailer.createTransport({
  service: 'gmail', // Use Gmail as the service
  auth: {
    user: process.env.USER, // User from environment variable
    pass: process.env.APP_PASSWORD, // App password from environment variable
  },
});

// Define the sender information
export const sender = {
  email: process.env.USER,  // Use your email from .env
  name: 'London-Times',     // Name to show as the sender
};
