/* This is used for the admin manage capacity page. Once the backend is done, it'll be populated with actual registration data. The limit can be changed but never deleted. */

//This has the same structure as the other tables, I did this for simplicity and such.


//All these tables share very similar code structure!! Nearly all tables are a modified version of eachother, so they aren't vastly different. I did this for simplicity!!!
export default function CapacityTable({ capacity }) {
  return (
    <div className="overflow-x-auto rounded-lg bg-bg-main">
      <table className="w-full min-w-[500px] text-left text-sm text-text-main">
        <thead className="bg-header-bg">
          <tr>
            <th className="px-3 py-3">Capacity limit</th>
            <th className="px-3 py-3">Registered</th>
            <th className="px-3 py-3">Spaces left</th>
            <th className="px-3 py-3"></th>
          </tr>
        </thead>
        <tbody>
          {capacity.map((c) => (
            <tr key={c.id} className="border-t border-accent/20">
              <td className="px-3 py-3">{c.limit}</td>
              <td className="px-3 py-3">{c.registered}</td>
              <td className="px-3 py-3">{c.limit - c.registered}</td>
              <td className="px-3 py-3">
                <button type="button" className="cursor-pointer rounded-full bg-button-main px-3 py-1 hover:bg-button-alternative/40">
                  Manage
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}