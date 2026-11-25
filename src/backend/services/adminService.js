const supabaseAdmin = require("../config/supabaseAdmin");

// Retrieve all appointments
async function getAllAppointments() {
    const { data, error } = await supabaseAdmin
        .from("appointments")
        .select("*")
        .order("appointment_date", { ascending: true })
        .order("appointment_time", { ascending: true });

    if (error) throw error;

    // Appointments only store patient_id (the auth user's id). The patient's
    // name, email and phone live on the auth user, so look those up and attach them.
    const { data: usersData, error: usersError } = await supabaseAdmin.auth.admin.listUsers({ perPage: 1000 });

    if (usersError) throw usersError;

    const usersById = new Map(usersData.users.map((u) => [u.id, u]));

    return data.map((appointment) => {
        const user = usersById.get(appointment.patient_id);
        return {
            ...appointment,
            patient_name: user?.user_metadata?.full_name ?? null,
            patient_email: user?.email ?? null,
            patient_phone: user?.user_metadata?.phone ?? null
        };
    });
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
        .order("slot_date", { ascending: true })
        .order("start_time", { ascending: true });

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

// Retrieve all booked appointments with their associated slot and patient information
async function getBookedAppointments() {
    const { data, error } = await supabaseAdmin
        .from("appointments")
        .select(`
            *,
            appointment_slots (slot_date, start_time, end_time),
            profiles (full_name)
        `)
        .eq("status", "booked")
        .order("appointment_date", { ascending: true })
        .order("appointment_time", { ascending: true });

    if (error) throw error;

    return data;
}

async function createCampaign({ campaignName, location, startDate, email, phone, userId }) {
    const { data, error } = await supabaseAdmin
        .from("campaigns")
        .insert({
            campaign_name: campaignName,   // left side = DB column names
            location,
            start_date: startDate,
            email,
            phone,
            created_by: userId             
        })
        .select()
        .single();

    if (error) throw error;
    return data;
}


module.exports = {
    getAllAppointments,
    getBookedAppointments,
    getAppointmentById,
    updateAppointmentStatus,
    rescheduleAppointment,
    getAllSlots,
    getSlotById,
    createSlot,
    updateSlot,
    deleteSlot,
    createCampaign
};
