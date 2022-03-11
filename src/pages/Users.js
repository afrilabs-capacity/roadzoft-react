import React from "react";
import LargeCard from "../components/cards/LargeCard";
import TopCards from "../components/cards/TopCards";
import Header from "../components/header/Header";
import Sidebar from "../components/sidebar/Sidebar";
import * as Item from "@mui/material";
import Moment from "react-moment";
import ProjectTable from "../components/tables/ProjectTable";
import HeaderWithButton from "../components/header/HeaderWithButton";
import { API_BASE } from "../utils/Api";
import { useHistory } from "react-router-dom";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Box from "@mui/material/Box";
import { CSVLink } from "react-csv";
import Fuse from "fuse.js";
import * as Icons from "react-feather";
import PaginationComponent from "../components/tables/Pagination";

function Users() {
  const initialSearchTerms = {
    state_id: "",
    lga_id: "",
    project_id: "",
  };

  const history = useHistory();
  const [users, setUsers] = React.useState([]);
  const [page, setPage] = React.useState(1);
  const [totalPages, setTotalPages] = React.useState(1);
  const [countPerPage, setCountPerPage] = React.useState(10);
  const [loading, setLoading] = React.useState(true);
  const [projects, setProjects] = React.useState([]);
  const [project, setProject] = React.useState("");
  const [user, setUser] = React.useState({});
  const [filterTerm, setFilterTerm] = React.useState("");
  const [searchTerms, setSearchPTerms] = React.useState(initialSearchTerms);
  const [statesList, setStatesList] = React.useState([]);
  const [lgaByStateList, setLgaByStateList] = React.useState([]);
  const [state, setUserstate] = React.useState("");
  const [lga, setLga] = React.useState("");

  const handleChange = (event, value) => {
    setPage(value);
  };

  const handleStateChange = (event) => {
    console.log(event.target.value);
    //setFilterTerm(event.target.value);
    setUserstate(event.target.value);
    setSearchPTerms((prevState) => ({
      ...prevState,
      state_id: event.target.value,
    }));
  };
  const handleProjectChange = (event) => {
    console.log(event.target.value);
    //setFilterTerm(event.target.value);
    setProject(event.target.value);
    setSearchPTerms((prevState) => ({
      ...prevState,
      project_id: event.target.value,
    }));
  };
  const handleLgaChange = (event) => {
    console.log(event.target.value);
    //setFilterTerm(event.target.value);
    setLga(event.target.value);
    setSearchPTerms((prevState) => ({
      ...prevState,
      lga_id: event.target.value,
    }));
  };

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

  const getUsers = async () => {
    const response = await fetch(
      `${API_BASE}/users?${new URLSearchParams(
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
    result && setUsers(result.data.data);
    setTotalPages(result.data.last_page);
    setCountPerPage(result.data.per_page);
    setLoading(false);
    console.log("Users", result);
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
      result && setUser(data);
      console.log("User:", result);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    const response = await fetch(`${API_BASE}/user/delete/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    const result = await response.json();
    getUsers();
    console.log("Projects", result);
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
    getUsers();
    getUser();
    getProjects();
    getStates();
  }, []);
  React.useEffect(() => {
    getUsers();
  }, [page]);

  React.useEffect(() => {
    getLgasByStateId();
    getUsers();
  }, [state]);

  React.useEffect(() => {
    getUsers();
  }, [lga]);

  React.useEffect(() => {
    getUsers();
  }, [project]);

  React.useEffect(() => {}, [searchTerms]);

  const states = [];

  const data = React.useMemo(() => users);

  const fuse = new Fuse(data, {
    threshold: 0.5,
    includeMatches: true,
    keys: ["State", "lga", ["projects"], "projects.title"],
  });
  const results = fuse.search(filterTerm);
  console.log("result", results);
  const filterResults = results.map((item) => item.item);

  const headers = [
    { label: "Name", key: "name" },
    { label: "State", key: "state_name" },
    { label: "Lga", key: "lga_name" },
    { label: "Phone", key: "phone" },
    { label: "Email", key: "email" },
  ];

  const csvData =
    filterTerm == ""
      ? data.map((row) => ({
          ...row,
          users: JSON.stringify(row.users),
        }))
      : filterResults.map((row) => ({
          ...row,
          users: JSON.stringify(row.users),
        }));

  const csvReport = {
    data: csvData,
    headers: headers,
    filename: `${Date.now()}_Project_Report.csv`,
  };

  const handleNew = () => {
    history.push("/add-user");
  };
  const viewUser = (id) => {
    history.push(`/user-profile/${id}`);
  };
  const title = "USERS";

  const columns = [
    { selector: "name", name: "Full Name", sortable: true },
    { selector: "state_name", name: "State", sortable: true },
    { selector: "lga_name", name: "LGA", sortable: true },
    {
      selector: "id",
      name: "",
      cell: (row) => {
        return (
          <Item.Button
            onClick={() => viewUser(row.id)}
            color="success"
            variant="contained"
          >
            View
          </Item.Button>
        );
      },
    },
    {
      selector: "id",
      name: "",
      sortable: true,
      ignoreRowClick: true,
      cell: (row) => {
        return (
          <Item.Button
            onClick={() => {
              if (window.confirm("Delete this user?")) handleDelete(row.id);
            }}
            color="error"
            variant="contained"
          >
            Delete
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
          <HeaderWithButton
            handlClick={handleNew}
            title={title.toUpperCase()}
            user={user}
          />
          <hr />
          <div className="mb-3 mt-10 flex flex-row justify-evenly items-center">
            <h3>Filter: </h3>
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

            <CSVLink className="flex flex-row" {...csvReport}>
              {" "}
              <Icons.Download /> Export Data
            </CSVLink>
          </div>
          <hr />
          {loading ? (
            <Item.Box
              className="flex justify-center items-center"
              sx={{ display: "flex" }}
            >
              <Item.CircularProgress />
            </Item.Box>
          ) : (
            <>
              <ProjectTable
                columns={columns}
                data={filterTerm != "" ? filterResults : data}
                total={countPerPage}
              />
              <PaginationComponent
                page={page}
                defaultPage={page}
                count={totalPages}
                handleChange={handleChange}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Users;
