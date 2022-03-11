import React from "react";

import AdhocCitizenDashboard from "../pages/Overview/AdhocCitizenDashboard";
import SupervisorDashboard from "../pages/Overview/SupervisorDashboard";

function Dashboard() {
  return localStorage.getItem("platform") == "Ad-hoc" ||
    localStorage.getItem("platform") == "Citizen" ? (
    <AdhocCitizenDashboard />
  ) : (
    <SupervisorDashboard />
  );
}

export default Dashboard;
