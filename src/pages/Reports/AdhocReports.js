import React from "react";
import LargeCard from "../../components/cards/LargeCard";
import TopCards from "../../components/cards/TopCards";
import Header from "../../components/header/Header";
import Sidebar from "../../components/sidebar/Sidebar";
import * as Item from "@mui/material";
import Moment from "react-moment";
import ProjectTable from "../../components/tables/ProjectTable";
import PaginationComponent from "../../components/tables/Pagination";
import { API_BASE,API_BASE_UPLOADS } from "../../utils/Api";
import ReportModal from "../../components/modals/ReportModal";
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
import MapModal from "../../components/modals/MapModal";

import BlueBG from "../../assets/bg/bluesquare.svg";
import GreenBG from "../../assets/bg/greensquare.svg";
import OrangeBG from "../../assets/bg/orangesquare.svg";
import RedBG from "../../assets/bg/redsquare.svg";
import YellowBG from "../../assets/bg/yellowsquare.svg";
import { useHistory } from "react-router-dom";

function AdHocReports() {
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
  const [projects, setProjects] = React.useState([]);
  const [project, setProject] = React.useState("");
  const [loading, setLoading] = React.useState(true);
  const [state, setUserstate] = React.useState("");
  const [lga, setLga] = React.useState("");
  const [projectId, setProjectId] = React.useState("");
  const [searchData, setSearchData] = React.useState([]);
  const [commentz, setCommentz] = React.useState([]);
  const [pending, setPending] = React.useState([]);
  const [approved, setApproved] = React.useState([]);
  const [queried, setQuried] = React.useState([]);
  const [rejected, setRejected] = React.useState([]);
  const [statesList, setStatesList] = React.useState([]);
  const [lgaByStateList, setLgaByStateList] = React.useState([]);
  const [searchTerms, setSearchPTerms] = React.useState(initialSearchTerms);
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
    result && result.data && setStatesList(result.data);

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
    result &&
      result.data &&
      setLgaByStateList((prevState) => (prevState = result.data));

    console.log("Users", result);
  };

  const handleSearch = async () => {
    const response = await fetch(`${API_BASE}/reports/search`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "X-RGM-PLATFORM": "Ad-hoc",
      },
      body: JSON.stringify({
        project_id: project,
        state: state,
        lga: lga,
      }),
    });
    const result = await response.json();
    console.log("Search", result);
    result && setReports(result.data.data);
    setTotalPages(result.data.last_page);
    setCountPerPage(result.data.per_page);
    setLoading(false);
  };

  const handleApprove = async (id) => {
    const response = await fetch(`${API_BASE}/report/${id}/action/0`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "X-RGM-PLATFORM": "Ad-hoc",
      },
    });
    const result = await response.json();
    getReports();
  };

  const handleReject = async (id) => {
    const response = await fetch(`${API_BASE}/report/${id}/action/1`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "X-RGM-PLATFORM": "Ad-hoc",
      },
    });
    const result = await response.json();
    getReports();
  };

  const handleQuery = async (id) => {
    const response = await fetch(`${API_BASE}/report/${id}/action/2`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "X-RGM-PLATFORM": "Ad-hoc",
      },
    });
    const result = await response.json();
    getReports();
  };

  const getReports = async () => {
    const response = await fetch(
      `${API_BASE}/reports?${new URLSearchParams(
        searchTerms
      ).toString()}&page=${page}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "X-RGM-PLATFORM": localStorage.getItem("platform"),
        },
      }
    );
    const result = await response.json();
    result && setReports(result);
    result && setReportsData(result.data.data);
    result && result.data && setTotalPages(result.data.last_page);
    result && result.data && setCountPerPage(result.data.per_page);
    result && result.data && setLoading(false);
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
      result && result.data && setUser(data);
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
    result && result.data && setProjects(result.data);
  };

  const getComments = async (uuid) => {
    const response = await fetch(`${API_BASE}/queried/${uuid}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    const result = await response.json();
    result && result.data && setCommentz(result.data);
    console.log("Comments", result);
  };

  const handleApproved = async (term) => {
    const response = await fetch(`${API_BASE}/reports/${term}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    const result = await response.json();
    result && setReports(result.data.data);
    setTotalPages(result.data.last_page);
    setCountPerPage(result.data.per_page);
    setLoading(false);
    console.log("Approved", result);
  };

   const viewReport = (uuid) => {
    history.push(`/report/${uuid}`);
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

  // const fuse = new Fuse(data, {
  //   threshold: 0.5,
  //   includeMatches: true,
  //   keys: [
  //     "message",
  //     "user.State",
  //     "user.lga",
  //     ["user.projects"],
  //     "user.projects.title",
  //   ],
  // });
  // const results = fuse.search(filterTerm);
  // console.log("result", results);
  // const filterResults = results.map((item) => item.item);

  const headers = [
    { label: "Message", key: "message" },
    { label: "Longitude", key: "longitude" },
    { label: "Latitude", key: "latitude" },
    { label: "User", key: "user.name" },
  ];

  const csvData = { ...reportsData };

  const csvReport = {
    data: csvData,
    headers: headers,
    filename: `${Date.now()}_Project_Report.csv`,
  };

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
      selector: "photo_1",
      name: "",
      cell: (row) => {
        return (
          <Item.Avatar
            src={`${API_BASE_UPLOADS}/${row.photo_1}`}
            variant="square"
          />
        );
      },
    },
    {
      selector: "message",
      name: "Report",
      sortable: true,
      cell: (row) => {
        return row.message == null ? (
          <span>N/A</span>
        ) : (
          <span>{row.message}</span>
        );
      },
    },
    {
      selector: "latitude",
      name: "Location",
      sortable: true,
      cell: (row) => {
        return (
          <MapModal
            apiKey="pk.eyJ1IjoibWljaG9sdXNhbnlhIiwiYSI6ImNrd3MybWM4YjEyOGwycHFvaDhsc2Z2Y3AifQ.uSFsVJGkOiUXSTG2SOES2A"
            latitude={parseFloat(row.latitude)}
            longitude={parseFloat(row.longitude)}
          />
        );
      },
    },
    { selector: "user.name", name: "User", sortable: true },
    { selector: "status", name: "Status", sortable: true },
    {
      selector: "created_at",
      name: "Submitted",
      sortable: true,
      ignoreRowClick: true,
      cell: (row) => {
        return <Moment fromNow>{row.created_at}</Moment>;
      },
    },
    {
      selector: "id",
      name: "Submitted",
      sortable: true,
      ignoreRowClick: true,
      cell: (row) => {
        return (
          <div>
            <ReportModal
              status={row.status}
              photo1={row.photo_1 !=null ? `${API_BASE_UPLOADS}/${row.photo_1}`:null}
              photo2={row.photo_2 !=null ? `${API_BASE_UPLOADS}/${row.photo_2}` :null}
              photo3={row.photo_3 !=null ? `${API_BASE_UPLOADS}/${row.photo_3}` :null}
              photo4={row.photo_4 !=null ? `${API_BASE_UPLOADS}/${row.photo_4}` :null}
              latitude={parseFloat(row.latitude)}
              longitude={parseFloat(row.longitude)}
              apiKey="pk.eyJ1IjoibWljaG9sdXNhbnlhIiwiYSI6ImNrd3MybWM4YjEyOGwycHFvaDhsc2Z2Y3AifQ.uSFsVJGkOiUXSTG2SOES2A"
              approve={() => handleApprove(row.id)}
              reject={() => handleReject(row.id)}
              query={() => handleQuery(row.id)}
              comments={() => getComments(row.uuid)}
              commentz={commentz}
            />
            {row.status === "Queried" &&
              JSON.parse(localStorage.getItem("roles"))[0].name !==
                "Supervisor" && (
                <ReportQuery uuid={row.uuid} reportId={row.id} />
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
            onClick={() => viewReport(row.uuid)}
            color="success"
            variant="contained"
          >
            View
          </Item.Button>
        );
      },
    },
  ];

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
          {/* <h3 className="mx-5 mt-5 mb-3 font-bold text-gray-700 text-2xl">
            {localStorage.getItem("platform")} Reports
          </h3> */}
          <div className="p-2 m-2 grid md:grid-cols-5 gap-1 content-center">
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
            {/* {infos.map((info) => (
              <TopCards info={info} />
            ))} */}
          </div>
          <hr />
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
            <Box sx={{ minWidth: 200 }}>
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
            </Box>

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

                  <MenuItem value="Approved">Approved</MenuItem>
                  <MenuItem value="Pending">Pending</MenuItem>
                  <MenuItem value="Queried">Queried</MenuItem>
                  <MenuItem value="Rejected">Rejected</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </div>
          {/* <div className="my-3 flex flex-row justify-evenly items-center">
            <div>
              <h3>Filter: </h3>
              <CSVLink className="flex flex-row" {...csvReport}>
                {" "}
                <Icons.Download />
              </CSVLink>
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
                  {states &&
                    states.map((item, i) => (
                      <MenuItem value={item.name} key={i}>
                        {item.name}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            </Box>
            <Box sx={{ minWidth: 200 }}>
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
                  {states &&
                    states
                      .filter((s) => s.name === state)
                      .map((item, i) =>
                        item.lgas.map((lg, i) => (
                          <MenuItem value={lg} key={i}>
                            {lg}
                          </MenuItem>
                        ))
                      )}
                </Select>
              </FormControl>
            </Box>

            <Item.Button
              onClick={handleSearch}
              className="user-button"
              variant="contained"
            >
              Filter
            </Item.Button>

            <Box sx={{ minWidth: 200 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Filter by Status
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Filter by Status"
                  onChange={(e) => handleApproved(e.target.value)}
                >
                  <MenuItem>Select Status</MenuItem>

                  <MenuItem value="approved">Approved</MenuItem>
                  <MenuItem value="pending">Pending</MenuItem>
                  <MenuItem value="queried">Queried</MenuItem>
                  <MenuItem value="rejected">Rejected</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </div> */}
          <hr />
          <ProjectTable columns={columns} data={data} total={countPerPage} />
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

export default AdHocReports;
