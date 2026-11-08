import { useNavigate } from "react-router";
{/* import { logout } from "../../services/auth"; */}


{/* const navigate = useNavigate(); */}

{/* create a async function that handles the logout, calls the logout function and then navigates the user to the homepage once the logout is successful */}

export default function DashboardHeader({ title = "Admin Dashboard", onLogout }) {
  return (
    <div className="relative w-full rounded-lg bg-bg-surface-alternative px-4 py-3 sm:px-6 sm:py-4">
    <header className="flex flex-col items-center gap-1">
      <h1 className="text-xl font-semibold text-text-main md:text-2xl">{title}</h1>

      {/* On mobile: its own row, aligned right above the title. From sm: pinned top-right */}
      <button
        type="button"
        onClick={onLogout}
        className="bg-button-main order-first self-end rounded-full px-3 py-1 text-sm font-medium text-text-main transition-colors hover:bg-button-alternative/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary sm:absolute sm:right-4 sm:top-3 sm:order-0 cursor-pointer"
      >
        Logout →
      </button>
    </header>
    </div>
  );
}

export function ManageBookingsHeader({ title = "Admin: Manage Bookings", onLogout }) {
  return (
    <div className="relative w-full rounded-lg bg-bg-surface-alternative px-4 py-3 sm:px-6 sm:py-4">
    <header className="flex flex-col items-center gap-1">
      <h1 className="text-xl font-semibold text-text-main md:text-2xl">{title}</h1>

      {/* On mobile: its own row, aligned right above the title. From sm: pinned top-right */}
      <button
        type="button"
        onClick={onLogout}
        className="bg-button-main order-first self-end rounded-full px-3 py-1 text-sm font-medium text-text-main transition-colors hover:bg-button-alternative/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary sm:absolute sm:right-4 sm:top-3 sm:order-0 cursor-pointer"
      >
        Logout →
      </button>
    </header>
    </div>
  );
}