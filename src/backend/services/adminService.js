const supabaseAdmin = require("../config/supabaseAdmin");

// Retrieve all appointments
async function getAllAppointments() {
    const { data, error } = await supabaseAdmin
        .from("appointments")
        .select("*")
        .order("appointment_date", { ascending: true });

    if (error) throw error;

    return data;
}

// Retrieve one appointment
async function getAppointmentById(id) {
    const { data, error } = await supabaseAdmin
        .from("appointments")
        .select("*")
        .eq("id", id)
        .maybeSingle();

    if (error) throw error;

    return data;
}

// Change an appointment's status. Cancelling also frees its slot.
async function updateAppointmentStatus(id, status) {
    const { data, error } = await supabaseAdmin.rpc("admin_update_appointment_status", {
        p_appointment_id: id,
        p_status: status
    });

    if (error) throw error;

    return data;
}

// Move an appointment to a new slot
async function rescheduleAppointment(id, newSlotId) {
    const { data, error } = await supabaseAdmin.rpc("admin_reschedule_appointment", {
        p_appointment_id: id,
        p_new_slot_id: newSlotId
    });

    if (error) throw error;

    return data;
}

// Retrieve all appointment slots
async function getAllSlots() {
    const { data, error } = await supabaseAdmin
        .from("appointment_slots")
        .select("*")
        .order("slot_date", { ascending: true });

    if (error) throw error;

    return data;
}

// Retrieve one appointment slot
async function getSlotById(id) {
    const { data, error } = await supabaseAdmin
        .from("appointment_slots")
        .select("*")
        .eq("id", id)
        .maybeSingle();

    if (error) throw error;

    return data;
}

// Create a new appointment slot
async function createSlot(slot) {
    const { data, error } = await supabaseAdmin
        .from("appointment_slots")
        .insert(slot)
        .select()
        .single();

    if (error) throw error;

    return data;
}

// Update an appointment slot
async function updateSlot(id, updates) {
    if (!id) {
        throw new Error("Slot ID is required for update");
    }

    const { data, error } = await supabaseAdmin.rpc("admin_update_slot", {
        p_slot_id: id,
        p_slot_date: updates.slot_date ?? null,
        p_start_time: updates.start_time ?? null,
        p_end_time: updates.end_time ?? null,
        p_is_available: updates.is_available ?? null
    });

    if (error) throw error;

    return data;
}

// Delete an appointment slot
async function deleteSlot(id) {
    const { error } = await supabaseAdmin.rpc("admin_delete_slot", {
        p_slot_id: id
    });

    if (error) throw error;
}

module.exports = {
    getAllAppointments,
    getAppointmentById,
    updateAppointmentStatus,
    rescheduleAppointment,
    getAllSlots,
    getSlotById,
    createSlot,
    updateSlot,
    deleteSlot
};
