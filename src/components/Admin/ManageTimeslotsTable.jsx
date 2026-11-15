/* This is used for the admin manage time slots page. Once the backend is done, it'll be populated with actual time slot data etc*/

//All these tables share very similar code structure!! Nearly all tables are a modified version of eachother, so they aren't vastly different. I did this for simplicity!!!
export default function TimeslotsTable({ timeslots, onDelete}) {
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

  async function handleDelete(slotId) {
    const token = localStorage.getItem("access_token");
    //This is to make sure the admin doesn't accidentally delete a time slot. It is a confirmation prompt.
    if (!window.confirm("Delete this time slot?")) return;

    if (!token) {
      alert("Please log in as an admin to delete time slots.");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/api/admin/slots/${slotId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to delete the time slot.");
      }
      onDelete(slotId);
    } catch (error) {
      console.error("Error deleting time slot:", error);
      alert("Failed to delete the time slot. Please try again.");
    }
  }

  return (
    <div className="overflow-x-auto rounded-lg bg-bg-main">
      <table className="w-full min-w-[500px] text-left text-sm text-text-main">
        <thead className="bg-header-bg">
          <tr>
            <th className="px-3 py-3">Time slot</th>
            <th className="px-3 py-3">Status</th>
            <th className="px-3 py-3"></th>
            <th className="px-3 py-3"></th>
          </tr>
        </thead>
        <tbody>
          {timeslots.map((t) => (
            <tr key={t.id} className="border-t border-accent/20">
              {/* Database times look like "09:00:00", so only show "09:00" */}
              <td className="px-3 py-3">
                {t.slot_date} {t.start_time?.slice(0, 5)} - {t.end_time?.slice(0, 5)}
              </td>
              <td className="px-3 py-3">{t.is_available ? "Open" : "Booked"}</td>
              <td className="px-3 py-3">
                {!t.is_available && (
                  <button type="button" className="cursor-pointer rounded-full bg-button-main px-3 py-1 hover:bg-button-alternative/40">
                    Manage
                  </button>
                )}
              </td>
              <td className="px-3 py-3">
                {t.is_available && (
                  <button type="button" className="cursor-pointer rounded-full bg-red-600 px-3 py-1 text-white hover:bg-red-600/80"
                    onClick={() => handleDelete(t.id)}
                  >
                    Delete
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}