/* This is used for the admin manage bookings page. Once all the backend is done, it'll be populated with actual booking data. */

//Takes an array of bookings and displays them inside this table here :D W table.
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
            //A key is required here by React so it can track each row properly. The id is unique per booking.
            <tr key={b.id} className="border-t border-accent/20">
              {/* Each cell shows one field from the booking object */}
              <td className="px-3 py-3">{b.name}</td>
              <td className="px-3 py-3">{b.email}</td>
              <td className="px-3 py-3">{b.phone}</td>
              <td className="px-3 py-3">{b.time}</td>
              <td className="px-3 py-3">{b.date}</td>
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