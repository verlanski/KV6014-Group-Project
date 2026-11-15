// Calls to our backend admin API (src/backend/routes/adminRoutes.js).

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

// Reads the JSON reply and turns an error reply into a thrown Error
// that keeps the HTTP status, so the page can react to it.
async function handleResponse(response) {
  const body = await response.json().catch(() => ({}));
  if (!response.ok) {
    const error = new Error(body.error || "Something went wrong. Please try again.");
    error.status = response.status;
    error.body = body;
    throw error;
  }
  return body;
}

// Sends an authorised request to an admin endpoint.
async function adminRequest(path, accessToken, { method = "GET", data } = {}) {
  const response = await fetch(`${API_URL}/api/admin${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: data ? JSON.stringify(data) : undefined,
  });
  return handleResponse(response);
}

// Appointments
export async function getAllAppointments(accessToken) {
  const body = await adminRequest("/appointments", accessToken);
  return body.appointments;
}

export async function getAppointmentById(id, accessToken) {
  const body = await adminRequest(`/appointments/${id}`, accessToken);
  return body.appointment;
}

export async function updateAppointmentStatus(id, status, accessToken) {
  const body = await adminRequest(`/appointments/${id}/status`, accessToken, { method: "PATCH", data: { status } });
  return body.appointment;
}

export async function rescheduleAppointment(id, newSlotId, accessToken) {
  const body = await adminRequest(`/appointments/${id}/reschedule`, accessToken, { method: "PATCH", data: { slot_id: newSlotId } });
  return body.appointment;
}

// Slots
export async function getAllSlots(accessToken) {
  const body = await adminRequest("/slots", accessToken);
  return body.slots;
}

export async function getSlotById(id, accessToken) {
  const body = await adminRequest(`/slots/${id}`, accessToken);
  return body.slot;
}

export async function createSlot(slot, accessToken) {
  const body = await adminRequest("/slots", accessToken, { method: "POST", data: slot });
  return body.slot;
}

export async function updateSlot(id, updates, accessToken) {
  const body = await adminRequest(`/slots/${id}`, accessToken, { method: "PATCH", data: updates });
  return body.slot;
}

export async function deleteSlot(id, accessToken) {
  await adminRequest(`/slots/${id}`, accessToken, { method: "DELETE" });
}