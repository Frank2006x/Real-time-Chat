const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
module.exports = async function protectedRoute(req, res, next) {
  try {
    const token = req.cookies.jwt;

    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized - No token provided" });
    }

    const decoded = jwt.verify(token,process.env.JWT_SECRET);
    if (!decoded) {
      return res.status(401).json({ message: "Unauthorized - Invaild Token" });
    }
    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    req.user = user;
    next();
  } catch (err) {
    console.log("Error in protectedRoute middleware ", console.error.message);
  }
};
