
import DashboardHeader from "../components/Admin/DashboardHeader";
import ManagementButton from "../components/Admin/ManagementButton";
import ManagementCard from "../components/Admin/ManagementCard";

export default function AdminPage() {
  return (
    
    <div className="bg-bg-surface-alternative px-4 py-6 sm:px-6 md:px-10 md:py-10">
      
      <div className="mx-auto flex w-full max-w-screen-2xl flex-col gap-6">
        <DashboardHeader />

        {/* Registration will go here once backend dev has started on it */}
        <p className="text-center text-lg text-gray-600">28/60 registrations</p>

        {/* Row of three buttons: stacked on mobile, using grid from sm */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">
          <ManagementButton label="Manage bookings" to="/admin/manage-bookings" />
        </div>

        {/* Cards on the left, chart on the right */}
        <div className="grid gap-6 md:grid-cols-3">
          {/* Cards sit side by side on mobile, stacked on desktop using md*/}
          <div className="grid grid-cols-2 gap-4 md:grid-cols-1 md:gap-6">
            <ManagementCard title="Manage time slots" to="/admin/time-slots" />
            <ManagementCard title="Manage slot capacity" to="/admin/slot-capacity" />
          </div>

          {/* Analytics chart goes here */}
          <div className="md:col-span-2">{/* <AnalyticsChart /> */}</div>
        </div>
      </div>
    </div>
  );
}
