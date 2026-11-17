//This page is for the admins! So this uses a function called AdminManageCLPage, all it does it set out informaiton in a nice little chart table thing
//It requires an array / data set thing in order to work correctly, so for now it just uses place holder data. 
//But later on, it will use data from the back end from supabase.

import { useNavigate } from "react-router";
import { ManageCommunityLeadersHeader } from "../components/Admin/DashboardHeader";
import CLTable from "../components/Admin/ManageCLTable";

//This is just a placeholder for now, when it comes to back end work, this wont be of use i dont think. Later itll take actual arrays etc
const communityLeaders = [
  { id: 1, name: "Test Leader Placeholder", email: "leader1@example.com", phone: "1234 24560", location: "Place 1" },
  { id: 2, name: "Test Leader Placeholder2", email: "leader2@example.com", phone: "12334 245620", location: "Place 2" },
  { id: 3, name: "Test Leader Placeholder3", email: "leader3@example.com", phone: "1234 24560", location: "Place 3" }
];

//Once again, uses the same layout as the others.
export default function AdminManageCommunityLeadersPage() {
  const navigate = useNavigate();

  return (
    <div className="bg-bg-surface-alternative px-4 py-6 sm:px-6 md:px-10 md:py-10">
      <div className="mx-auto flex w-full max-w-screen-2xl flex-col gap-6">
        <ManageCommunityLeadersHeader onBack={() => navigate("/admin")} />
        <CLTable communityLeaders={communityLeaders} />
      </div>
    </div>
  );
}