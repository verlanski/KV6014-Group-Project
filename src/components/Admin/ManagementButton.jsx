import { Link } from "react-router";
{/* This needs back end for see all bookings and manage bookings. For now, it will just link to the same page. Later it will validate user authentication and if returns 200 it will navigate the user to the homepage */}
export default function ManagementButton({ label, to }) {
  return (
    <Link
      to={to}
      className="block rounded-full bg-button-main px-4 py-2 text-center text-sm text-text-main shadow-sm transition hover:-translate-y-0.5 hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
    >
      {label} →
    </Link>
  );
}