// Booking routes - used by the Time-Slot Booking page.

const express = require("express");

const router = express.Router();

const { authenticateUser } = require("../middleware/authMiddleware");

const bookingController = require("../controllers/bookingController");

// Anyone can see which slots exist and which are free.
router.get("/slots", bookingController.getSlots);

// Only logged-in patients can see or make their own booking.
router.get("/my-appointment", authenticateUser, bookingController.getMyAppointment);
router.post("/appointments", authenticateUser, bookingController.createAppointment);

module.exports = router;
