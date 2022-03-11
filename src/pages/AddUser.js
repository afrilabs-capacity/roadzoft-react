import React from "react";
import LargeCard from "../components/cards/LargeCard";
import TopCards from "../components/cards/TopCards";
import Header from "../components/header/Header";
import Sidebar from "../components/sidebar/Sidebar";
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
import { API_BASE } from "../utils/Api";
import { useHistory } from "react-router-dom";
import { confirmAlert } from "react-custom-confirm-alert"; // Import
import "react-custom-confirm-alert/src/react-confirm-alert.css";
import { useAlert } from "react-alert";

const Input = styled("input")({
  display: "none",
});

function AddUser() {
  const [project, setProject] = React.useState("");
  const [date, setDate] = React.useState(new Date("2014-08-18T21:11:54"));
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [name, setName] = React.useState("");
  const [state, setUserstate] = React.useState("");
  const [lga, setLga] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [role, setRole] = React.useState("");
  const [roles, setRoles] = React.useState([]);
  const [user, setUser] = React.useState({});
  const [message, setMessage] = React.useState("");
  const [statesList, setStatesList] = React.useState([]);
  const [lgaByStateList, setLgaByStateList] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [errors, setErrors] = React.useState([]);
  const history = useHistory();

  const alertMe = useAlert();

  const handleDate = (newDate) => {
    setDate(newDate);
  };

  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };
  const handleStateChange = (event) => {
    console.log(event.target.value);
    setUserstate(event.target.value);
  };
  const handleProjectChange = (event) => {
    setProject(event.target.value);
  };

  const register = async () => {
    setErrors([]);
    setLoading(true);
    const dobYear = date.getFullYear();
    const response = await fetch(`${API_BASE}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        email,
        name,
        phone,
        state,
        lga,
        password: dobYear.toString(),
        dob: date,
      }),
    });
    const result = await response.json();
    const resultRaw = await response;
    console.log("Register", result);
    if (role != "" && result.success) {
      setLoading(false);
      alertMe.show("User created successfully", { type: "success" });
      const response = await fetch(
        `${API_BASE}/roles/assign/role/${role}/user/${result.data.user_id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const user_role = await response.json();
      if (user_role.success) {
        // confirmAlert({
        //   title: "Confirm to submit",
        //   message: "Do you want to Add a new user?",
        //   buttons: [
        //     {
        //       label: "Add New User",
        //       onClick: () => {
        //         setMessage("User Added Successfully");
        //         setEmail("");
        //         setName("");
        //         setPassword("");
        //         setUserstate("");
        //         setLga("");
        //         setPhone("");
        //         setDate(new Date());
        //       },
        //     },
        //     {
        //       label: "No",
        //       onClick: () => {
        //         setMessage("Role Added Successfully");
        //         history.push(`/user-profile/${result.data.user_id}`);
        //       },
        //     },
        //   ],
        // });

        history.push(`/user-profile/${result.data.user_id}`);
      } else if (resultRaw && resultRaw.status == "422") {
        const KeysToErrorArray = (errors) => {
          Object.keys(errors).map((key, index) => {
            setErrors((prevError) => [...prevError, errors[key]]);
          });
        };
        KeysToErrorArray(result.errors);
      }
      console.log("Assign", user_role);
    } else if (role == "" && result.success) {
      // confirmAlert({
      //   title: "Confirm to submit",
      //   message: "Do you want to Add a new user?",
      //   buttons: [
      //     {
      //       label: "Add New User",
      //       onClick: () => {
      //         setMessage("User Added And Role Added Successfully");
      //         setEmail("");
      //         setName("");
      //         setPassword("");
      //         setUserstate("");
      //         setLga("");
      //         setPhone("");
      //         setDate(new Date());
      //       },
      //     },
      //     {
      //       label: "No",
      //       onClick: () => {
      //         setMessage("Role Added Successfully");
      //         history.push(`/user-profile/${result.data.user_id}`);
      //       },
      //     },
      //   ],
      // });
      history.push(`/user-profile/${result.data.user_id}`);
    } else if (resultRaw && resultRaw.status == "422") {
      const KeysToErrorArray = (errors) => {
        Object.keys(errors).map((key, index) => {
          // setErrors([]);
          setErrors((prevError) => [...prevError, errors[key]]);
        });
      };
      KeysToErrorArray(result.errors);
      setLoading(false);
    }
  };

  const getRoles = async () => {
    const response = await fetch(`${API_BASE}/roles`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    const result = await response.json();
    setRoles(result.data);
    console.log("Roles", result);
  };

  const title = "NEW USER";
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

  React.useEffect(() => {
    getUser();
    getRoles();
    getStates();
  }, []);

  React.useEffect(() => {
    getLgasByStateId();
  }, [state]);

  return (
    <div>
      <div className="flex flex-row">
        <div className="dashboard-left">
          <Sidebar />
        </div>

        <div className="dashboard-right">
          <Header user={user} title={title.toUpperCase()} />
          <hr />
          {message != "" && (
            <Item.Alert
              onClose={() => setMessage("")}
              variant="filled"
              color="info"
            >
              {message}
            </Item.Alert>
          )}

          <form className="mx-5 bg-white p-10">
            <h3 className="mx-5 mt-5 mb-3 text-center font-bold text-gray-700 text-2xl">
              Create New User
            </h3>
            <p className="mx-5 mt-1 mb-1 text-gray-600 text-center text-xl">
              All fields are required
            </p>

            <div className="grid gap-4 my-1">
              <div className="">
                <TextField
                  onKeyUp={() => setErrors([])}
                  style={{ width: "100%" }}
                  placeholder="Type Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  id="outlined-basic"
                  label="Name"
                  variant="outlined"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 my-2">
              <div className="">
                <Box sx={{ minWidth: "50%" }}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">State</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={state}
                      label="State"
                      onChange={handleStateChange}
                    >
                      <MenuItem>Select State</MenuItem>
                      {statesList.length &&
                        statesList.map((item, i) => (
                          <MenuItem value={item.id} key={i}>
                            {item.name}
                          </MenuItem>
                        ))}
                    </Select>
                  </FormControl>
                </Box>
              </div>
              <div>
                <Box sx={{ minWidth: "50%" }}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">LGA</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={lga}
                      label="LGA"
                      onChange={(e) => setLga(e.target.value)}
                    >
                      <MenuItem>Select LGA</MenuItem>
                      {lgaByStateList.length &&
                        lgaByStateList.map((item, i) => (
                          <MenuItem value={item.id} key={i}>
                            {item.name}
                          </MenuItem>
                        ))}
                    </Select>
                  </FormControl>
                </Box>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 my-2">
              <div>
                <Box sx={{ minWidth: "50%" }}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Role</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      label="Role"
                      onChange={handleRoleChange}
                    >
                      {roles
                        .filter((role) => role.name !== "Citizen")
                        .map((role) => (
                          <MenuItem value={role.id}>{role.name}</MenuItem>
                        ))}

                      {/* <MenuItem value={2}>Admin</MenuItem>
                          <MenuItem value={3}>Staff</MenuItem>
                          <MenuItem value={4}>Ad-hoc</MenuItem> */}
                    </Select>
                  </FormControl>
                </Box>
              </div>
              <div>
                <TextField
                  onKeyUp={() => setErrors([])}
                  style={{ minWidth: "100%" }}
                  placeholder="Phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  id="outlined-basic"
                  label="Phone"
                  variant="outlined"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 my-2">
              <div>
                <TextField
                  onKeyUp={() => setErrors([])}
                  style={{ minWidth: "100%" }}
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  id="outlined-basic"
                  label="Email"
                  variant="outlined"
                />
              </div>

              <div>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <Stack spacing={3}>
                    <DesktopDatePicker
                      onKeyUp={() => setErrors([])}
                      label="Date of Birth"
                      inputFormat="dd/MM/yyyy"
                      value={date}
                      onChange={handleDate}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </Stack>
                </LocalizationProvider>
              </div>
            </div>

            <div>
              <div>
                {errors &&
                  errors.map((item) => <p className="text-red-500">{item}</p>)}
              </div>
              <Item.Button
                className=""
                style={{
                  minWidth: "100%",
                  backgroundColor: "green",
                  opacity: !loading ? 1 : 0.7,
                  color: "white",
                }}
                onClick={register}
                disabled={loading}
                variant="contained"
              >
                {loading ? "Submitting..." : "Submit"}
              </Item.Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddUser;
