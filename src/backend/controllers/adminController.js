
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
// GET All booked appointments
async function getBookedAppointments(req, res) {
    try {
        const appointments = await adminService.getBookedAppointments();

        res.status(200).json({
            success: true,
            count: appointments.length,
            appointments
        });

    } catch (error) {
        console.error("Failed to retrieve booked appointments:", error.message);

        res.status(500).json({
            error: "Unable to retrieve booked appointments"
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

const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const VALID_STATUSES = ["cancelled", "completed"];

// GET one appointment
async function getAppointment(req, res) {
    try {
        const { id } = req.params;

        if (!UUID_PATTERN.test(id)) {
            return res.status(400).json({ error: "Appointment ID is not valid" });
        }

        const appointment = await adminService.getAppointmentById(id);

        if (!appointment) {
            return res.status(404).json({ error: "Appointment not found" });
        }

        res.status(200).json({ success: true, appointment });

    } catch (error) {
        console.error("Unable to retrieve appointment:", error.message);

        res.status(500).json({
            error: "Unable to retrieve appointment"
        });
    }
}

// PATCH appointment status
async function updateAppointmentStatus(req, res) {
    try {
        const { id } = req.params;
        const { status } = req.body || {};

        if (!UUID_PATTERN.test(id)) {
            return res.status(400).json({ error: "Appointment ID is not valid" });
        }

        if (!VALID_STATUSES.includes(status)) {
            return res.status(400).json({
                error: "Status must be cancelled or completed"
            });
        }

        const appointment = await adminService.updateAppointmentStatus(id, status);

        res.status(200).json({ success: true, appointment });

    } catch (error) {
        console.error("Unable to update appointment status:", error.message);

        res.status(500).json({
            error: "Unable to update appointment status"
        });
    }
}

// PATCH reschedule appointment
async function rescheduleAppointment(req, res) {
    try {
        const { id } = req.params;
        const { slot_id } = req.body || {};

        if (!UUID_PATTERN.test(id) || !UUID_PATTERN.test(slot_id || "")) {
            return res.status(400).json({
                error: "Appointment ID and slot_id must be valid"
            });
        }

        const appointment = await adminService.rescheduleAppointment(id, slot_id);

        res.status(200).json({ success: true, appointment });

    } catch (error) {
        console.error("Unable to reschedule appointment:", error.message);

        res.status(500).json({
            error: "Unable to reschedule appointment"
        });
    }
}

// DELETE appointment slot
async function deleteSlot(req, res) {
    try {
        const { id } = req.params;

        if (!UUID_PATTERN.test(id)) {
            return res.status(400).json({ error: "Slot ID is not valid" });
        }

        await adminService.deleteSlot(id);

        res.status(200).json({ success: true, message: "Slot deleted" });

    } catch (error) {
        console.error("Unable to delete slot:", error.message);

        res.status(500).json({
            error: "Unable to delete slot"
        });
    }
}

// GET one appointment slot
async function getSlotById(req, res) {
    try {
        const { id } = req.params;

        if (!UUID_PATTERN.test(id)) {
            return res.status(400).json({ error: "Slot ID is not valid" });
        }

        const slot = await adminService.getSlotById(id);

        if (!slot) {
            return res.status(404).json({ error: "Slot not found" });
        }

        res.status(200).json({ success: true, slot });

    } catch (error) {
        console.error("Unable to retrieve slot:", error.message);

        res.status(500).json({
            error: "Unable to retrieve slot"
        });
    }
}

/**
 * POST /api/campaigns
 */
async function createCampaign(req, res) {
    try {
        const { campaignName, location, startDate, email, phone } = req.body;

        if (!campaignName || !location || !startDate) {
            return res.status(400).json({
                error: "Campaign name, location, and start date are required"
            });
        }

        const campaign = await adminService.createCampaign({
            campaignName,
            location,
            startDate,
            email,
            phone,
            userId: req.user.id   //set by authenticateUser middleware
        });

        res.status(201).json({ success: true, campaign });

    } catch (error) {
        console.error("Create campaign error:", error.message);
        res.status(500).json({ error: error.message || "Failed to create campaign" });
    }
}


module.exports = {
    getAppointments,
    getAppointment,
    updateAppointmentStatus,
    rescheduleAppointment,
    getSlots,
    getSlotById,
    getBookedAppointments,
    createSlot,
    updateSlot,
    deleteSlot,
    createCampaign
};