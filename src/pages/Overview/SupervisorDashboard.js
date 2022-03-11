import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
  Tooltip,
  BarChart,
  Bar,
} from "recharts";
import { Chart } from "react-charts";
import Badge from "@mui/material/Badge";
import LargeCard from "../../components/cards/LargeCard";
import TopCards from "../../components/cards/TopCards";
import Header from "../../components/header/Header";
import Sidebar from "../../components/sidebar/Sidebar";
import { API_BASE } from "../../utils/Api";
import { useHistory } from "react-router-dom";
import LargeProjectsCard from "../../components/cards/LargeProjectCard";
import LargeReportsCard from "../../components/cards/LargeReportsCard";
import LargeMessagesCard from "../../components/cards/LargeMessagesCard";
import NewCardSmall from "../../components/cards/NewCardSmall";
import HomeTableCard from "../../components/cards/HomeTableCard";
import HomeTableCard2 from "../../components/cards/HomeTableCard2";

import BlueBG from "../../assets/bg/bluesquare.svg";
import GreenBG from "../../assets/bg/greensquare.svg";
import OrangeBG from "../../assets/bg/orangesquare.svg";
import RedBG from "../../assets/bg/redsquare.svg";
import YellowBG from "../../assets/bg/yellowsquare.svg";
import SplineChart from "../../components/charts/SplineChart";
import axios from "axios";

function AdhocCitizenDashboard() {
  const initialSearchTerms = {
    state_id: "",
    lga_id: "",
    project_id: "",
    status: "",
  };
  const history = useHistory();
  const [user, setUser] = React.useState({});
  const [users, setUsers] = React.useState([]);
  const [projects, setProjects] = React.useState([]);
  const [reports, setReports] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [open, setOpen] = React.useState(false);
  const [reportsData, setReportsData] = React.useState([]);
  const title = "Overview";

  const getReports = async () => {
    const response = await fetch(`${API_BASE}/supervisor/reports`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    const result = await response.json();
    result && setReports(result);
    result &&
      result.data &&
      result.data.data &&
      setReportsData(result.data.data);
    // result && setTotalPages(result.data.last_page);
    // result && setCountPerPage(result.data.per_page);
    setLoading(false);
    console.log("Reports", result);
  };

  const getUser = async () => {
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
      //alert(localStorage.getItem("user"));
      result && setUser(result.data);
      // result && alert(result.data);
      // console.log("User:", result);
    } catch (error) {
      console.log(error);
    }
  };

  const getUsers = async () => {
    const response = await fetch(`${API_BASE}/users`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    const result = await response.json();
    console.log("Users Res", response);
    result && setUsers(result.data.data);
    setLoading(false);
    console.log("Users", result);
  };

  const getProjects = async () => {
    const response = await fetch(`${API_BASE}/projects`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    const result = await response.json();
    setLoading(false);
    result && setProjects(result.data);
    console.log("Projects", result);
  };

  React.useEffect(() => {
    // localStorage.removeItem("user");
    // localStorage.removeItem("token");
    // localStorage.removeItem("roles");
    // localStorage.removeItem("platform");
    // history.push("/");
    getProjects();
    getReports();
    getUsers();
    getUser();
    // if (JSON.parse(localStorage.getItem("roles"))[0] == "Ad-hoc") {
    //   alert("You dont have access");
    //   localStorage.removeItem("user");
    //   localStorage.removeItem("token");
    //   localStorage.removeItem("roles");
    //   history.push("/");
    // }
  }, []);

  React.useEffect(() => {
    //alert(JSON.stringify(user));
  }, [user]);

  const infos = [
    {
      title: "Total Reports",
      color: "rgb(17 76 168)",
      image: BlueBG,
      data: reports && reports.report_meta && reports.report_meta.Total,
    },
    {
      title: "Approved",
      color: "#035C36",
      image: GreenBG,
      data: reports && reports.report_meta && reports.report_meta.Approved,
    },
    {
      title: "Pending",
      color: "rgb(209 148 35)",
      image: OrangeBG,
      data: reports && reports.report_meta && reports.report_meta.Pending,
    },

    {
      title: "Disapproved",
      color: "#0D0709",
      image: RedBG,
      data: reports && reports.report_meta && reports.report_meta.Rejected,
    },
    {
      title: "Queried",
      color: "#DD411A",
      image: YellowBG,
      data: reports && reports.report_meta && reports.report_meta.Queried,
    },
  ];

  const CustomTooltip = () => {
    return (
      <div className="custom-tooltip">
        <p className="label">Users Per Project</p>
      </div>
    );
  };
  const CustomTooltip2 = () => {
    return (
      <div className="custom-tooltip">
        <p className="label">Reports Per Project</p>
      </div>
    );
  };

  const CustomizedLabel = () => {
    return (
      <>
        <p>Users</p>
      </>
    );
  };

  const CustomLabel = () => {
    return (
      <g>
        <foreignObject x={0} y={0} width={100} height={100}>
          <div>Label</div>
        </foreignObject>
      </g>
    );
  };

  return (
    <div>
      <div className="flex flex-row">
        <div className="dashboard-left">
          <Sidebar />
        </div>

        <div style={{ overflow: "scroll" }} className="dashboard-right">
          <Header
            user={user}
            title={title + " ( " + localStorage.getItem("platform") + " )"}
          />
          <hr />
          <div className="dashboard-wrapper">
            <div className="ml-2 my-1 flex grid lg:grid-cols-6 md:grid-cols-3 sm:grid-cols-2 xs:grid-cols-2 gap-1 justify-items-center items-center">
              {reports &&
                reports.data &&
                reports.report_meta &&
                infos.map((info) => <TopCards info={info} />)}
            </div>
            {/* <br /> */}
            <div className="my-4">
              <SplineChart />
            </div>

            {/* <p>Coming soon ...</p> */}

            {/* <div className="home-card shadow-md">
              <HomeTableCard data={reports} />
            </div>
            <div className="home-card shadow-md">
              <HomeTableCard2 data={reports} />
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdhocCitizenDashboard;
