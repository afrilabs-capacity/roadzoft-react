import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import * as Item from "@mui/material";
import Logo from "../assets/images/logo.png";
import { API_BASE } from "../utils/Api";
import { useHistory } from "react-router-dom";

export default function Landing() {
  const history = useHistory();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [message, setMessage] = React.useState("");

  const handleLogin = async () => {
    console.log(email);
    console.log(password);
    const response = await fetch(`${API_BASE}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        phone: email,
        password: password,
        auth_type: "phone",
      }),
    });
    const result = await response.json();

    if (!result.data) {
      setMessage(result.message);
    } else {
      localStorage.setItem("token", result.access_token);
      localStorage.setItem("user", result.data.id);
      localStorage.setItem(
        "roles",
        result.data.roles.map((role) => role.name)
      );
      history.push("/dashboard");
    }
    console.log("Login", result);
  };

  return (
    <div className="login-container flex justify-center items-center">
      <div className="login-wrapper overlay p-6 max-w-sm mx-auto bg-white rounded-xl shadow-md flex flex-col items-center space">
        <div className="flex flex-col justify-between items-center mb-5">
          <img src={Logo} width="90" alt="Ferma Logo" />
          <h2 style={{ color: "#064E3B" }} className="text-2xl font-bold my-5">
            ROADZOFT
          </h2>
        </div>
        <div className="flex flex-col justify-between items-center mb-5">
          <h4 style={{ color: "#064E3B" }} className="text-xl font-bold">
            Welcome, Tom West
          </h4>
          <p style={{ color: "#017831" }} className="text-xs">
            Select a dashboard to proceed.
          </p>
        </div>

        <div className="flex flex-col justify-center items-center mb-5 w-full">
          <Button
            onClick={() => {
              localStorage.setItem("platform", "Ad-hoc");
              history.push("/dashboard");
            }}
            className="w-full bg-green-900 mb-5"
            color="success"
            variant="contained"
          >
            <span className="capitalize">Ad-hoc Dashboard</span>
          </Button>
        </div>
        <div className="flex flex-col justify-center items-center mb-5 w-full">
          <Button
            onClick={() => {
              localStorage.setItem("platform", "Citizen");
              history.push("/dashboard");
            }}
            className="w-full bg-green-900 mb-3"
            color="success"
            variant="outlined"
          >
            <span style={{ color: "#017831" }} className="capitalize">
              Citizen Dashboard
            </span>
          </Button>
        </div>

        <div className="flex flex-col justify-center items-center mb-5 w-full">
          <Button
            onClick={() => {
              localStorage.setItem("platform", "Supervisor");
              history.push("/dashboard");
            }}
            className="w-full bg-green-900 mb-3"
            color="success"
            variant="outlined"
          >
            <span style={{ color: "#017831" }} className="capitalize">
              Supervisor
            </span>
          </Button>
        </div>

        {message != "" && (
          <Item.Alert color="info" variant="filled">
            {message}
          </Item.Alert>
        )}
      </div>
    </div>
  );
}
