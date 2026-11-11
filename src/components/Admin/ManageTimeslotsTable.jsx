/* This is used for the admin manage time slots page. Once the backend is done, it'll be populated with actual time slot data etc*/

export default function TimeslotsTable({ timeslots }) {
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
              <td className="px-3 py-3">{t.time}</td>
              <td className="px-3 py-3">{t.status}</td>
              <td className="px-3 py-3">
                <button type="button" className="cursor-pointer rounded-full bg-button-main px-3 py-1 hover:bg-button-alternative/40">
                  Manage
                </button>
              </td>
              <td className="px-3 py-3">
                <button type="button" className="cursor-pointer rounded-full bg-primary px-3 py-1 text-white hover:opacity-85">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}