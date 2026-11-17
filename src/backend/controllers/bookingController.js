// Booking controller - checks the request, calls the booking service and
// sends back a clear JSON reply for the Time-Slot Booking page.

const bookingService = require("../services/bookingService");

const DATE_FORMAT = /^\d{4}-\d{2}-\d{2}$/;
const UUID_FORMAT = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

// GET /api/booking/slots?date=YYYY-MM-DD  (date is optional)
async function getSlots(req, res) {
    try {
        const { date } = req.query;

        if (date && !DATE_FORMAT.test(date)) {
            return res.status(400).json({
                error: "Date must be in the format YYYY-MM-DD"
            });
        }

        const slots = await bookingService.getSlots(date);

        res.status(200).json({
            success: true,
            count: slots.length,
            slots
        });

    } catch (error) {
        console.error("Failed to retrieve booking slots:", error.message);

        res.status(500).json({
            error: "Unable to retrieve appointment slots"
        });
    }
}

// GET /api/booking/my-appointment  (logged-in patient only)
async function getMyAppointment(req, res) {
    try {
        const appointment = await bookingService.getActiveAppointment(req.user.id);

        res.status(200).json({
            success: true,
            appointment
        });

    } catch (error) {
        console.error("Failed to retrieve appointment:", error.message);

        res.status(500).json({
            error: "Unable to retrieve your appointment"
        });
    }
}

// POST /api/booking/appointments  body: { slot_id }  (logged-in patient only)
async function createAppointment(req, res) {
    try {
        const { slot_id } = req.body || {};

        if (!slot_id || !UUID_FORMAT.test(slot_id)) {
            return res.status(400).json({
                error: "A valid slot_id is required"
            });
        }

        const result = await bookingService.bookSlot(req.user.id, slot_id);

        if (result.problem === "already_booked") {
            return res.status(409).json({
                error: "You already have a screening booked",
                appointment: result.appointment
            });
        }

        if (result.problem === "slot_unavailable") {
            return res.status(409).json({
                error: "Sorry, that time has just been taken. Please choose another slot."
            });
        }

        res.status(201).json({
            success: true,
            appointment: result.appointment
        });

    } catch (error) {
        console.error("Failed to create appointment:", error.message);

        res.status(500).json({
            error: "Unable to book this appointment"
        });
    }
}

// DELETE /api/booking/my-appointment (logged in patient only)
async function cancelAppointment(req, res) {
    try {
        const result = await bookingService.cancelBooking(req.user.id);

        if(result.problem === "not_found") {
            return res.status(404).json({
                error: "You do not have a screening booked"
            });
        }
        res.status(200).json({
            success: true,
            appiontment: result.appointment
        });

    } catch (error) {
        console.error("Failed to cancel appointment:", error.message);

        res.status(500).json({
            error: "Unable to cancel your appointment"
        });
    }
    
}

module.exports = {
    getSlots,
    getMyAppointment,
    createAppointment,
    cancelAppointment
};
