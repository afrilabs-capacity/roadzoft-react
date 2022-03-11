import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Popover from "@mui/material/Popover";
import * as Item from "@mui/material";
import { API_BASE } from "../../utils/Api";
import Moment from "react-moment";
import ProjectTable from "../../components/tables/ProjectTable";
import QueryReadModal from "./QueryReadModal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function SupervisorReportQuery({
  uuid,
  reject,
  query,
  reportId,
}) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [comments, setComments] = React.useState([]);
  const [page, setPage] = React.useState(1);
  const [totalPages, setTotalPages] = React.useState(1);
  const countPerPage = 20;
  const [comment, setComment] = React.useState("");
  const [message, setMessage] = React.useState("");

  const getComments = async () => {
    const response = await fetch(
      `${API_BASE}/supervisor/queried/${uuid}?page=${page}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    const result = await response.json();
    result && setComments(result.data.data);
    setTotalPages(result.data.total);
    console.log("Comments", result);
  };

  const postComments = async () => {
    const response = await fetch(`${API_BASE}/supervisor/queried`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        report_id: reportId,
        comment: comment,
      }),
    });
    const result = await response.json();
    getComments();
    setComment("");
    console.log("Comments", result);
  };
  const approve = async (commentId) => {
    console.log("Report ID", uuid);
    console.log("Comment Id", commentId);
    const response = await fetch(`${API_BASE}/supervisor/queried/approve`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        report_uuid: uuid,
        comment_uuid: commentId,
      }),
    });
    const result = await response.json();
    setMessage(result.message);
    getComments();
    console.log("Comments", result);
  };

  React.useEffect(() => {
    getComments();
  }, [page]);

  const columns = [
    {
      selector: "comment",
      name: "Comment",
      sortable: true,
      cell: (row) => {
        return <QueryReadModal message={row.comment} />;
      },
    },
    { selector: "type", name: "Type", sortable: true },
    {
      selector: "created_at",
      name: "Date",
      sortable: true,
      ignoreRowClick: true,
      cell: (row) => {
        return <Moment fromNow>{row.created_at}</Moment>;
      },
    },
    {
      selector: "id",
      name: "",
      sortable: true,
      ignoreRowClick: true,
      cell: (row) => {
        // alert(localStorage.getItem("roles"));
        return (
          JSON.parse(localStorage.getItem("roles"))[0].name !== "Supervisor" &&
          row.type == "Supervisor" && (
            <Item.Button
              onClick={() => approve(row.uuid)}
              color="primary"
              variant="outlined"
            >
              Approve
            </Item.Button>
          )
        );
      },
    },
  ];

  return (
    <div>
      <Button onClick={handleOpen}>Report Queries</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {message != "" && (
            <Item.Alert color="info" variant="filled">
              {message}
            </Item.Alert>
          )}
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Comments:
          </Typography>

          {comments != [] ? (
            <ProjectTable
              columns={columns}
              data={comments}
              total={totalPages}
              countPerPage={countPerPage}
              changePage={(pageProject) => setPage(pageProject)}
            />
          ) : (
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              No Comments for this report
            </Typography>
          )}
          <div className="flex flex-row justify-evenly items-center my-5">
            <Item.TextField
              style={{ width: 500 }}
              onChange={(e) => setComment(e.target.value)}
              value={comment}
              id="outlined-textarea"
              label="Comment"
              placeholder="Comment..."
              multiline
            />
            <Item.Button
              onClick={postComments}
              color="success"
              variant="contained"
            >
              Post
            </Item.Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
