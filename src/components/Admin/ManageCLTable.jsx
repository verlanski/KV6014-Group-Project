/* This is used for the admin manage community leaders page. Once all the backend is done, it'll be populated with actual community leader data. */

//Takes an array of community leaders and displays them inside this table here :D W table.
export default function CLTable({ communityLeaders }) {
  return (
    <div className="overflow-x-auto rounded-lg bg-bg-main">
      <table className="w-full min-w-[700px] text-left text-sm text-text-main">
        <thead className="bg-header-bg">
          <tr>
            <th className="px-3 py-3">Name</th>
            <th className="px-3 py-3">Email</th>
            <th className="px-3 py-3">Phone number</th>
            <th className="px-3 py-3">Location</th>
            <th className="px-3 py-3"></th>
            <th className="px-3 py-3"></th>
          </tr>
        </thead>
        <tbody>
          {/* This loops over the community leaders array and makes one row per community leader ("cl" is the current community leader) */}
          {communityLeaders.map((cl) => (
            //A key is required here by React so it can track each row properly. The id is unique per community leader.
            <tr key={cl.id} className="border-t border-accent/20">
              {/* Each cell shows one field from the community leader object */}
              <td className="px-3 py-3">{cl.name}</td>
              <td className="px-3 py-3">{cl.email}</td>
              <td className="px-3 py-3">{cl.phone}</td>
              <td className="px-3 py-3">{cl.location}</td>
              <td className="px-3 py-3">
                <button type="button" className="cursor-pointer rounded-full bg-button-main px-3 py-1 hover:bg-button-alternative/40">
                  Email
                </button>
              </td>
              <td className="px-3 py-3">
                <button type="button" className="cursor-pointer rounded-full bg-red-600 px-3 py-1 text-white hover:bg-red-700">
                  Flag
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}