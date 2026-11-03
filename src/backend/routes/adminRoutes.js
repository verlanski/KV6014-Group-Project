
const express = require("express");

const router = express.Router();

const { authenticateUser } = require("../middleware/authMiddleware");
const { requireAdmin } = require("../middleware/adminMiddleware");

const adminController = require("../controllers/adminController");

// Protect every route below this point
router.use(authenticateUser, requireAdmin);

// Appointment routes
router.get("/appointments", adminController.getAppointments);

// Appointment slot routes
router.get("/slots", adminController.getSlots);
router.post("/slots", adminController.createSlot);
router.patch("/slots/:id", adminController.updateSlot);

module.exports = router;
