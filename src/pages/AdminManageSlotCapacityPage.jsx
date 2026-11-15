import { ManageSlotCapacityHeader } from "../components/Admin/DashboardHeader";
import CapacityTable from "../components/Admin/ManageSlotCapacityTable";
import { useEffect, useState } from "react";
import { getAllSlots } from "../services/adminApi";

//Placeholder for now. Later this will take actual data from the backend. But as for right now it uses dummy data :)
const capacity = [
  { id: 1, registered: 28, limit: 60 }
];

//Calls the function that renders the admin manage capacity page. This is where the admin can change the total number of people who can register for the event.
export default function AdminManageSlotCapacity() {

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

  // Work out how many slots there are, how many are available and how many are booked
  const totalSlots = slots.length;
  const bookedSlots = slots.filter(slot => !slot.is_available).length;
  const availableSlots = slots.filter(slot => slot.is_available).length;

  const capacityData = [
    { id: 1, registered: bookedSlots, limit: totalSlots }
  ];

  return (
    <div className="bg-bg-surface-alternative px-4 py-6 sm:px-6 md:px-10 md:py-10">
      <div className="mx-auto flex w-full max-w-screen-2xl flex-col gap-6">
        <ManageSlotCapacityHeader />
        <CapacityTable capacity={capacityData} />
      </div>
    </div>
  );
}