/* This is used for the admin manage bookings page. It's populated with real booking data from the backend. */

//Takes an array of bookings and displays them inside this table here :D W table.

//All these tables share very similar code structure!! Nearly all tables are a modified version of eachother, so they aren't vastly different. I did this for simplicity!!!

export default function BookingsTable({ bookings }) {
  return (
    <div className="overflow-x-auto rounded-lg bg-bg-main">
      <table className="w-full min-w-[700px] text-left text-sm text-text-main">
        <thead className="bg-header-bg">
          <tr>
            <th className="px-3 py-3">Name</th>
            <th className="px-3 py-3">Email</th>
            <th className="px-3 py-3">Phone number</th>
            <th className="px-3 py-3">Booking time</th>
            <th className="px-3 py-3">Date</th>
            <th className="px-3 py-3"></th>
            <th className="px-3 py-3"></th>
          </tr>
        </thead>
        <tbody>
          {/* This loops over the bookings array and makes one row per booking ("b" is the current booking) */}
          {bookings.map((b) => (
            <tr key={b.id} className="border-t border-accent/20">
              {/* Each cell shows one field from the booking object */}
              <td className="px-3 py-3">{b.patient_name ?? "-"}</td>
              <td className="px-3 py-3">{b.patient_email ?? "-"}</td>
              <td className="px-3 py-3">{b.patient_phone ?? "-"}</td>
              <td className="px-3 py-3">{b.appointment_time?.slice(0, 5)}</td>
              <td className="px-3 py-3">{b.appointment_date?.split("-").reverse().join("/")}</td>
              <td className="px-3 py-3">
                <button type="button" className="cursor-pointer rounded-full bg-button-main px-3 py-1 hover:bg-button-alternative/40">
                  Manage
                </button>
              </td>
              <td className="px-3 py-3">
                <button type="button" className="bg-button-danger">
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