import React from "react";
import LargeCard from "../../components/cards/LargeCard";
import TopCards from "../../components/cards/TopCards";
import Header from "../../components/header/Header";
import Sidebar from "../../components/sidebar/Sidebar";
import * as Item from "@mui/material";
import Moment from "react-moment";
import ProjectTable from "../../components/tables/ProjectTable";
import PaginationComponent from "../../components/tables/Pagination";
import { API_BASE } from "../../utils/Api";
import ReportModal from "../../components/modals/ReportModal";
import SupervisorReportModal from "../../components/modals/SupervisorReportModal";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Box from "@mui/material/Box";
import Badge from "@mui/material/Badge";
import { CSVLink } from "react-csv";
import Fuse from "fuse.js";
import * as Icons from "react-feather";
import ReportQuery from "../../components/modals/ReportQuery";
import SupervisorReportQuery from "../../components/modals/SupervisorReportQuery";
import MapModal from "../../components/modals/MapModal";

import BlueBG from "../../assets/bg/bluesquare.svg";
import GreenBG from "../../assets/bg/greensquare.svg";
import OrangeBG from "../../assets/bg/orangesquare.svg";
import RedBG from "../../assets/bg/redsquare.svg";
import YellowBG from "../../assets/bg/yellowsquare.svg";
import { useHistory } from "react-router-dom";

