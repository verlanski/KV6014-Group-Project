// Booking service - talks to Supabase for the Time-Slot Booking page.
// Uses the server-side (admin) client, so every rule about who can book what
// is checked here on the server, not in the browser.

const supabaseAdmin = require("../config/supabaseAdmin");

// The clinic works in UK time, so "today" and "now" use Europe/London
// rather than UTC (otherwise dates would be wrong around midnight in summer).
const CLINIC_TIME_ZONE = "Europe/London";

// Today's date as YYYY-MM-DD.
function today() {
    return new Date().toLocaleDateString("en-CA", { timeZone: CLINIC_TIME_ZONE });
}

// The time right now as HH:MM:SS.
function timeNow() {
    return new Date().toLocaleTimeString("en-GB", { timeZone: CLINIC_TIME_ZONE, hour12: false });
}

// Only keep slots that have not started yet:
// any later day, or later today.
function onlyFutureSlots(query) {
    const date = today();
    return query.or(`slot_date.gt.${date},and(slot_date.eq.${date},start_time.gt.${timeNow()})`);
}

// Get slots that patients can see.
// If a date is given, only that day; otherwise every upcoming slot.
// Taken slots are included (is_available = false) so the page can grey them out.
async function getSlots(date) {
    let query = supabaseAdmin
        .from("appointment_slots")
        .select("id, slot_date, start_time, end_time, is_available")
        .order("slot_date", { ascending: true })
        .order("start_time", { ascending: true });

    if (date) {
        query = query.eq("slot_date", date);
    }

    // Never show slots that are in the past or have already started today.
    query = onlyFutureSlots(query);

    const { data, error } = await query;
    if (error) throw error;
    return data;
}

// Find a patient's current (still booked) appointment, if they have one.
async function getActiveAppointment(patientId) {
    const { data, error } = await supabaseAdmin
        .from("appointments")
        .select("id, slot_id, appointment_date, appointment_time, status")
        .eq("patient_id", patientId)
        .eq("status", "booked")
        .gte("appointment_date", today())
        .limit(1)
        .maybeSingle();

    if (error) throw error;
    return data;
}

// Book a slot for a patient.
// Returns { appointment } on success, or { problem } with a reason the
// controller turns into the right HTTP status.
async function bookSlot(patientId, slotId) {
    // 1. One active booking per patient (stops repeat bookings).
    const existing = await getActiveAppointment(patientId);
    if (existing) {
        return { problem: "already_booked", appointment: existing };
    }

    // 2. Claim the slot. The update only works if the slot is still free,
    //    so two people pressing "Next" at the same time cannot both get it.
    //    Past slots (or ones that have already started today) cannot be booked.
    const { data: slot, error: claimError } = await onlyFutureSlots(
        supabaseAdmin
            .from("appointment_slots")
            .update({ is_available: false })
            .eq("id", slotId)
    )
        .eq("is_available", true)
        .select("id, slot_date, start_time, end_time")
        .maybeSingle();

    if (claimError) throw claimError;
    if (!slot) {
        return { problem: "slot_unavailable" };
    }

    // 3. Save the appointment against the claimed slot.
    const { data: appointment, error: insertError } = await supabaseAdmin
        .from("appointments")
        .insert({
            patient_id: patientId,
            slot_id: slot.id,
            appointment_date: slot.slot_date,
            appointment_time: slot.start_time,
            status: "booked"
        })
        .select("id, slot_id, appointment_date, appointment_time, status")
        .single();

    if (insertError) {
        // Saving failed, so give the slot back before reporting the error.
        await supabaseAdmin
            .from("appointment_slots")
            .update({ is_available: true })
            .eq("id", slot.id);
        throw insertError;
    }

    return { appointment };
}

// Cancel the patients current booking and free the slot
// patient is found from their login (patient_id) so no appointment id is necessary.
// returns { appointment } on success, or { problem: "not_found"} if they have no booking.
async function cancelBooking(patientId) {
    // find the patients current booking.
    const appointment = await getActiveAppointment(patientId);
    if (!appointment) {
        return { problem: "not_found" };
    }
    
    // Delete it. Also matching patient_id mean it can only ever be their own.
    const { error: deleteError } = await supabaseAdmin
        .from("appointments")
        .delete()
        .eq("id", appointment.id)
        .eq("patient_id", patientId);

    if (deleteError) throw deleteError;

    // Give slot back so it is available to user again.
    const { error: freeError } = await supabaseAdmin
        .from("appointment_slots")
        .update({ is_available:true })
        .eq("id", appointment.slot_id);

    if (freeError) {
        // Could not free slot so put appointment back before reporting error.
        await supabaseAdmin
            .from("appointments")
            .insert({ ...appointment, patient_Id: patientId  });
        throw freeError;
    }
return { appointment };
}  

module.exports = {
    getSlots,
    getActiveAppointment,
    bookSlot,
    cancelBooking
};
