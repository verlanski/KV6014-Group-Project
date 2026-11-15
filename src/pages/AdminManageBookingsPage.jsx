//This page is for the admins! So this uses a function called AdminManageBookingsPage, all it does it set out informaiton in a nice little chart table thing
//It loads the real bookings from the backend (GET /api/admin/appointments) and passes them to the table.

import { useEffect, useState } from "react";
import { ManageBookingsHeader } from "../components/Admin/DashboardHeader";
import BookingsTable from "../components/Admin/ManageBookingsTable";
import { getAllAppointments } from "../services/adminApi";

export default function AdminManageBookingsPage() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        // The login page saves the bearer token here after an admin logs in. Needed this for testing.
        const token = localStorage.getItem("access_token");
        if (!token) {
          setError("Please log in as an admin to view bookings.");
          return;
        }

        const data = await getAllAppointments(token);
        setBookings(data);
      } catch (err) {
        console.error("Error fetching bookings:", err);
        setError("Couldn't load bookings. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  return (
    <div className="bg-bg-surface-alternative px-4 py-6 sm:px-6 md:px-10 md:py-10">
      <div className="mx-auto flex w-full max-w-screen-2xl flex-col gap-6">
        <ManageBookingsHeader />
        {loading && <p>Loading bookings...</p>}
        {error && <p className="text-red-600">{error}</p>}
        {!loading && !error && <BookingsTable bookings={bookings} />}
      </div>
    </div>
  );
}
