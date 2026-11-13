import { Link } from "react-router";

export default function ManagementCard({ title, to }) {
  return (
    <Link
      to={to}
      className="flex min-h-20 items-center justify-center rounded-2xl bg-button-main p-6 text-center text-text-main shadow-sm transition hover:-translate-y-0.5 hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
    >
      {title}
    </Link>
  );
}