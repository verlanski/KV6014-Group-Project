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

//GET ROUTES
router.get("/slots", adminController.getSlots);
router.get("/slots/:id", adminController.getSlotById);
router.get("/appointments/:id", adminController.getAppointment);

//POST, PATCH, DELETE ROUTES
router.post("/slots", adminController.createSlot);
router.patch("/slots/:id", adminController.updateSlot);
router.delete("/slots/:id", adminController.deleteSlot);
router.patch("/appointments/:id/status", adminController.updateAppointmentStatus);
router.patch("/appointments/:id/reschedule", adminController.rescheduleAppointment);




module.exports = router;