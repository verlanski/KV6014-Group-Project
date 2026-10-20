// Wireframe screen 4 - Time-Slot Booking
// The user picks a date and a time slot, then presses Next to go to
// the Booking Confirmation page (wireframe screen 5).

import { useState } from "react";
import { useNavigate } from "react-router";

// ---------------------------------------------------------------
// Dummy data for now. Later this will come from the database
// (Supabase), set by the admin on the Admin Dashboard.
// ---------------------------------------------------------------
const EVENT = {
  firstDate: "2027-09-17", // first day people can book (YYYY-MM-DD)
  lastDate: "2027-09-17",  // last day people can book
  startTime: "09:00",      // first slot of the day
  endTime: "17:30",        // event finishes at this time
  slotMinutes: 30,         // length of each appointment
};

// Slots that are already full (date + time). Also dummy data for now.
const FULL_SLOTS = ["2027-09-17 10:00", "2027-09-17 13:30"];

// Turns "09:00" into minutes after midnight (540), so we can add 30 each time.
function toMinutes(time) {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
}

// Turns minutes after midnight back into "09:00".
function toTime(totalMinutes) {
  const hours = String(Math.floor(totalMinutes / 60)).padStart(2, "0");
  const minutes = String(totalMinutes % 60).padStart(2, "0");
  return `${hours}:${minutes}`;
}

// Builds the list of slot start times, e.g. ["09:00", "09:30", ... "17:00"].
function buildSlots() {
  const slots = [];
  const end = toMinutes(EVENT.endTime);
  for (let t = toMinutes(EVENT.startTime); t + EVENT.slotMinutes <= end; t += EVENT.slotMinutes) {
    slots.push(toTime(t));
  }
  return slots;
}

export default function BookingPage() {
  const [date, setDate] = useState(""); // chosen date, e.g. "2027-09-17"
  const [time, setTime] = useState(""); // chosen time, e.g. "09:30"
  const navigate = useNavigate();

  const slots = buildSlots();

  // A date is only valid if it is inside the event dates.
  const dateIsValid = date >= EVENT.firstDate && date <= EVENT.lastDate;

  // Next only works when a valid date AND a time have been chosen.
  const canContinue = dateIsValid && time !== "";

  function handleDateChange(event) {
    setDate(event.target.value);
    setTime(""); // a new date means the old time choice no longer applies
  }

  function handleNext() {
    // Send the choice to the confirmation page.
    // NOTE: agree this route with Racheal (Booking Confirmation, screen 5).
    navigate("/booking/confirmation", { state: { date, time } });
  }

  return (
    <main className="mx-auto max-w-4xl px-4 pb-16">
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
          <label htmlFor="booking-date" className="block font-semibold text-text-main">
            Date
          </label>
          <input
            id="booking-date"
            type="date"
            min={EVENT.firstDate}
            max={EVENT.lastDate}
            value={date}
            onChange={handleDateChange}
            className="mt-2 w-full rounded border border-accent px-3 py-2"
          />
          {date !== "" && !dateIsValid && (
            <p className="mt-2 text-sm text-red-700">
              Please choose a date during the event.
            </p>
          )}

          {/* Time slots only appear once a valid date is picked */}
          {dateIsValid && (
            <fieldset className="mt-6">
              <legend className="font-semibold text-text-main">Time</legend>
              <div className="mt-2 grid grid-cols-3 gap-2 sm:grid-cols-4">
                {slots.map((slot) => {
                  const isFull = FULL_SLOTS.includes(`${date} ${slot}`);
                  const isChosen = slot === time;
                  return (
                    <button
                      key={slot}
                      type="button"
                      disabled={isFull}
                      aria-pressed={isChosen}
                      onClick={() => setTime(slot)}
                      className={
                        "rounded px-2 py-2 text-sm " +
                        (isFull
                          ? "cursor-not-allowed bg-gray-200 text-gray-400 line-through"
                          : isChosen
                          ? "bg-primary text-white"
                          : "bg-button-main text-button-text hover:bg-accent hover:text-white")
                      }
                    >
                      {slot}
                    </button>
                  );
                })}
              </div>
              <p className="mt-2 text-xs text-text-alternative">
                Crossed-out times are already full.
              </p>
            </fieldset>
          )}
        </div>
      </div>

      {/* Next button, bottom right like the wireframe */}
      <div className="mt-8 flex justify-end">
        <button
          type="button"
          onClick={handleNext}
          disabled={!canContinue}
          className="rounded px-5 py-2 font-semibold text-text-main disabled:cursor-not-allowed disabled:opacity-40 enabled:hover:underline"
        >
          Next →
        </button>
      </div>
    </main>
  );
}
