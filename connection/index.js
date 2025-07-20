const mongoose = require("mongoose");

let conn = null; // Store the connection promise

const connectDB = async (url) => {
  if (conn) {
    console.log("Reusing existing MongoDB connection");
    return conn;
  }

  try {
    console.log("Establishing new MongoDB connection");
    conn = await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000, // Timeout after 5 seconds
      connectTimeoutMS: 10000, // Connection timeout
    });
    console.log("MongoDB connected successfully");
    return conn;
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
    throw error;
  }
};

module.exports = connectDB;
