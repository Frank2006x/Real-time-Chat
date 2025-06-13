const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URL);
    console.log(`MongoDB connected ${conn.connection.host}`);
  } catch {
    console.log("connection error");
  }
};

module.exports = { connectDB };
