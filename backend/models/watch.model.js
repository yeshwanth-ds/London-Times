import mongoose from "mongoose";

// Define the watch service schema with mongoose
const watchServiceSchema = new mongoose.Schema({
  billNo: {
    type: String,  // Bill number is a string
    required: true,  // Bill number is required
    unique: true,  // Bill number must be unique
  },

  customerName: {
    type: String,  // Customer name is a string
    required: false,  // Customer name is required
  },

  customerEmail: {
    type: String,  // Customer email is a string
    required: false,  // Email is optional
  },

  customerPhoneNumber: {
    type: Number,  // Customer phone number is a number
    required: true,  // Phone number is optional
  },

  watchType: {
    type: String,  // Watch type is a string
    required: true,  // Watch type is required
    enum: ['Analog', 'Digital', 'Smartwatch', 'Other'],  // Valid options for watch type
  },

  brand: {
    type: String,  // Brand is a string
    required: false,  // Brand is optional
  },

  model: {
    type: String,  // Model is a string
    required: false,  // Model is optional
  },

  serviceType: {
    type: String,  // Service type is a string
    required: true,  // Service type is required
    enum: [
      'Cell Replacement', 
      'Other'
    ],  // Valid service options
  },

  receivedDate: {
    type: Date,  // Received date is a date
    required: true,  // Received date is required
    default: Date.now,  // Defaults to the current date and time
  },

  estimatedCompletionDate: {
    type: Date,  // Estimated completion date is a date
    required: true,  // Estimated completion date is required
  },

  serviceStatus: {
    type: String,  // Service status is a string
    required: true,  // Service status is required
    enum: ['Pending', 'In Progress', 'Completed', 'Delivered'],  // Valid status options
    default: 'Pending',  // Defaults to 'Pending'
  },

  cost: {
    type: Number,  // Cost is a number
    required: false,  // Cost is required
    min: 0,  // Cost must be greater than or equal to 0
  },

  description: {
    type: String,  // Description is a string
    default: '',  // Defaults to an empty string
  },
}, { timestamps: true });  // Enable automatic creation and update timestamps

// Export the WatchService model based on the schema
export const WatchService = mongoose.model("WatchService", watchServiceSchema);
