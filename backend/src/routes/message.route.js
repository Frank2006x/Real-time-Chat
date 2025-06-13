const express = require("express");
const protectedRoute = require("../middleware/auth.middleware");

const router = express.Router();

router.get("/users", protectedRoute, getUsersFroSideBar);
router.get("/:id", protectedRoute, getMessages);
router.get("/send/:id",protectedRoute,sendMessage)