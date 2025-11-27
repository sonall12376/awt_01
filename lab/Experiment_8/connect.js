// Import mongoose
const mongoose = require("mongoose");

// MongoDB connection string
const uri = "mongodb://127.0.0.1:27017/Connect";

// Connect to MongoDB
mongoose.connect(uri)
  .then(() => {
    console.log("Successfully connected to MongoDB!");
    mongoose.connection.close();
  })
  .catch((err) => {
    console.log("Error connecting to MongoDB:", err);
  });
