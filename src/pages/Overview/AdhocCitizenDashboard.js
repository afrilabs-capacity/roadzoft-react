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

function AdhocCitizenDashboard() {
  const history = useHistory();
  const [user, setUser] = React.useState({});
  const [users, setUsers] = React.useState([]);
  const [projects, setProjects] = React.useState([]);
  const [reports, setReports] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [open, setOpen] = React.useState(false);
  const title = "Overview";

  const getReports = async () => {
    const response = await fetch(`${API_BASE}/reports`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "X-RGM-PLATFORM": localStorage.getItem("platform"),
      },
    });
    const result = await response.json();
    result && setReports(result.data.data);
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
      //const data = result.data;
      result.data && setUser(result.data);
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
    if (JSON.parse(localStorage.getItem("roles"))[0].name == "Ad-hoc") {
      alert("You dont have access");
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      localStorage.removeItem("roles");
      history.push("/");
    }
  }, []);

  const reportData = [
    {
      title: "Total Reports",
      color: "rgb(17 76 168)",
      image: BlueBG,
      data: reports.length,
    },
    {
      title: "Approved",
      color: "#035C36",
      image: GreenBG,
      data: reports.filter((report) => report.status === "Approved").length,
    },
    {
      title: "Pending",
      color: "rgb(209 148 35)",
      image: OrangeBG,
      data: reports.filter((report) => report.status === "Pending").length,
    },

    {
      title: "Disapproved",
      color: "#0D0709",
      image: RedBG,
      data: reports.filter((report) => report.status === "Rejected").length,
    },
    {
      title: "Queried",
      color: "#DD411A",
      image: YellowBG,
      data: reports.filter((report) => report.status === "Queried").length,
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
              {/* <div
                className="flex flex-col justify-center items-center shadow-md"
                style={{
                  width: 180,
                  height: 180,
                  background: "#043C2D",
                  margin: 10,
                  borderRadius: "20px",
                }}
              >
                <div className="report-item flex flex-row justify-center items-center text-white">
                  <Badge variant="dot" color="error">
                    <h2 className="text-4xl mr-3">15</h2>
                  </Badge>
                  <span>New Reports</span>
                </div>
                <div
                  style={{ color: "#49BF78" }}
                  className="report-item flex flex-row justify-center items-center text-white"
                >
                  <h4 className="text-xl mr-2">7</h4>
                  <span className="text-sm">Citizen Reports</span>
                </div>
                <div
                  style={{ color: "#CEFF68" }}
                  className="report-item flex flex-row justify-center items-center text-white"
                >
                  <h4 className="text-xl mr-2">8</h4>
                  <span className="text-sm">Inspection Reports</span>
                </div>
              </div> */}
              {reportData.map((report) => (
                <TopCards info={report} />
              ))}
            </div>

            {/*
          {localStorage.getItem("roles") == "Super Admin" && (
            <div className="flex flex-col justify-center items-center ">
              <div
                style={{}}
                className="chart-wrapper bg-white shadow-sm rounded-sm my-5 mx-5"
              >
               
                <div>
                  <h5 className="text-center my-1 text-xl text-gray-700">
                    Users per Project
                  </h5>
                  <ResponsiveContainer width={500} height={300}>
                    <LineChart
                      stroke="#8884d8"
                      width={500}
                      height={300}
                      data={projects}
                      margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="title" stroke="#8884d8" />

                      <YAxis stroke="#8884d8" />
                      <Tooltip content={<CustomTooltip />} />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="users.length"
                        name="Users"
                        stroke="#2c4c2c"
                        activeDot={{ r: 8 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <div>
                  <h5 className="text-center my-1 text-xl text-gray-700">
                    Reports per Project
                  </h5>
                  <ResponsiveContainer width={500} height={300}>
                    <BarChart width={500} height={300} data={projects}>
                      <XAxis dataKey="title" stroke="#8884d8" />
                      <YAxis />
                      <Tooltip content={<CustomTooltip2 />} />
                      <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                      <Bar
                        dataKey="users[0].reports.length"
                        fill="#2c4c2c"
                        barSize={30}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          )}  */}
            {/* <div className="home-card shadow-md">
              <HomeTableCard data={reports} />
            </div> */}
            <div className="my-4">
              <SplineChart />
            </div>
            {JSON.parse(localStorage.getItem("roles"))[0].name !==
              "Supervisor" && (
              <div className="home-card shadow-md">
                <HomeTableCard2 data={reports} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdhocCitizenDashboard;
