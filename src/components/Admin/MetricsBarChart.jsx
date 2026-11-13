import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

//hard coded data array. This cannot be done dynamically / properly. We'd need a bunch of qr code stuff, promotion stuff yada yada.
const data = [
  { Month: "Jan | 2026", Promotions_Seen: 40, Attended: 32 },
  { Month: "Feb | 2026", Promotions_Seen: 55, Attended: 48 },
  { Month: "Mar | 2026", Promotions_Seen: 70, Attended: 61 },
  { Month: "Apr | 2026", Promotions_Seen: 62, Attended: 50 },
];

export default function BookingsChart() {
  return (
    <div className="min-w-0 w-full rounded-2xl bg-white p-4 shadow-sm">
      <ResponsiveContainer width="100%" height={370}>
        <BarChart data={data} barSize={24} barGap={4} barCategoryGap="20%">
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="Month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="Promotions_Seen" fill="#8884d8" />
          <Bar dataKey="Attended" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}