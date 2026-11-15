import { useEffect, useState } from "react";
import { ManageTimeslotsHeader } from "../components/Admin/DashboardHeader";
import TimeslotsTable from "../components/Admin/ManageTimeslotsTable";
import { getAllSlots } from "../services/adminApi";

//Loads the real time slots from the backend (GET /api/admin/slots).

//Calls the function that renders the admin manage time slots page. This is where the admin can manage the time slots for bookings.
export default function AdminManageTimeslots() {
  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSlots = async () => {
      try {
        // The login page saves the bearer token here after an admin logs in.
        const token = localStorage.getItem("access_token");
        if (!token) {
          setError("Please log in as an admin to view time slots.");
          return;
        }

        const data = await getAllSlots(token);
        setSlots(data);
      } catch (err) {
        console.error("Error fetching slots:", err);
        setError("Couldn't load time slots. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchSlots();
  }, []);

  //This removes the slot from the state after it has been deleted from the backend. This is to make sure the page updates without needing to refresh.
  function removeSlotFromState(slotId) {
    setSlots((prevSlots) => prevSlots.filter((slot) => slot.id !== slotId));
  }

  return (
    <div className="bg-bg-surface-alternative px-4 py-6 sm:px-6 md:px-10 md:py-10">
      <div className="mx-auto flex w-full max-w-screen-2xl flex-col gap-6">
        <ManageTimeslotsHeader  />
        {loading && <p>Loading time slots...</p>}
        {error && <p className="text-red-600">{error}</p>}
        {!loading && !error && <TimeslotsTable 
        timeslots={slots} 
        onDelete={removeSlotFromState} /> }
      </div>
    </div>
  );
}