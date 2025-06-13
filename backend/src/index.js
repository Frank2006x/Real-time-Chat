const express = require("express");
const authRoutes = require("./routes/auth.route");
require("dotenv").config();
const app = express();

app.use("/api/auth", authRoutes);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log("Server is running on port ", PORT);
});
