import { ManageBookingsHeader } from "../components/Admin/DashboardHeader";
import BookingsTable from "../components/Admin/ManageBookingsTable";

//This is just a placeholder for now, when it comes to back end work, this wont be of use i dont think. Later itll take actual arrays etc
const bookings = [
  { id: 1, name: "Test Dummy Placeholder", email: "dummy@example.com", phone: "1234 24560", time: "09:00", date: "12/02/2026" },
  { id: 2, name: "Test Dummy Placeholder2", email: "dummy2@example.com", phone: "12334 245620", time: "19:00", date: "12/09/2026" },
  { id: 3, name: "Test Dummy Placeholder3", email: "dummy3@example.com", phone: "1234 24560", time: "13:00", date: "12/05/2026" }
];

export default function AdminManageBookingsPage() {
  return (
    <div className="bg-bg-surface-alternative px-4 py-6 sm:px-6 md:px-10 md:py-10">
      <div className="mx-auto flex w-full max-w-screen-2xl flex-col gap-6">
        <ManageBookingsHeader />
        <BookingsTable bookings={bookings} />
      </div>
    </div>
  );
}
