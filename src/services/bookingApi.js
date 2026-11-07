// Calls to our backend booking API (src/backend/routes/bookingRoutes.js).

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

// Get all upcoming slots (free and taken).
export async function fetchSlots() {
  const response = await fetch(`${API_URL}/api/booking/slots`);
  const body = await handleResponse(response);
  return body.slots;
}

// Book one slot for the logged-in patient.
export async function bookAppointment(slotId, accessToken) {
  const response = await fetch(`${API_URL}/api/booking/appointments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({ slot_id: slotId }),
  });
  const body = await handleResponse(response);
  return body.appointment;
}
