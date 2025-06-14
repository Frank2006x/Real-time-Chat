const express = require("express");
const authRoutes = require("./routes/auth.route");
const messageRoutes = require("./routes/message.route");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { connectDB } = require("./lib/db");
require("dotenv").config();
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log("Server is running on port ", PORT);
  connectDB();
});
