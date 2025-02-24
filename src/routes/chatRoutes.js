const express = require("express");
const { getChatHistory } = require("../controllers/chatController");

const router = express.Router();
// const validateRequest = (req, res, next) => {
//     // Add logic later (e.g., check auth token)
//     next();
//   };
router.get("/history", getChatHistory);

module.exports = router;
