import { ManageTimeslotsHeader } from "../components/Admin/DashboardHeader";
import TimeslotsTable from "../components/Admin/ManageTimeslotsTable";

//Placeholder for now, 9AM to 5PM. Later this will take actual data from the backend. But as for right now it uses dummy data :)
const timeslots = [
  { id: 1, time: "09:00", status: "Open" },
  { id: 2, time: "10:00", status: "Open" },
  { id: 3, time: "11:00", status: "Open" },
  { id: 4, time: "12:00", status: "Open" },
  { id: 5, time: "13:00", status: "Open" },
  { id: 6, time: "14:00", status: "Open" },
  { id: 7, time: "15:00", status: "Open" },
  { id: 8, time: "16:00", status: "Open" }
];

//Calls the function that renders the admin manage time slots page. This is where the admin can manage the time slots for bookings.
export default function AdminManageTimeslots() {
  return (
    <div className="bg-bg-surface-alternative px-4 py-6 sm:px-6 md:px-10 md:py-10">
      <div className="mx-auto flex w-full max-w-screen-2xl flex-col gap-6">
        <ManageTimeslotsHeader  />
        <TimeslotsTable timeslots={timeslots} />
      </div>
    </div>
  );
}