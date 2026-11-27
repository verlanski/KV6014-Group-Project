import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

//hard coded data array. This cannot be done dynamically / properly. We'd need a bunch of qr code stuff, promotion stuff yada yada.


// Let's make it so that the variables are just the promoter and how many promotions they have had so far,
// If their promotion has ended we will remove from the database, ie if the promotion runs on a certain date.


//Implementation
//We will generate QR codes that will be unique to each promotion, this QR code will direct them to redirection site
//That directs the users to the main site. Every time that redirection site is hit, we will increment the counter for that promotion. 
// This way we can track how many people have seen the promotion and how many have attended the event.
// We will try implement one increment per device so that people can't "Farm" the system.
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