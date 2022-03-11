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
import { useParams } from "react-router-dom";
import ProjectTable from "../components/tables/ProjectTable";
import ReportModal from "../components/modals/ReportModal";
import { useAlert } from "react-alert";

const Input = styled("input")({
  display: "none",
});

function SingleUser() {
  const params = useParams();
  const [user, setUser] = React.useState({});
  const [project, setProject] = React.useState("");
  const [date, setDate] = React.useState(new Date("2014-08-18T21:11:54"));
  const [email, setEmail] = React.useState("");
  const [newemail, setNewEmail] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [name, setName] = React.useState("");
  const [state, setUserstate] = React.useState("");
  const [stateName, setUserstateName] = React.useState("");
  const [lga, setLga] = React.useState("");
  const [lgaName, setLgaName] = React.useState("");
  const [image, setImage] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [newphone, setNewPhone] = React.useState("");
  const [userId, setUserId] = React.useState("");
  const [projectId, setProjectId] = React.useState("");
  const [role, setRole] = React.useState("");
  const [roles, setRoles] = React.useState([]);
  const [userRoles, setUserRoles] = React.useState([]);
  const [projects, setProjects] = React.useState([]);
  const [userProjects, setUserProjects] = React.useState([]);
  const [userReports, setUserReports] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [photo, setPhoto] = React.useState("");
  const [uploadedImage, setUploadedImage] = React.useState("");
  const [realUser, setRealUser] = React.useState([]);
  const [realUserRole, setRealUserRole] = React.useState([]);
  const [statesList, setStatesList] = React.useState([]);
  const [lgaByStateList, setLgaByStateList] = React.useState([]);

  const [statesAssignmentList, setStatesAssignmentList] = React.useState([]);
  const [lgaByStateAssignmentList, setLgaByStateAssignmentList] =
    React.useState([]);

  const [userAssignedStates, setUserAssignedStates] = React.useState([]);
  const [userAssignedlgas, setUserAssignedLgas] = React.useState([]);
  const [selectedAssigmentState, setSelectedAssigmentState] =
    React.useState("");
  const [selectedAssigmentLga, setSelectedAssigmentLga] = React.useState("");

  const alertMe = useAlert();

  //Handle changes
  const handleDate = (newDate) => {
    setDate(newDate);
  };

  const handleStateChange = (event) => {
    console.log(event.target.value);
    setUserstate(event.target.value);
  };

  const handleStateAssignmentChange = (event) => {
    console.log(event.target.value);
    setSelectedAssigmentState(event.target.value);
  };

  const handleLgaAssignmentChange = (event) => {
    console.log(event.target.value);
    setSelectedAssigmentLga(event.target.value);
  };

  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };
  const handleProjectChange = (event) => {
    setProjectId(event.target.value);
  };
  //Image Change
  const handleImage = (event) => {
    const img = new Image();
    img.src = URL.createObjectURL(event.target.files[0]);
    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = function () {
      setUploadedImage(URL.createObjectURL(event.target.files[0]));
      setPhoto(reader.result);
    };
  };

  //Post Images
  const addImage = async () => {
    console.log("myImage", photo);
    const response = await fetch(`${API_BASE}/user/profile/avatar`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        user_id: userId,
        photo: photo,
      }),
    });
    const result = await response.json();
    setMessage(result.message);
    setPhoto("");
    setUploadedImage("");
    getUser();
    console.log("Image", result);
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
    result && setStatesAssignmentList(result.data);

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
    result && setLgaByStateList(result.data);

    console.log("Users", result);
  };

  const getLgasByStateAssignmentId = async () => {
    const response = await fetch(
      `${API_BASE}/state/${selectedAssigmentState}/lgas`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    const result = await response.json();
    result && setLgaByStateAssignmentList(result.data);

    console.log("Users", result);
  };

  //Update User account
  const updateUser = async () => {
    if (email === user.email && phone === user.phone) {
      const response = await fetch(`${API_BASE}/user/update/${userId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          name,
          state,
          lga,
          dob: date,
        }),
      });
      const result = await response.json();
      const resultRaw = await response;

      console.log("Register", result);
      if (result && result.success && resultRaw) {
        alertMe.show(result.message, { type: "success" });
      } else if (resultRaw && resultRaw.status == "422") {
        const KeysToErrorArray = (errors) => {
          Object.keys(errors).map((key, index) =>
            setMessage((prevError) => [...prevError, errors[key]])
          );
        };
        KeysToErrorArray(result.errors);
      } else if (resultRaw && resultRaw.status == "403") {
        //alert("Unauthorized Action");
        alertMe.show(resultRaw.message, { type: "success" });
      }
    } else if (email === user.email && phone !== user.phone) {
      const response = await fetch(`${API_BASE}/user/update/${userId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          name,
          state,
          lga,
          phone,
          dob: date,
        }),
      });
      const result = await response.json();
      const resultRaw = await response;

      console.log("Register", result);
      if (result && result.success && resultRaw) {
        alertMe.show(result.message, { type: "success" });
      } else if (resultRaw && resultRaw.status == "422") {
        const KeysToErrorArray = (errors) => {
          Object.keys(errors).map((key, index) =>
            setMessage((prevError) => [...prevError, errors[key]])
          );
        };
        KeysToErrorArray(result.errors);
      } else if (resultRaw && resultRaw.status == "403") {
        alert("Unauthorized Action");
      }
    } else if (email !== user.email && phone !== user.phone) {
      const response = await fetch(`${API_BASE}/user/update/${userId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          name,
          state,
          lga,
          email,
          phone,
          dob: date,
        }),
      });
      const result = await response.json();
      const resultRaw = await response;

      console.log("Register", result);
      if (result && result.success && resultRaw) {
        alertMe.show(result.message, { type: "success" });
      } else if (resultRaw && resultRaw.status == "422") {
        const KeysToErrorArray = (errors) => {
          Object.keys(errors).map((key, index) =>
            setMessage((prevError) => [...prevError, errors[key]])
          );
        };
        KeysToErrorArray(result.errors);
      } else if (resultRaw && resultRaw.status == "403") {
        alert("Unauthorized Action");
      }
    } else if (email !== user.email && phone === user.phone) {
      const response = await fetch(`${API_BASE}/user/update/${userId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          name,
          state,
          lga,
          email,
          phone,
          dob: date,
        }),
      });
      const result = await response.json();
      const resultRaw = await response;

      console.log("Register", result);
      if (result && result.success && resultRaw) {
        alertMe.show(result.message, { type: "success" });
      } else if (resultRaw && resultRaw.status == "422") {
        const KeysToErrorArray = (errors) => {
          Object.keys(errors).map((key, index) =>
            setMessage((prevError) => [...prevError, errors[key]])
          );
        };
        KeysToErrorArray(result.errors);
      } else if (resultRaw && resultRaw.status == "403") {
        alert("Unauthorized Action");
      }
    }
  };

  const updateEmail = async () => {
    //const dobYear = date.getFullYear();
    const response = await fetch(`${API_BASE}/user/update/${userId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        email,
      }),
    });
    const result = await response.json();
    setMessage(result.message);
    console.log("Register", result);
  };

  const updatePhone = async () => {
    //const dobYear = date.getFullYear();
    const response = await fetch(`${API_BASE}/user/update/${userId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        phone,
      }),
    });
    const result = await response.json();
    setMessage(result.message);
    console.log("Register", result);
  };
  //Get roles
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
  //Get projects
  const getProjects = async () => {
    try {
      const response = await fetch(`${API_BASE}/projects`, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const result = await response.json();
      setProjects(result.data);
      console.log("Projects", result);
    } catch (error) {
      console.log(error);
    }
  };

  //Get projects
  /*   const getUserProjects = async () => {
    try {
      const response = await fetch(`${API_BASE}/projects`, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const result = await response.json();
      setProjects(result.data);
      console.log("Projects", result);
    } catch (error) {
      console.log(error);
    }
  }; */

  //Get user reports
  const getUserReports = async () => {
    try {
      const response = await fetch(`${API_BASE}/user/${userId}/reports`, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const result = await response.json();
      setUserReports(result.data.data);
      console.log("Reports", result);
    } catch (error) {
      console.log(error);
    }
  };
  //header user
  const title = "USER DETAILS";

  //Get single user
  const getUser = async () => {
    const userId = params.id;
    try {
      const response = await fetch(`${API_BASE}/user/${userId}`, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const result = await response.json();
      const data = result.data;
      setUserProjects(result.data.projects);
      setUser(result.data);
      setName(data.name);
      setDate(data.dob);
      setUserstate(data.state);
      setUserstateName(data.state_name);
      setEmail(data.email);
      setLga(data.lga);
      setLgaName(data.lga_name);
      setPhone(data.phone);
      setUserId(data.id);
      setRole(data.roles[0]);
      setUserRoles(data.roles);
      setUserReports(data.reports);
      //const photo = data.photos[0].photo
      setImage(data.photos == null ? "" : data.photos.photo);
      setLoading(false);
      console.log("User:", result);
    } catch (error) {
      console.log(error);
    }
  };

  //Get single user
  const getRealUser = async () => {
    const userId = params.id;
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
      setRealUser(result.data);
      console.log("Real User:", result);
    } catch (error) {
      console.log(error);
    }
  };

  //Assign Role
  const addRole = async () => {
    try {
      const response = await fetch(
        `${API_BASE}/roles/assign/role/${role}/user/${userId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const result = await response.json();
      if (result.success) {
        alertMe.show("Role Added Successfully", { type: "success" });
      }
      console.log("Assign", result);
      getUser();
    } catch (error) {
      console.log(error);
    }
  };

  const assignState = async () => {
    try {
      const response = await fetch(
        `${API_BASE}/supervisor/state/${selectedAssigmentState}/assign/user/${userId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const result = await response.json();
      if (result.success) {
        setMessage("State Assigned Successfully");
      }
      console.log("Assign", result);
      getUser();
    } catch (error) {
      console.log(error);
    }
  };

  const assignLga = async () => {
    try {
      const response = await fetch(
        `${API_BASE}/supervisor/state/${selectedAssigmentState}/lga/${selectedAssigmentLga}/assign/user/${userId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const result = await response.json();
      if (result.success) {
        setMessage("LGA Added Successfully");
      }
      console.log("Assign", result);
      getUser();
    } catch (error) {
      console.log(error);
    }
  };

  //Detach Role
  const detachRole = async (id) => {
    try {
      const response = await fetch(
        `${API_BASE}/roles/detach/role/${id}/user/${userId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const result = await response.json();
      if (result.success) {
        alertMe.show("Role Detached Successfully", { type: "success" });
      }
      console.log("Detach", result);
      getUser();
    } catch (error) {
      console.log(error);
    }
  };

  const detachState = async (id) => {
    try {
      const response = await fetch(
        `${API_BASE}/supervisor/state/${id}/detach/user/${userId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const result = await response.json();
      if (result.success) {
        alertMe.show("State Detached Successfully", { type: "success" });
      }
      console.log("Detach", result);
      getUser();
    } catch (error) {
      console.log(error);
    }
  };

  const detachLga = async (id) => {
    try {
      const response = await fetch(
        `${API_BASE} /supervisor/lga/${id}/detach/user/${userId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const result = await response.json();
      if (result.success) {
        alertMe.show("LGA Detached Successfully", { type: "success" });
      }
      console.log("Detach", result);
      getUser();
    } catch (error) {
      console.log(error);
    }
  };

  //Assign Project
  const addProject = async () => {
    try {
      console.log("Project Id", projectId);
      const response = await fetch(
        `${API_BASE}/project/${projectId}/assign/user/${userId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const result = await response.json();
      console.log("Assign Project", result);
      if (result.success) {
        alertMe.show("Project Added Successfully", { type: "success" });
      }

      getProjects();
      getUser();
    } catch (error) {
      console.log(error);
    }
  };

  //Detach Project
  const detachProject = async (id) => {
    try {
      console.log("Project Id", id);
      const response = await fetch(
        `${API_BASE}/project/${id}/detach/user/${userId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const result = await response.json();
      console.log("Detach Project", result);
      if (result.success) {
        alertMe.show("Project Detached Successfully", { type: "success" });
      }

      getProjects();
      getUser();
    } catch (error) {
      console.log(error);
    }
  };

  const imageChnage = () => {
    console.log("Image Chnage");
  };

  const userReportz = user.reports;

  const handleApprove = async (id) => {
    const response = await fetch(`${API_BASE}/report/${id}/action/0`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    const result = await response.json();
    getUserReports();
  };

  const handleReject = async (id) => {
    const response = await fetch(`${API_BASE}/report/${id}/action/1`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    const result = await response.json();
    getUserReports();
  };

  React.useEffect(() => {
    getRoles();
    getProjects();
    getUser();
    getUserReports();
    getRealUser();
    getStates();
  }, []);

  React.useEffect(() => {
    getLgasByStateId();
  }, [state]);

  React.useEffect(() => {
    getLgasByStateAssignmentId();
  }, [selectedAssigmentState]);

  // getLgasByStateAssignmentId

  React.useEffect(() => {
    if (userRoles && userRoles.length > 0) {
      if (userRoles[0].name == "Supervisor") {
        user &&
          user.supervisorstate &&
          user.supervisorstate.length &&
          setUserAssignedStates(user.supervisorstate);
        // user &&
        //   user.supervisorslga &&
        //   user.supervisorslga.length &&
        //   setUserAssignedLgas(user.supervisorslga);
        // alert("Yes");
      } else {
        // alert("No");
      }
    }
  }, [userRoles]);

  const rolecolumns = [
    { selector: "name", name: "Roles", sortable: true },
    {
      selector: "id",
      name: "",
      cell: (row) => {
        return (
          <Item.Button
            className="user-button"
            onClick={() => detachRole(row.id)}
            color="warning"
            variant="contained"
          >
            Detach
          </Item.Button>
        );
      },
    },
  ];

  const statecolumns = [
    { selector: "name", name: "Assigned States", sortable: true },
    {
      selector: "id",
      name: "",
      cell: (row) => {
        return (
          <Item.Button
            className="user-button"
            onClick={() => detachState(row.id)}
            color="warning"
            variant="contained"
          >
            Detach
          </Item.Button>
        );
      },
    },
  ];

  const lgacolumns = [
    { selector: "name", name: "Assigned Lgas", sortable: true },
    {
      selector: "id",
      name: "",
      cell: (row) => {
        return (
          <Item.Button
            className="user-button"
            onClick={() => detachLga(row.id)}
            color="warning"
            variant="contained"
          >
            Detach
          </Item.Button>
        );
      },
    },
  ];
  const projectcolumns = [
    { selector: "title", name: "Projects", sortable: true },
    {
      selector: "id",
      name: "",
      cell: (row) => {
        return (
          <Item.Button
            className="user-button"
            onClick={() => detachProject(row.id)}
            color="warning"
            variant="contained"
          >
            Detach
          </Item.Button>
        );
      },
    },
  ];
  const reportcolumns = [
    {
      selector: "message",
      name: "Reports",
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
      name: "Coordinates",
      sortable: true,
      cell: (row) => {
        return (
          <div>
            <p>
              <span className="text-bolder">Lat: </span>
              {row.latitude},
            </p>
            <p>
              <span className="text-bolder">Long: </span>
              {row.longitude}
            </p>
          </div>
        );
      },
    },
    { selector: "status", name: "", sortable: true },
    {
      selector: "id",
      name: "Submitted",
      sortable: true,
      ignoreRowClick: true,
      cell: (row) => {
        return (
          <ReportModal
            status={row.status}
            photo1={`https://roadzoftserver.xyz/uploads/${row.photo_1}`}
            photo2={`https://roadzoftserver.xyz/uploads/${row.photo_2}`}
            photo3={`https://roadzoftserver.xyz/uploads/${row.photo_3}`}
            photo4={`https://roadzoftserver.xyz/uploads/${row.photo_4}`}
            latitude={row.latitude}
            longitude={row.longitude}
            approve={() => handleApprove(row.id)}
            reject={() => handleReject(row.id)}
          />
        );
      },
    },
  ];

  return (
    <div>
      <div className="flex flex-row justify-center">
        <div className="dashboard-left">
          <Sidebar />
        </div>

        <div className="dashboard-right">
          <Header user={realUser} title={title.toUpperCase()} />
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
          <div className="profile-picture flex flex-col justify-center items-center">
            <Stack direction="row" alignItems="center" spacing={2}>
              <label htmlFor="icon-button-file">
                <Input
                  onChange={handleImage}
                  accept="image/*"
                  id="icon-button-file"
                  type="file"
                />
                <IconButton
                  color="primary"
                  aria-label="upload picture"
                  component="span"
                >
                  <Item.Avatar
                    src={`https://roadzoftserver.xyz/uploads/avatar/${image}`}
                    style={{ height: 90, width: 90 }}
                    variant="circular"
                  />
                  {uploadedImage != "" && (
                    <Item.Avatar
                      src={uploadedImage}
                      style={{ height: 90, width: 90 }}
                      variant="circular"
                    />
                  )}
                </IconButton>
              </label>
            </Stack>
            <p>Tap to add profile picture (optional)</p>
            {photo != "" && (
              <Item.Button
                className="user-button"
                onClick={addImage}
                color="secondary"
                variant="contained"
              >
                Upload Image
              </Item.Button>
            )}
          </div>
          {loading ? (
            <Item.Box
              className="flex justify-center items-center"
              sx={{ display: "flex" }}
            >
              <Item.CircularProgress />
            </Item.Box>
          ) : (
            <form className="">
              {/* flex lg:flex-row md:flex-col sm:flex-col lg:justify-evenly md:justify-center sm:justify-center items-center */}
              <div className="">
                <div className="">
                  <div>
                    <div className="grid grid-cols-2 gap-4 p-2 bg-white pt-8 mx-2">
                      <TextField
                        className="sm:my-2"
                        style={{ minWidth: "50%" }}
                        placeholder="Type Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        id="outlined-basic"
                        label="Name"
                        variant="outlined"
                      />
                      <TextField
                        className="sm:my-2"
                        style={{ minWidth: "50%" }}
                        placeholder="Phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        id="outlined-basic"
                        label="Phone"
                        variant="outlined"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4 p-2 bg-white mx-2">
                      <Box sx={{ minWidth: "50%" }}>
                        <FormControl fullWidth>
                          <InputLabel id="demo-simple-select-label">
                            State
                          </InputLabel>
                          {user && (
                            <Select
                              labelId="demo-simple-select-label"
                              id="demo-simple-select"
                              value={state}
                              label={stateName}
                              onChange={handleStateChange}
                            >
                              <MenuItem value="">Select State</MenuItem>
                              {statesList &&
                                statesList.map((item, i) => (
                                  <MenuItem value={item.id} key={i}>
                                    {item.name}
                                  </MenuItem>
                                ))}
                            </Select>
                          )}
                        </FormControl>
                      </Box>
                      <Box sx={{ minWidth: "50%" }}>
                        <FormControl fullWidth>
                          <InputLabel id="demo-simple-select-label">
                            LGA
                          </InputLabel>
                          {user && (
                            <Select
                              labelId="demo-simple-select-label"
                              id="demo-simple-select"
                              value={lga}
                              label={lgaName}
                              onChange={(e) => setLga(e.target.value)}
                            >
                              <MenuItem value="">Select LGA</MenuItem>
                              {lgaByStateList &&
                                lgaByStateList.map((item, i) => (
                                  <MenuItem value={item.id} key={i}>
                                    {item.name}
                                  </MenuItem>
                                ))}
                            </Select>
                          )}
                        </FormControl>
                      </Box>
                    </div>
                    {/* <div className="my-3 flex flex-row justify-evenly items-center"></div> */}
                    <div className="grid grid-cols-2 gap-4 p-2 bg-white pb-8 mx-2">
                      <TextField
                        className="sm:my-2"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                        id="outlined-basic"
                        label="Email"
                        variant="outlined"
                      />

                      <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <Stack spacing={3}>
                          <DesktopDatePicker
                            label="Date of Birth"
                            inputFormat="dd/MM/yyyy"
                            value={date}
                            onChange={handleDate}
                            renderInput={(params) => <TextField {...params} />}
                          />
                        </Stack>
                      </LocalizationProvider>
                    </div>
                    <div className="my-3 flex flex-row justify-evenly items-center">
                      <Item.Button
                        className="user-button sm:my-2"
                        onClick={updateUser}
                        color="primary"
                        variant="contained"
                      >
                        Update User
                      </Item.Button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 p-2 bg-white mx-2">
                    <div>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">
                          Role
                        </InputLabel>
                        <Select
                          className="my-3"
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          defaultValue={userRoles[0]}
                          label="Role"
                          onChange={handleRoleChange}
                        >
                          {roles &&
                            roles
                              .filter((item) => item.name !== "Citizen")
                              .map((ro, i) => (
                                <MenuItem value={ro.id} key={i}>
                                  {ro.name}
                                </MenuItem>
                              ))}
                        </Select>
                      </FormControl>
                      <Item.Button
                        className="user-button"
                        onClick={addRole}
                        color="primary"
                        variant="contained"
                      >
                        Update Role
                      </Item.Button>
                    </div>

                    <div>
                      <div style={{ minWidth: "50%" }}>
                        <ProjectTable columns={rolecolumns} data={userRoles} />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 p-2 bg-white mx-2">
                    {userRoles &&
                      userRoles.length > 0 &&
                      userRoles[0].name == "Supervisor" && (
                        <div className="flex flex-col justify-start items-center my-5">
                          <Box sx={{ minWidth: "100%" }}>
                            <FormControl fullWidth>
                              <InputLabel id="demo-simple-select-label">
                                Assign to State
                              </InputLabel>
                              <Select
                                className="my-3"
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                defaultValue={userRoles[0]}
                                label="Role"
                                onChange={handleStateAssignmentChange}
                              >
                                {statesAssignmentList &&
                                  statesAssignmentList.map((ro, i) => (
                                    <MenuItem value={ro.id} key={i}>
                                      {ro.name}
                                    </MenuItem>
                                  ))}
                              </Select>
                            </FormControl>
                          </Box>
                          <Item.Button
                            className="user-button"
                            onClick={assignState}
                            color="primary"
                            variant="contained"
                          >
                            Assign State
                          </Item.Button>
                        </div>
                      )}

                    {userRoles &&
                      userRoles.length > 0 &&
                      userRoles[0].name == "Supervisor" && (
                        <ProjectTable
                          columns={statecolumns}
                          data={userAssignedStates}
                        />
                      )}
                  </div>

                  <div className="grid grid-cols-2 gap-4 p-2 bg-white mx-2">
                    <div>
                      <Box className="my-5" sx={{ minWidth: "100%" }}>
                        <FormControl fullWidth>
                          <InputLabel id="demo-simple-select-label">
                            Add to Project
                          </InputLabel>
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={projectId}
                            label="Project"
                            onChange={handleProjectChange}
                          >
                            {projects &&
                              projects.map((pro, i) => (
                                <MenuItem value={pro.id}>{pro.title}</MenuItem>
                              ))}
                          </Select>
                        </FormControl>
                      </Box>
                      <Item.Button
                        className="user-button"
                        onClick={addProject}
                        color="primary"
                        variant="contained"
                      >
                        Update Project
                      </Item.Button>
                    </div>

                    <ProjectTable
                      columns={projectcolumns}
                      data={userProjects}
                    />
                  </div>

                  {/* <div style={{ minWidth: "100%" }}>
                    <ProjectTable
                      columns={lgacolumns}
                      data={userAssignedlgas}
                    />
                  </div> */}
                </div>

                <div className="pt-20">
                  {/* 
                  <div className="flex flex-col justify-start items-center my-5">
                    <Box sx={{ minWidth: "100%" }}>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">
                          Assign to Local Government
                        </InputLabel>
                        <Select
                          className="my-3"
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          defaultValue={userRoles[0]}
                          label="Role"
                          onChange={handleLgaAssignmentChange}
                        >
                          {lgaByStateAssignmentList &&
                            lgaByStateAssignmentList.map((ro, i) => (
                              <MenuItem value={ro.id} key={i}>
                                {ro.name}
                              </MenuItem>
                            ))}
                        </Select>
                      </FormControl>
                    </Box>
                    <Item.Button
                      className="user-button"
                      onClick={assignLga}
                      color="primary"
                      variant="contained"
                    >
                      Assign LGA
                    </Item.Button>
                  </div> */}
                  <ProjectTable columns={reportcolumns} data={userReports} />
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default SingleUser;
