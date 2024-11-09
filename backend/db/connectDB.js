import mongoose from "mongoose";

// Function to connect to the MongoDB database
export const connectDB = async () => {
   try {
      // Attempt to connect to the MongoDB database using the connection string from the environment variables
      const conn = await mongoose.connect(process.env.MONGO_URI);
      
      // Log the host of the connected MongoDB database
      console.log(`MongoDB Connected : ${conn.connection.host}`);
   } catch (error) {
      // Log an error message if the connection fails
      console.log("Error connect to MongoDB : ", error.message);
      
      // Exit the process with a failure code if the connection cannot be established
      process.exit(1);
   } 
}
