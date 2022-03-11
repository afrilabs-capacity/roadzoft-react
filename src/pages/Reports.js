import React from "react";

import AdhocReports from "../pages/Reports/AdhocReports";
import CitizenReports from "../pages/Reports/CitizenReport";
import SupervisorReports from "../pages/Reports/SupervisorReport";

function Reports() {
  if (localStorage.getItem("platform") == "Ad-hoc") {
    return <AdhocReports />;
  } else if (localStorage.getItem("platform") == "Citizen") {
    return <CitizenReports />;
  } else if (localStorage.getItem("platform") == "Supervisor") {
    return <SupervisorReports />;
  }
}

export default Reports;
