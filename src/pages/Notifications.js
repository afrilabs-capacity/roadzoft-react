import React from "react";
import LargeCard from "../components/cards/LargeCard";
import TopCards from "../components/cards/TopCards";
import Header from "../components/header/Header";
import Sidebar from "../components/sidebar/Sidebar";
import * as Item from "@mui/material";
import Moment from "react-moment";
import ProjectTable from "../components/tables/ProjectTable";
import { API_BASE } from "../utils/Api";
import { Link } from "react-router-dom";

function Notifications() {
  const [user, setUser] = React.useState({});
  const [userLog, setUserLog] = React.useState([]);
  const [page, setPage] = React.useState(1);
  const [totalPages, setTotalPages] = React.useState(1);
  const countPerPage = 20;
  const title = "Notifications";

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

      result && setUser(result);
    } catch (error) {
      console.log(error);
    }
  };

  const getUserLogs = async () => {
    const response = fetch(`${API_BASE}/logs/users?page=${page}`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    const result = await (await response).json();
    // setUserLog(result.data.data);
    // setTotalPages(result.data.total);
    // console.log("User Log", result);
  };

  React.useEffect(() => {
    getUser();
  }, []);
  React.useEffect(() => {
    getUserLogs();
  }, [page]);

  const userColumns = [
    {
      selector: "affected_model",
      name: "Notifications",
      cell: (row) => {
        return row.affected_model == null ? (
          "No item to show"
        ) : (
          <Link to={`/user-profile/${row.affected_model.id}`}>
            {row.affected_model.name} {row.description}
          </Link>
        );
      },
    },
  ];

  const columns = [
    {
      selector: "image",
      name: "Image",
      cell: (row) => {
        return <Item.Avatar src={row.image} variant="square" />;
      },
    },
    { selector: "report", name: "Report", sortable: true },
    { selector: "coordinates", name: "Coordinates", sortable: true },
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
      selector: "status",
      name: "Status",
      ignoreRowClick: true,
      cell: (row) => {
        return <Item.Badge variant="standard">{row.status}</Item.Badge>;
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
          <Header user={user} title={title.toUpperCase()} />

          <hr />
          {/* <ProjectTable columns={columns} data={data} /> */}
          <div className="bg-white p-10 text-center">
            {userLog == [] ? (
              <p>No new notifications</p>
            ) : (
              <ProjectTable
                data={userLog}
                columns={userColumns}
                total={totalPages}
                countPerPage={countPerPage}
                changePage={(page) => setPage(page)}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Notifications;
