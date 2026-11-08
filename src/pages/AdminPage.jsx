
import DashboardHeader from "../components/Admin/DashboardHeader";
import ManagementButton from "../components/Admin/ManagementButton";
import MetricsBarChart from "../components/Admin/MetricsBarChart";

export default function AdminPage() {
  return (
    
    <div className="bg-bg-surface-alternative px-4 py-6 sm:px-6 md:px-10 md:py-10">
      
      <div className="mx-auto flex w-full max-w-screen-2xl flex-col gap-6">
        <DashboardHeader />

        {/* Registration will go here once backend dev has started on it */}
        <p className="text-center text-lg text-gray-600">28/60 registrations</p>

        {/* Row of three buttons: stacked on mobile, using grid from sm ---This has been commented out as we don't need it right now. But is being left in for now.
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">
          <ManagementButton label="Manage bookings" to="/admin/manage-bookings" />
        </div>
        */}

        {/* Buttons on the left, chart on the right */}
        <div className="grid gap-6 md:grid-cols-3">
          <div className="grid grid-cols-1 content-start gap-20">
            <ManagementButton label="Manage bookings" to="/admin/manage-bookings" />
            <ManagementButton label="Manage time slots" to="/admin/time-slots" />
            <ManagementButton label="Manage slot capacity" to="/admin/slot-capacity" />
          </div>

          <div className="md:col-span-2">
            <MetricsBarChart />
          </div>
        </div>
      </div>
    </div>
  );
}
