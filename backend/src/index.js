const express = require("express");
const authRoutes = require("./routes/auth.route");
const cookieParser = require("cookie-parser");
const { connectDB } = require("./lib/db");
require("dotenv").config();
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authRoutes);
const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log("Server is running on port ", PORT);
  connectDB();
});
