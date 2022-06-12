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
import ReportEditModal from "../../components/modals/ReportEditModal";
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
import { useAlert } from "react-alert";

function CitizenReports() {
   const initialSearchTerms = {
    state_id: "",
    lga_id: "",
    district_id: "",
    project_id: "",
    status: "",
  };
  const [user, setUser] = React.useState({});
  const [reports, setReports] = React.useState([]);
  const [reportsAll, setReportsAll] = React.useState();
  const [reportsData, setReportsData] = React.useState([]);
  const [page, setPage] = React.useState(1);
  const [totalPages, setTotalPages] = React.useState(2);
  const [countPerPage, setCountPerPage] = React.useState(10);
  const [filterTerm, setFilterTerm] = React.useState("");
  const [projects, setProjects] = React.useState([]);
  const [project, setProject] = React.useState("");
  const [loading, setLoading] = React.useState(true);
  const [state, setUserstate] = React.useState("");
  const [zone, setUserZone] = React.useState("");
  const [lga, setLga] = React.useState("");
  const [district, setDistrict] = React.useState("");
  const [projectId, setProjectId] = React.useState("");
  const [searchData, setSearchData] = React.useState([]);
  const [commentz, setCommentz] = React.useState([]);
  const [pending, setPending] = React.useState([]);
  const [approved, setApproved] = React.useState([]);
  const [queried, setQuried] = React.useState([]);
  const [rejected, setRejected] = React.useState([]);
    const [statesList, setStatesList] = React.useState([]);
     const [zonesList, setZonesList] = React.useState([]);
  const [lgaByStateList, setLgaByStateList] = React.useState([]);
  const [districtByStateList, setDistrictByStateList] = React.useState([]);
  const [searchTerms, setSearchPTerms] = React.useState(initialSearchTerms);

  // @ts-ignore
  // eslint-disable-next-line import/no-webpack-loader-syntax
  //mapboxgl.workerClass = require("worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker").default;

   const history = useHistory();
   const exportBtn = React.useRef();
   const alertMe = useAlert();

  const handleChange = (event, value) => {
    setPage(value);
  };


  const handleZoneChange = (event) => {
    console.log(event.target.value);
    setUserZone(event.target.value);
    setSearchPTerms((prevState) => ({
      ...prevState,
      zone_id: event.target.value,
    }));
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

    const handleDistrictChange = (event) => {
    console.log(event.target.value);
    setDistrict(event.target.value);
    setSearchPTerms((prevState) => ({
      ...prevState,
      district_id: event.target.value,
    }));
  
  };

  const title = "Reports";

    const editReport = async (data) => {
    const {message,stateroad,id} =data  
    const response = await fetch(`${API_BASE}/report/update/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        message:message,
        stateroad:stateroad,
      }),
    });
    const result = await response.json();
    getReports()
    alertMe.show("Report Updated", { type: "success" });
    // result && result.data && setZonesList(result.data);

    console.log("editing report", result);
  };

  const getZones = async () => {
    const response = await fetch(`${API_BASE}/zones`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    const result = await response.json();
    result && result.data && setZonesList(result.data);

    console.log("Users", result);
  };
  
const getStatesByZoneId = async () => {
    const response = await fetch(`${API_BASE}/zone/${zone}/states`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    setDistrictByStateList([])
    setDistrict("")
    setLgaByStateList([])
    setLga("")
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


    const getDistrictsByStateId = async () => {
    const response = await fetch(`${API_BASE}/state/${state}/districts`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    const result = await response.json();
    result &&
      result.data &&
      setDistrictByStateList((prevState) => (prevState = result.data));

    console.log("Users", result);
  };


  // const handleSearch = async () => {
  //   const response = await fetch(`${API_BASE}/reports/search`, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: `Bearer ${localStorage.getItem("token")}`,
  //       "X-RGM-PLATFORM": "Ad-hoc",
  //     },
  //     body: JSON.stringify({
  //       project_id: project,
  //       state: state,
  //       lga: lga,
  //     }),
  //   });
  //   const result = await response.json();
  //   console.log("Search", result);
  //   result && setReports(result.data.data);
  //   setTotalPages(result.data.last_page);
  //   setCountPerPage(result.data.per_page);
  //   setLoading(false);
  // };

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

  // const getReports = async () => {
  //   const response = await fetch(`${API_BASE}/reports?page=${page}`, {
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: `Bearer ${localStorage.getItem("token")}`,
  //       "X-RGM-PLATFORM": localStorage.getItem("platform"),
  //     },
  //   });
  //   const result = await response.json();
  //   result && setReports(result.data.data);
  //   setReportsData(result.data.data);
  //   setTotalPages(result.data.last_page);
  //   setCountPerPage(result.data.per_page);
  //   setLoading(false);
  //   console.log("Reports", result);
  // };

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
    result && setReports(result.data.data);
    result && setReportsData(result.data.data);
    result && result.data && setTotalPages(result.data.last_page);
    result && result.data && setCountPerPage(result.data.per_page);
    result && result.data && setLoading(false);
    setTotalPages(result.data.last_page);
  };

    const getReportsAll = async () => {
    // alert( searchTerms.state_id)
    const response = await fetch(
      `${API_BASE}/reports?${new URLSearchParams(
        searchTerms
      ).toString()}&page=${page}&all=true`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "X-RGM-PLATFORM": localStorage.getItem("platform"),
        },
      }
    );
    
    const result = await response.json();
     let  modifiedReports= []
    if(result && result.data){
      modifiedReports= result.data.data.map(item=>{
      
        return {...item, photo_1:item.photo_1!=null ? API_BASE_UPLOADS+"/"+item.photo_1: "N/A",photo_2:item.photo_2!=null ?API_BASE_UPLOADS+"/"+item.photo_2: "N/A",photo_3:item.photo_3!=null ? API_BASE_UPLOADS+"/"+item.photo_3: "N/A",photo_4:item.photo_4!=null ? API_BASE_UPLOADS+"/"+item.photo_4: "N/A",comment:item.message!==null ? item.message : "" ,};
      
      
      })

    result && result.data && setReportsAll(modifiedReports);
    result && result.data &&  exportBtn.current.link.click();

    }
    console.log('MODIFIED RESULTS',modifiedReports)
    
    
    // result && setReportsDataAll(result.data.data);
    // result && result.data && setTotalPages(result.data.last_page);
    // result && result.data && setCountPerPage(result.data.per_page);
    // result && result.data && setLoading(false);
    // return response
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
      const data = result.data;
      setUser(data);
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
    const response = await fetch(`${API_BASE}/queried/${uuid}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    const result = await response.json();
    result && setCommentz(result.data);
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
    result && setReports(result);
    setTotalPages(result.data.last_page);
    setCountPerPage(result.data.per_page);
    setLoading(false);
    console.log("Approved", result);
  };

  React.useEffect(() => {
    getUser();
    getZones()
    // getStates();
    getProjects();
  }, []);

  React.useEffect(() => {
    getReports();
  }, [page]);

  React.useEffect(() => {
    getLgasByStateId();
    getDistrictsByStateId()
    getReports();
  }, [state]);

  React.useEffect(() => {
    getStatesByZoneId();
    getReports();
  }, [zone]);

  React.useEffect(() => {
    getReports();
  }, [lga]);

    React.useEffect(() => {
    getReports();
  }, [district]);

  const data = React.useMemo(() => reportsData);

  const fuse = new Fuse(data, {
    threshold: 0.5,
    includeMatches: true,
    keys: [
      "message",
      "user.State",
      "user.lga",
      ["user.projects"],
      "user.projects.title",
    ],
  });
  const results = fuse.search(filterTerm);
  console.log("result", results);
  const filterResults = results.map((item) => item.item);

  const headers = [
    { label: "Zone", key: "user.registeredstate.zone.name" },
    { label: "Senatorial District", key: "user.registereddistrict.name" },
    { label: "State", key: "user.registeredstate.name" },
    { label: "Longitude", key: "longitude" },
    { label: "Latitude", key: "latitude" },
     { label: "Phote (1)", key: "photo_1" },
     { label: "Phote (2)", key: "photo_2"},
     { label: "Phote (3)", key: "photo_3" },
     { label: "Phote (4)", key: "photo_4"},
     { label: "Comment", key: "message" },
     { label: "Road Name", key: "stateroad" },
    { label: "Submitted", key: "created_at" },
  ];

  const csvData = { ...reportsData};

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
      data: reportsData.length,
    },
    {
      title: "Approved",
      color: "#035C36",
      image: GreenBG,
      data: reportsData.filter((report) => report.status === "Approved").length,
    },
    {
      title: "Pending",
      color: "rgb(209 148 35)",
      image: OrangeBG,
      data: reportsData.filter((report) => report.status === "Pending").length,
    },

    {
      title: "Disapproved",
      color: "#0D0709",
      image: RedBG,
      data: reportsData.filter((report) => report.status === "Rejected").length,
    },
    {
      title: "Queried",
      color: "#DD411A",
      image: YellowBG,
      data: reportsData.filter((report) => report.status === "Queried").length,
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
      name: "Comment",
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
     { selector: "user.registeredstate.name", name: "State", sortable: true },
    // { selector: "status", name: "Status", sortable: true },
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
      name: "Action",
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
            {/* {row.status === "Queried" && (
              <ReportQuery uuid={row.uuid} reportId={row.id} />
            )} */}
          </div>
        );
      },
    },
     {
      selector: "id",
      name: "Action",
      sortable: true,
      ignoreRowClick: true,
      cell: (row) => {
        return (
          <div>
            <ReportEditModal
              data={row}
              edit={(data) => editReport(data)}
           
            />
            {/* {row.status === "Queried" && (
              <ReportQuery uuid={row.uuid} reportId={row.id} />
            )} */}
          </div>
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
            {infos.map((info) => (
              <TopCards info={info} />
            ))}
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
                <InputLabel id="demo-simple-select-label">Zone</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={zone}
                  label="State"
                  onChange={handleZoneChange}
                >
                  <MenuItem value="">Select Zone</MenuItem>
                  {zonesList.length &&
                    zonesList.map((item, i) => (
                      <MenuItem value={item.id} key={i}>
                        {item.name}
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

               <h3>Export: </h3>
              {reportsAll && (<CSVLink ref={exportBtn}  target='_blank'  className="flex flex-row" headers={headers}  data={reportsAll} filename={`report-${new Date().toLocaleString()}.csv`}>
               
              </CSVLink>)
              }

<Icons.Download onClick={getReportsAll}  className="cursor-pointer"/> 

           
          </div>

          <div className="my-3 flex flex-row justify-start items-center">
             <Box sx={{ minWidth: 30 }}></Box>
            
              
            <Box sx={{ minWidth: 200 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Senatorial District</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={district}
                  label="Senatorial District"
                  onChange={handleDistrictChange}
                >
                  <MenuItem value="">Select District</MenuItem>
                  {districtByStateList.length &&
                    districtByStateList.map((item, i) => (
                      <MenuItem value={item.id} key={i}>
                        {item.name}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            </Box>

           
          </div>
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

export default CitizenReports;
