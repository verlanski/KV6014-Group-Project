
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

// Retrieve all appointment slots
async function getAllSlots() {
    const { data, error } = await supabaseAdmin
        .from("appointment_slots")
        .select("*")
        .order("slot_date", { ascending: true });

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

    const { data, error } = await supabaseAdmin
        .from("appointment_slots")
        .update(updates)
        .eq("id", id)
        .select()
        .single();


    if (error) throw error;

    return data;
}

module.exports = {
    getAllAppointments,
    getAllSlots,
    createSlot,
    updateSlot
};