function SupervisorReports() {
  const initialSearchTerms = {
    state_id: "",
    lga_id: "",
    project_id: "",
    status: "",
  };
  const [user, setUser] = React.useState({});
  const [reports, setReports] = React.useState([]);
  const [reportsData, setReportsData] = React.useState([]);
  const [page, setPage] = React.useState(1);
  const [totalPages, setTotalPages] = React.useState(2);
  const [countPerPage, setCountPerPage] = React.useState(10);
  const [filterTerm, setFilterTerm] = React.useState("");
  const [searchTerms, setSearchPTerms] = React.useState(initialSearchTerms);
  const [projects, setProjects] = React.useState([]);
  const [project, setProject] = React.useState("");
  const [loading, setLoading] = React.useState(true);
  const [statesList, setStatesList] = React.useState([]);
  const [lgaByStateList, setLgaByStateList] = React.useState([]);
  const [state, setUserstate] = React.useState("");
  const [lga, setLga] = React.useState("");
  const [projectId, setProjectId] = React.useState("");
  const [searchData, setSearchData] = React.useState([]);
  const [commentz, setCommentz] = React.useState([]);
  const [status, setStatus] = React.useState("");

  // @ts-ignore
  // eslint-disable-next-line import/no-webpack-loader-syntax
  //mapboxgl.workerClass = require("worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker").default;

  const history = useHistory();

  const handleChange = (event, value) => {
    setPage(value);
  };

  const handleStateChange = (event) => {
    console.log(event.target.value);
    setUserstate(event.target.value);
    setSearchPTerms((prevState) => ({
      ...prevState,
      state_id: event.target.value,
    }));
  };
  const handleProjectChange = (event) => {
    console.log(event.target.value);
    setProject(event.target.value);
    setSearchPTerms((prevState) => ({
      ...prevState,
      project_id: event.target.value,
    }));
  };
  const handleLgaChange = (event) => {
    console.log(event.target.value);
    setLga(event.target.value);
    setSearchPTerms((prevState) => ({
      ...prevState,
      lga_id: event.target.value,
    }));
  };

  const handleStatusChange = async (term) => {
    setStatus(term);
    setSearchPTerms((prevState) => ({
      ...prevState,
      status: term,
    }));
  };

  const title = "Reports";

  const getStates = async () => {
    const response = await fetch(`${API_BASE}/states`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    const result = await response.json();
    result && setStatesList(result.data);

    console.log("Users", result);
  };

  const getLgasByStateId = async () => {
    const response = await fetch(`${API_BASE}/state/${state}/lgas`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    const result = await response.json();
    result && setLgaByStateList((prevState) => (prevState = result.data));

    console.log("Users", result);
  };

  const handleApprove = async (id) => {
    const response = await fetch(
      `${API_BASE}/supervisor/report/${id}/action/0`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    const result = await response.json();
    getReports();
  };

  const handleReject = async (id) => {
    const response = await fetch(
      `${API_BASE}/supervisor/report/${id}/action/1`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    const result = await response.json();
    getReports();
  };

  const handleQuery = async (id) => {
    const response = await fetch(
      `${API_BASE}/supervisor/report/${id}/action/2`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    const result = await response.json();
    getReports();
  };

  const getReports = async () => {
    const response = await fetch(
      `${API_BASE}/supervisor/reports?${new URLSearchParams(
        searchTerms
      ).toString()}&page=${page}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    const result = await response.json();
    result && setReports(result);
    result &&
      result.data &&
      result.data.data &&
      setReportsData(result.data.data);
    result && setTotalPages(result.data.last_page);
    result && setCountPerPage(result.data.per_page);
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

      result && setUser(result.data);
      console.log("User:", result);
    } catch (error) {
      console.log(error);
    }
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

  const getComments = async (uuid) => {
    const response = await fetch(`${API_BASE}/supervisor/queried/${uuid}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    const result = await response.json();
    result && setCommentz(result.data);
    console.log("Comments", result);
  };

  const viewReport = (id) => {
    history.push(`/supervisor-report/${id}`);
  };

  React.useEffect(() => {
    getUser();
    getStates();
    getProjects();
  }, []);

  React.useEffect(() => {
    getReports();
  }, [page]);

  React.useEffect(() => {
    getLgasByStateId();
    getReports();
  }, [state]);

  React.useEffect(() => {
    getReports();
  }, [lga]);

  React.useEffect(() => {
    getReports();
  }, [project]);

  React.useEffect(() => {
    getReports();
  }, [status]);

  const data = React.useMemo(() => reportsData);

  const headers = [
    // { label: "Name of Supervisor ", key: "nos" },
    { label: "Submitted", key: "submitted" },
    { label: "Curr. geo zone", key: "geo_zone" },
    { label: "State", key: "state_name" },
    // { label: "LGA", key: "lga_name" },
    { label: "Status", key: "status" },
    // { label: "Road section covered", key: "rsc" },
    // { label: "FERMA staff on-site", key: "sos" },
    // { label: "Location", key: "location" },
    // { label: "Name of FERMA staff onsite ?", key: "nfsos" },
    // { label: "workers on site (count)", key: "nwos" },
    // { label: "Nature of work carried out ?", key: "now" },
    // { label: "Quality of work (rating)", key: "rating" },
    // { label: "Overall number of workers (count)", key: "npw" },
    // { label: "Good team work", key: "gtw" },
    // { label: "Enough equipment to work with", key: "eqw" },
    // {
    //   label: "How was work being guided and divided among team members?",
    //   key: "wgatm",
    // },
    // { label: "Est. number of vehicles seen on the road.", key: "envsor" },
    {
      label: "Overall review",
      key: "or",
    },
  ];

  //   const csvData =
  //     filterTerm == ""
  //       ? data.map((row) => ({
  //           ...row,
  //           users: JSON.stringify(row.users),
  //         }))
  //       : filterResults.map((row) => ({
  //           ...row,
  //           users: JSON.stringify(row.users),
  //         }));

  //   const csvReport = {
  //     data: csvData,
  //     headers: headers,
  //     filename: `${Date.now()}_Project_Report.csv`,
  //   };

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

  const defaultProps = {
    center: {
      lat: 59.95,
      lng: 30.33,
    },
    zoom: 11,
  };

  const columns = [
    {
      selector: "id",
      name: "Action",
      sortable: true,
      ignoreRowClick: true,
      cell: (row) => {
        return (
          <div>
            {user && user.roles && user.roles[0].name !== "Supervisor" && (
              <SupervisorReportModal
                status={row.status}
                approve={() => handleApprove(row.id)}
                reject={() => handleReject(row.id)}
                query={() => handleQuery(row.id)}
                comments={() => getComments(row.uuid)}
                commentz={commentz}
              />
            )}
            {row.status === "Queried" && (
              <SupervisorReportQuery uuid={row.uuid} reportId={row.id} />
            )}
          </div>
        );
      },
    },
    {
      selector: "id",
      name: "",
      cell: (row) => {
        return (
          <Item.Button
            onClick={() => viewReport(row.id)}
            color="success"
            variant="contained"
          >
            View
          </Item.Button>
        );
      },
    },
  ];

  const columnNames = headers.map((item) => ({
    selector: item.key,
    name: item.label,
    sortable: true,
  }));

  const newColumns = [...columnNames, ...columns];

  console.log("My columns", newColumns);

  return (
    <div>
      <div className="flex flex-row">
        <div className="dashboard-left">
          <Sidebar />
        </div>

        <div className="dashboard-right">
          <Header
            user={user}
            title={localStorage.getItem("platform") + " " + title.toUpperCase()}
          />
          {/* <div
            className="
          bg-white p-2 w-full"
          ></div> */}
          {/* <h3 className="mx-5 mt-5 mb-3 font-bold text-gray-700 text-2xl">
            {localStorage.getItem("platform")} Reports
          </h3> */}
          <div className="p-2 m-2 grid md:grid-cols-5 gap-1 content-center">
            {reports &&
              reports.data &&
              reports.report_meta &&
              infos.map((info) => <TopCards info={info} />)}
          </div>
          <hr />
          <div className="my-3 flex flex-row justify-evenly items-center">
            <div>
              <h3>Filter: </h3>
              {/* <CSVLink className="flex flex-row" {...csvReport}>
                {" "}
                <Icons.Download />
              </CSVLink> */}
            </div>
            <Box sx={{ minWidth: 200 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Project</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={project}
                  label="Project"
                  onChange={handleProjectChange}
                >
                  <MenuItem value="">Select Project</MenuItem>
                  {projects &&
                    projects.map((item, i) => (
                      <MenuItem value={item.id} key={i}>
                        {item.title}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            </Box>
            <Box sx={{ minWidth: 200 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">State</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={state}
                  label="State"
                  onChange={handleStateChange}
                >
                  <MenuItem value="">Select State</MenuItem>
                  {statesList.length &&
                    statesList.map((item, i) => (
                      <MenuItem value={item.id} key={i}>
                        {item.name}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            </Box>
            {/* <Box sx={{ minWidth: 200 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">LGA</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={lga}
                  label="LGA"
                  onChange={handleLgaChange}
                >
                  <MenuItem value="">Select LGA</MenuItem>
                  {lgaByStateList.length &&
                    lgaByStateList.map((item, i) => (
                      <MenuItem value={item.id} key={i}>
                        {item.name}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            </Box> */}

            <Box sx={{ minWidth: 200 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Filter by Status
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Filter by Status"
                  onChange={(e) => handleStatusChange(e.target.value)}
                >
                  <MenuItem value="">Select Status</MenuItem>

                  <MenuItem value="approved">Approved</MenuItem>
                  <MenuItem value="pending">Pending</MenuItem>
                  <MenuItem value="queried">Queried</MenuItem>
                  <MenuItem value="rejected">Rejected</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </div>
          <hr />
          {reportsData && (
            <ProjectTable
              columns={newColumns}
              data={data}
              total={countPerPage}
            />
          )}
          <PaginationComponent
            page={page}
            defaultPage={page}
            count={totalPages}
            handleChange={handleChange}
          />
        </div>
      </div>
    </div>
  );
}

export default SupervisorReports;
