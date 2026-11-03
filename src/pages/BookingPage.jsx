// Wireframe screen 4 - Time-Slot Booking
// The user picks a date and a time slot, then presses Next. The booking is
// saved through our backend API, then the user goes to the Booking
// Confirmation page (wireframe screen 5).

import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { fetchSlots, bookAppointment } from "../services/bookingApi";
import { getAccessToken } from "../lib/supabaseClient";

// Database times look like "09:30:00" - show them as "09:30".
function shortTime(time) {
  return time ? time.slice(0, 5) : "";
}

export default function BookingPage() {
  const [slots, setSlots] = useState([]);          // all upcoming slots from the API
  const [loading, setLoading] = useState(true);    // true while slots are loading
  const [loadError, setLoadError] = useState("");  // message if slots fail to load

  const [date, setDate] = useState("");            // chosen date, e.g. "2027-09-17"
  const [slotId, setSlotId] = useState("");        // id of the chosen slot
  const [message, setMessage] = useState("");      // message shown above Next
  const [needsLogin, setNeedsLogin] = useState(false);
  const [saving, setSaving] = useState(false);     // true while the booking is being saved

  const navigate = useNavigate();

  // Load slots from the backend.
  async function loadSlots() {
    setLoading(true);
    setLoadError("");
    try {
      setSlots(await fetchSlots());
    } catch {
      setLoadError("We couldn't load the available times. Please try again later.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadSlots();
  }, []);

  // Dates that have at least one slot, used to limit the date picker.
  const eventDates = [...new Set(slots.map((slot) => slot.slot_date))];
  const firstDate = eventDates[0];
  const lastDate = eventDates[eventDates.length - 1];

  const slotsForDate = slots.filter((slot) => slot.slot_date === date);
  const chosenSlot = slots.find((slot) => slot.id === slotId);

  // Next only works when a free slot is chosen.
  const canContinue = chosenSlot && chosenSlot.is_available && !saving;

  function handleDateChange(event) {
    setDate(event.target.value);
    setSlotId(""); // a new date means the old time choice no longer applies
    setMessage("");
    setNeedsLogin(false);
  }

  async function handleNext() {
    if (!canContinue) return; // safety check - Next should be disabled anyway
    setMessage("");
    setNeedsLogin(false);

    const token = await getAccessToken();
    if (!token) {
      setNeedsLogin(true);
      setMessage("Please log in or register before booking your screening.");
      return;
    }

    setSaving(true);
    try {
      const appointment = await bookAppointment(chosenSlot.id, token);
      navigate("/booking/confirmation", {
        state: {
          date: appointment.appointment_date,
          time: shortTime(appointment.appointment_time),
          appointmentId: appointment.id,
        },
      });
    } catch (error) {
      if (error.status === 401) {
        setNeedsLogin(true);
        setMessage("Your session has expired. Please log in again.");
      } else if (error.status === 409 && error.body && error.body.appointment) {
        const booked = error.body.appointment;
        setMessage(
          `You already have a screening booked on ${booked.appointment_date} at ${shortTime(booked.appointment_time)}.`
        );
      } else if (error.status === 409) {
        setMessage(error.message);
        setSlotId("");
        loadSlots(); // refresh so the taken slot shows as full
      } else {
        setMessage(error.message);
      }
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="mx-auto max-w-4xl px-4 pb-16">
      {/* Pink title bar from the wireframe */}
      <h1 className="bg-bg-surface py-4 text-center text-xl text-text-main">
        Time-slot booking
      </h1>

      <div className="mt-10 grid gap-10 md:grid-cols-2">
        {/* Left side: instruction text */}
        <p className="text-lg text-text-main">
          Choose a date and time for your cervical screening:
        </p>

        {/* Right side: date picker and time slots */}
        <div className="rounded-lg bg-bg-main p-6 shadow-md">
          {loading && <p className="text-text-alternative">Loading available times...</p>}

          {!loading && loadError && <p className="text-red-700">{loadError}</p>}

          {!loading && !loadError && eventDates.length === 0 && (
            <p className="text-text-main">There are no screening times available at the moment.</p>
          )}

          {!loading && !loadError && eventDates.length > 0 && (
            <>
              <label htmlFor="booking-date" className="block font-semibold text-text-main">
                Date
              </label>
              <input
                id="booking-date"
                type="date"
                min={firstDate}
                max={lastDate}
                value={date}
                onChange={handleDateChange}
                className="mt-2 w-full rounded border border-accent px-3 py-2"
              />

              {date !== "" && slotsForDate.length === 0 && (
                <p className="mt-2 text-sm text-red-700">
                  There are no screenings on this day. Please choose another date.
                </p>
              )}

              {slotsForDate.length > 0 && (
                <fieldset className="mt-6">
                  <legend className="font-semibold text-text-main">Time</legend>
                  <div className="mt-2 grid grid-cols-3 gap-2 sm:grid-cols-4">
                    {slotsForDate.map((slot) => {
                      const isFull = !slot.is_available;
                      const isChosen = slot.id === slotId;
                      return (
                        <button
                          key={slot.id}
                          type="button"
                          disabled={isFull}
                          aria-pressed={isChosen}
                          onClick={() => setSlotId(slot.id)}
                          className={
                            "rounded px-2 py-2 text-sm " +
                            (isFull
                              ? "cursor-not-allowed bg-gray-200 text-gray-400 line-through"
                              : isChosen
                              ? "bg-primary text-white"
                              : "bg-button-main text-button-text hover:bg-accent hover:text-white")
                          }
                        >
                          {shortTime(slot.start_time)}
                        </button>
                      );
                    })}
                  </div>
                  <p className="mt-2 text-xs text-text-alternative">
                    Crossed-out times are already full.
                  </p>
                </fieldset>
              )}
            </>
          )}
        </div>
      </div>

      {/* Messages, e.g. login needed or slot just taken */}
      {message && (
        <p className="mt-6 text-right text-sm text-red-700" role="alert">
          {message}{" "}
          {needsLogin && (
            <Link to="/login" className="font-semibold underline">
              Log in
            </Link>
          )}
        </p>
      )}

      {/* Next button, bottom right like the wireframe */}
      <div className="mt-8 flex justify-end">
        <button
          type="button"
          onClick={handleNext}
          disabled={!canContinue}
          className="rounded px-5 py-2 font-semibold text-text-main disabled:cursor-not-allowed disabled:opacity-40 enabled:hover:underline"
        >
          {saving ? "Booking..." : "Next →"}
        </button>
      </div>
    </div>
  );
}
