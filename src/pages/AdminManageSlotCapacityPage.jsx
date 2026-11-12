import { ManageSlotCapacityHeader } from "../components/Admin/DashboardHeader";
import CapacityTable from "../components/Admin/ManageSlotCapacityTable";

//Placeholder for now. Later this will take actual data from the backend. But as for right now it uses dummy data :)
const capacity = [
  { id: 1, registered: 28, limit: 60 }
];

//Calls the function that renders the admin manage capacity page. This is where the admin can change the total number of people who can register for the event.
export default function AdminManageSlotCapacity() {
  return (
    <div className="bg-bg-surface-alternative px-4 py-6 sm:px-6 md:px-10 md:py-10">
      <div className="mx-auto flex w-full max-w-screen-2xl flex-col gap-6">
        <ManageSlotCapacityHeader />
        <CapacityTable capacity={capacity} />
      </div>
    </div>
  );
}