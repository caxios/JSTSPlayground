import mongoose from "mongoose";

/**
 * This file exists to make connection to mongoose database.
 * 
 */

// Variable to track the connection status
let isConnected = false; 

export const connectToDB = async () => {
  // Set strict query mode for Mongoose to prevent unknown field queries.
  mongoose.set("strictQuery", true);

  // Checking whetther there is valid URL to our mongoose db.
  if (!process.env.MONGODB_URL) return console.log("Missing MongoDB URL");

  // If the connection is already established, return without creating a new connection.
  if (isConnected) {
    console.log("MongoDB connection already established");
    return;
  }


  // If there is no connection, then make it.
  try {
    // Passing URL we get from mongodb website to make connection to mongodb.
    await mongoose.connect(process.env.MONGODB_URL);

    // Set the connection status to true
    isConnected = true;
    console.log("MongoDB connected");
  } catch (error) {
    console.log(error);
  }
};
