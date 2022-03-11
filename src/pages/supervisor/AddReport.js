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
import { useHistory } from "react-router-dom";
import { confirmAlert } from "react-custom-confirm-alert"; // Import
import "react-custom-confirm-alert/src/react-confirm-alert.css";
import { useLocation } from "react-router-dom";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import { useAlert } from "react-alert";

const Input = styled("input")({
  display: "none",
});

function AddReport() {
  const alertMe = useAlert();
  const initialFormState = [
    { nos: "" },
    { submitted: "" },
    { geo_zone: "" },
    { state: "" },
    { lga: "" },
    { rsc: "" },
    { sos: "" },
    { location: "" },
    { nfsos: "" },
    { nwos: "" },
    { now: "" },
    { rating: "" },
    { npw: "" },
    { gtw: "" },
    { eqw: "" },
    { wgatm: "" },
    { envsor: "" },
    { or: "" },
  ];
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
  const [formField, setFormField] = React.useState({});
  const [showErrors, setShowErrors] = React.useState(false);
  const [canSubmit, setCanSubmit] = React.useState(false);
  const [assignedStates, setAssignedStates] = React.useState([]);
  const [assignedLgas, setAssignedLgas] = React.useState([]);
  const [selectedAssignedState, setSelectedAssignedState] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  const history = useHistory();
  const location = useLocation();

  let formCheck = { canSubmit: false };

  const handleDate = (newDate) => {
    setDate(newDate);
  };

  const processSelectValue = (item) => {
    if (item.id) {
      return item.id;
    }

    if (item == "Yes") {
      return 1;
    } else if (item == "No") {
      return 0;
    }

    return item;
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

  const submit = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE}/supervisor/report`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(formField),
      });
      const result = await response.json();
      if (result && result.success) {
        setFormField({});
        alertMe.show("Report Created", { type: "success" });
        history.push("/reports");
        // const KeysToErrorArray = (errors) => {
        //   Object.keys(errors).map((key, index) =>
        //     setMessage((prevError) => [...prevError, errors[key]])
        //   );
        // };
        // KeysToErrorArray(result.errors);
      }
    } catch (error) {
      setLoading(false);
      // code to run if there are any problems
    } finally {
      setLoading(false);
      // run this code no matter what the previous outcomes
    }
    // console.log("Login", result);
  };

  const getAssignedStates = async () => {
    const response = await fetch(`${API_BASE}/supervisor/assigned/states`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    const result = await response.json();
    setAssignedStates(result.data);
    // result && alert(JSON.stringify(result.data));
    console.log("Roles", result);
  };

  const getAssignedLgas = async () => {
    const response = await fetch(
      `${API_BASE}/supervisor/assigned/state/${formField.state}/lgas/`,
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    const result = await response.json();
    setAssignedLgas(result.data);
    // result && alert(JSON.stringify(result.data));
    console.log("Roles", result);
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
    // getStates();
    getAssignedStates();
  }, []);

  React.useEffect(() => {
    getLgasByStateId();
  }, [state]);

  React.useEffect(() => {
    formField.geo_zone &&
      formField.state &&
      formField.rsc &&
      formField.sos &&
      formField.location &&
      formField.nfsos &&
      formField.nwos &&
      formField.now &&
      formField.rating &&
      formField.npw &&
      formField.gtw &&
      formField.eqw &&
      formField.wgatm &&
      formField.envsor &&
      formField.or &&
      setCanSubmit(true);

    !formField.geo_zone ||
      !formField.state ||
      !formField.rsc ||
      !formField.sos ||
      !formField.location ||
      !formField.nfsos ||
      !formField.nwos ||
      !formField.now ||
      !formField.rating ||
      !formField.npw ||
      !formField.gtw ||
      !formField.eqw ||
      !formField.wgatm ||
      !formField.envsor ||
      (!formField.or && setCanSubmit(false));
  }, [formField]);

  React.useEffect(() => {
    // alert(canSubmit);
  }, [canSubmit]);

  React.useEffect(() => {
    getAssignedLgas();
  }, [formField.state]);

  const numbers = (n) => [...Array(n).keys()];

  const formBuilder = [
    // { label: "Name of Supervisor ", key: "nos", type: "input" },
    // { label: "Submitted", key: "submitted", type: "input" },
    {
      label: "Which geopolitical zone are you presently ?",
      key: "geo_zone",
      type: "dropdown",
      options: [
        "North Central",
        "North West",
        "North East",
        "South West",
        "South East",
        "South South",
      ],
    },
    {
      label: "State",
      key: "state",
      type: "dropdown",
      //   options: assignedStates.map((item) => ({ id: item.id, name: item.name })),
      options: assignedStates
        ? assignedStates.length
          ? assignedStates
          : [""]
        : [""],
    },
    // {
    //   label: "LGA",
    //   key: "lga",
    //   type: "dropdown",
    //   options: assignedLgas
    //     ? assignedLgas.length
    //       ? assignedLgas
    //       : ["1"]
    //     : ["1"],
    // },
    { label: "Road section covered", key: "rsc", type: "input" },
    {
      label: "FERMA staff on-site",
      key: "sos",
      type: "dropdown",
      options: ["Yes", "No"],
    },
    { label: "Location", key: "location", type: "input" },
    { label: "Name of FERMA staff on site", key: "nfsos", type: "input" },
    {
      label: "How many workers do you have on site ?",
      key: "nwos",
      type: "dropdown",
      options: numbers(100),
    },
    {
      label: "What nature of work is being carried out ?",
      key: "now",
      type: "dropdown",
      options: [
        "Desilting",
        "Vegetation control",
        "Fumigation",
        "Reinstatement of failed pavement",
        "Road Repair",
        "Clearing of bushes",
      ],
    },
    {
      label: "Rate quality of work carried out",
      key: "rating",
      type: "dropdown",
      options: numbers(5),
    },
    {
      label: "How many people were working ?",
      key: "npw",
      type: "dropdown",
      options: numbers(100),
    },
    {
      label: "Was there good team work ?",
      key: "gtw",
      type: "dropdown",
      options: ["Yes", "No"],
    },
    {
      label: "Was there enough equipment to work ?",
      key: "eqw",
      type: "dropdown",
      options: ["Yes", "No"],
    },
    {
      label: "How was work being guided and divided among team members?",
      key: "wgatm",
      type: "input",
      options: ["Yes", "No"],
    },
    {
      label: "Estimated number of vehicles seen on the road.",
      key: "envsor",
      type: "dropdown",
      options: numbers(500),
    },
    {
      label: "Kindly provide Overall review of activities of the day",
      key: "or",
      type: "input",
    },
  ];

  return (
    <div>
      <div className="flex flex-row">
        <div className="dashboard-left">
          <Sidebar />
        </div>

        <div className="dashboard-right">
          <Header user={user} title={"Add Report"} />
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

          <form className="mx-2 bg-white p-10">
            <h3 className="mx-5 mt-5 mb-3 text-center font-bold text-gray-700 text-2xl">
              Add Report
            </h3>
            <p className="mx-5 mt-1 mb-1 text-gray-600 text-center text-xl">
              All fields are required
            </p>
            <div className="mt-5 flex flex-column justify-evenly items-center">
              <div className="flex flex-col justify-center items-center">
                <div className="w-full grid content-center">
                  {formBuilder.map((form) => {
                    return form.type == "input" ? (
                      <div className="my-2">
                        <FormControl fullWidth>
                          {form.key !== "or" ? (
                            <>
                              <TextField
                                style={{ width: "600px" }}
                                placeholder="Type Name"
                                onKeyUp={(e) => {
                                  if (!e.target.value) {
                                    setShowErrors(true);
                                  }
                                }}
                                value={formField[form.key]}
                                onChange={(e) => {
                                  setFormField((prevState) => ({
                                    ...prevState,
                                    [form.key]: e.target.value,
                                  }));
                                }}
                                id="outlined-basic"
                                label={form.label}
                                variant="outlined"
                              />
                              <p className="text-red-500">
                                {!formField[form.key] &&
                                  showErrors &&
                                  "Required"}
                              </p>
                            </>
                          ) : (
                            <>
                              <TextField
                                multiline
                                InputProps={{
                                  inputComponent: TextareaAutosize,
                                  rows: 8,
                                }}
                                style={{ width: "600px" }}
                                placeholder="Type Name"
                                onKeyUp={(e) => {
                                  if (!e.target.value) {
                                    setShowErrors(true);
                                  }
                                }}
                                value={formField[form.key]}
                                onChange={(e) => {
                                  if (!e.target.value) {
                                    setShowErrors(true);
                                  }

                                  setFormField((prevState) => ({
                                    ...prevState,
                                    [form.key]: e.target.value,
                                  }));
                                }}
                                id="outlined-basic"
                                label={form.label}
                                variant="outlined"
                              />
                              <p className="text-red-500">
                                {!formField[form.key] &&
                                  showErrors &&
                                  "Required"}
                              </p>
                            </>
                          )}
                        </FormControl>
                      </div>
                    ) : (
                      <div className="my-2">
                        <FormControl fullWidth>
                          <InputLabel id="demo-simple-select-label">
                            {form.label}
                          </InputLabel>
                          <Select
                            style={{ width: "600px" }}
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={formField[form.key]}
                            label="State"
                            onChange={(e) => {
                              !e.target.value && setShowErrors(true);
                              setFormField((prevState) => ({
                                ...prevState,
                                [form.key]: e.target.value,
                              }));
                              {
                                /* checkIfWeCanSubmit(); */
                              }
                            }}
                          >
                            <MenuItem value="">Select</MenuItem>
                            {form.options &&
                              form.options.length &&
                              form.options.map((item, i) => (
                                <MenuItem
                                  value={processSelectValue(item)}
                                  key={i}
                                >
                                  {item.name ? item.name : item}
                                </MenuItem>
                              ))}
                          </Select>
                        </FormControl>
                        <p className="text-red-500">
                          {!formField[form.key] && showErrors && "Required"}
                        </p>
                      </div>
                    );
                  })}

                  <div className="my-2">
                    <Item.Button
                      className="text-white"
                      style={{
                        minWidth: "100%",
                        backgroundColor: "green",
                        opacity: canSubmit || loading ? 1 : 0.7,
                        color: "white",
                      }}
                      onClick={() => submit()}
                      disabled={!canSubmit || loading}
                      variant="contained"
                    >
                      {loading ? "Submitting..." : "Submit"}
                    </Item.Button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddReport;
