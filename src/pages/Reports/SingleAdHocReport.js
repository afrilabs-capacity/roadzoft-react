import React from "react";
import LargeCard from "../../components/cards/LargeCard";
import TopCards from "../../components/cards/TopCards";
import Header from "../../components/header/Header";
import Sidebar from "../../components/sidebar/Sidebar";
import * as Icon from "@mui/icons-material";
import * as Item from "@mui/material";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Box from "@mui/material/Box";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import TimePicker from "@mui/lab/TimePicker";
import DateTimePicker from "@mui/lab/DateTimePicker";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import MobileDatePicker from "@mui/lab/MobileDatePicker";
import { API_BASE } from "../../utils/Api";
import { useParams } from "react-router-dom";
import ProjectTable from "../../components/tables/ProjectTable";
import ReportModal from "../../components/modals/ReportModal";
import { useAlert } from "react-alert";

const Input = styled("input")({
  display: "none",
});

function SingleAdHocReport() {
  const params = useParams();
  const [user, setUser] = React.useState({});
  const [userReport, setUserReports] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [realUser, setRealUser] = React.useState([]);

  const alertMe = useAlert();

  //Get user reports
  const getUserReport = async () => {
    try {
       

      const reportId = params.uuid;
      const response = await fetch(
        `${API_BASE}/report/${reportId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const result = await response.json();
      result && result.data && setUserReports(result.data);
    } catch (error) {
      console.log(error);
    }
  };
  //header user
  const title = "USER DETAILS";

//   Get single user
  const getUser = async () => {
    const userId = userReport.user_id;
    try {
      const response = await fetch(`${API_BASE}/user/${userId}`, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const result = await response.json();

      result && result.data && setUser(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  //Get single user
  const getRealUser = async () => {
    try {
      const response = await fetch(
        `${API_BASE}/user/${localStorage.getItem("user")}`,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const result = await response.json();

      result && setRealUser(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    getUserReport();
    getRealUser();
  }, []);

  React.useEffect(() => {
     userReport.id && getUser();
  }, [userReport]);

  return (
    <div>
      <div className="flex flex-row justify-center">
        <div className="dashboard-left">
          <Sidebar />
        </div>

        <div className="dashboard-right">
          <Header user={realUser} title={""} />
          <hr />

          <div className="grid grid-cols-2 gap-4 p-2 bg-white content-center pt-8 m-4">
            {userReport && user && (
              <>
                {/* <div className="my-2 p-2 text-center">
                  <h2 className="text-xl font-bold">Name of Supervisor</h2>
                  <p>{user.name}</p>
                </div> */}

               

                <div className="my-2 p-2 text-center">
                  <h3 className="text-xl font-bold">FERMA staff on-site ?</h3>
                  <p>{userReport.sos ? userReport.sos ? "Yes" : "No" : "N/A"}</p>
                </div>

                <div className="my-2 p-2 text-center">
                  <h3 className="text-xl font-bold">
                    Name of FERMA staff onsite ?
                  </h3>
                  <p>{userReport.nfsos ? userReport.nfsos : "N/A"}</p>
                </div>

                <div className="my-2 p-2 text-center">
                  <h3 className="text-xl font-bold">
                    Number of workers do you have on site
                  </h3>
                  <p>{userReport.nwos ? userReport.nwos ?  userReport.nwos : "N/A" : "N/A"}</p>
                </div>

                <div className="my-2 p-2 text-center">
                  <h3 className="text-xl font-bold">
                    Nature of work is being carried out
                  </h3>
                  <p>{userReport.now ?  userReport.now  : "N/A"}</p>
                </div>

                <div className="my-2 p-2 text-center">
                  <h3 className="text-xl font-bold">
                    Quality of work carried out
                  </h3>
                  <p>{userReport.rating ? userReport.rating  : "N/A"}</p>
                </div>

                <div className="my-2 p-2 text-center">
                  <h3 className="text-xl font-bold">
                    Number of active workers
                  </h3>
                  <p>{userReport.npw ? userReport.npw : "N/A"}</p>
                </div>

                <div className="my-2 p-2 text-center">
                  <h3 className="text-xl font-bold">Good team work</h3>
                  <p>{userReport.gtw ? userReport.gtw ?  "Yes" : "No" : "N/A"}</p>
                </div>

                <div className="my-2 p-2 text-center">
                  <h3 className="text-xl font-bold">
                    Adequate equipment provision
                  </h3>
                  <p>{userReport.eqw ? userReport.eqw  ?  "Yes" : "No" : "N/A"}</p>
                </div>

                <div className="my-2 p-2 text-center">
                  <h3 className="text-xl font-bold">
                    How was work being guided and divided among team members?
                  </h3>
                  <p>{userReport.wgatm ? userReport.wgatm : "N/A"}</p>
                </div>

                <div className="my-2 p-2 text-center">
                  <h3 className="text-xl font-bold">
                    Overall review of activities of the day
                  </h3>
                  <p>{userReport.review ? userReport.review : "N/A"}</p>
                </div>

                 <div className="my-2 p-2 text-center">
                  <h3 className="text-xl font-bold">Submitted</h3>
                  <p>{userReport.posted}</p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SingleAdHocReport;
