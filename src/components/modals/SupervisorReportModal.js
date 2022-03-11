import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import * as Item from "@mui/material";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import ReactMapGL, { Marker } from "react-map-gl";
import mapboxgl from "mapbox-gl";
import * as Icon from "react-feather";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  overflow: "scroll",
};

export default function SupervisorReportModal({
  status,
  approve,
  reject,
  query,
}) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // @ts-ignore
  // eslint-disable-next-line import/no-webpack-loader-syntax

  return (
    <div>
      <Button onClick={handleOpen}>Report Details</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Status:
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {status}
          </Typography>

          <div className="flex flex-row justify-between items-center my-5">
            <Item.Button onClick={approve} color="primary" variant="outlined">
              Approve
            </Item.Button>
            <Item.Button onClick={reject} color="error" variant="outlined">
              Reject
            </Item.Button>
            <Item.Button onClick={query} color="warning" variant="outlined">
              Query
            </Item.Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
