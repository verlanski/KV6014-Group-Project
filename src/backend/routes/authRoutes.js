const express = require("express");
const router = express.Router();

const authController = require("../controllers/authController");
const { authenticateUser } = require("../middleware/authMiddleware");

// Public authentication routes
router.post("/register", authController.register);
router.post("/login", authController.login);

// Protected routes (requires valid Bearer token)
router.get("/me", authenticateUser, authController.getMe);

module.exports = router;
