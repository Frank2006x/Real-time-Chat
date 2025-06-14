const express = require("express");
const protectedRoute = require("../middleware/auth.middleware");
const getUsersFromSideBar =
  require("../controller/message.controller").getUsersFromSideBar;
const getMessages = require("../controller/message.controller").getMessages;
const sendMessage = require("../controller/message.controller").sendMessage;
const router = express.Router();
console.log(typeof getUsersFromSideBar, typeof getMessages, typeof sendMessage);
router.get("/users", protectedRoute, getUsersFromSideBar);
router.get("/:id", protectedRoute, getMessages);
router.post("/send/:id", protectedRoute, sendMessage);

module.exports = router;
