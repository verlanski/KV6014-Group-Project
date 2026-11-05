
const adminService = require("../services/adminService");

// GET all appointments
async function getAppointments(req, res) {
    try {
        const appointments = await adminService.getAllAppointments();

        res.status(200).json({
            success: true,
            count: appointments.length,
            appointments
        });

    } catch (error) {
        console.error("Failed to retrieve appointments:", error.message);

        res.status(500).json({
            error: "Unable to retrieve appointments"
        });
    }
}

// GET all appointment slots
async function getSlots(req, res) {
    try {
        const slots = await adminService.getAllSlots();

        res.status(200).json({
            success: true,
            count: slots.length,
            slots
        });

    } catch (error) {
        console.error("Failed to retrieve slots:", error.message);

        res.status(500).json({
            error: "Unable to retrieve appointment slots"
        });
    }
}

// POST create appointment slot
async function createSlot(req, res) {
    try {
        const { slot_date, start_time, end_time } = req.body;

        if (!slot_date || !start_time || !end_time) {
            return res.status(400).json({
                error: "Date, start time and end time are required"
            });
        }

        if (end_time <= start_time) {
            return res.status(400).json({
                error: "End time must be after start time"
            });
        }

        const slot = await adminService.createSlot({
            slot_date,
            start_time,
            end_time
        });

        res.status(201).json({
            success: true,
            slot
        });

    } catch (error) {
        console.error("Failed to create slot:", error.message);

        res.status(500).json({
            error: "Unable to create appointment slot"
        });
    }
}

// PATCH update appointment slot
async function updateSlot(req, res) {
    try {
        const { id } = req.params;
        const { slot_date, start_time, end_time, is_available } = req.body;

        const updates = {};

        if (slot_date !== undefined) updates.slot_date = slot_date;
        if (start_time !== undefined) updates.start_time = start_time;
        if (end_time !== undefined) updates.end_time = end_time;
        if (is_available !== undefined) updates.is_available = is_available;

        if (Object.keys(updates).length === 0) {
            return res.status(400).json({
                error: "No valid fields provided"
            });
        }

        if (
            updates.start_time &&
            updates.end_time &&
            updates.end_time <= updates.start_time
        ) {
            return res.status(400).json({
                error: "End time must be after start time"
            });
        }

        const slot = await adminService.updateSlot(id, updates);

        res.status(200).json({
            success: true,
            slot
        });

    } catch (error) {
        console.error("Failed to update slot:", error.message);

        res.status(500).json({
            error: "Unable to update appointment slot"
        });
    }
}

module.exports = {
    getAppointments,
    getSlots,
    createSlot,
    updateSlot
};
