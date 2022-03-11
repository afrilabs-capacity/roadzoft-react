import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import * as Item from "@mui/material";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import ReactMapGL, { Marker } from "react-map-gl";
// import mapboxgl from "mapbox-gl";
import * as Icon from "react-feather";

// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
// mapboxgl.workerClass =
//   require("worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker").default;

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

export default function ReportModal({
  status,
  photo1,
  photo2,
  photo3,
  photo4,
  latitude,
  longitude,
  apiKey,
  approve,
  reject,
  query,
}) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
          <div className="grid grid-cols-2 gap-4">
            <Zoom>
              <img src={photo1} width="50px" alt="report image" />
            </Zoom>
            {photo2 != null && (
              <Zoom>
                <img src={photo2} width="50px" alt="report image" />
              </Zoom>
            )}
            {photo3 != null && (
              <Zoom>
                <img src={photo3} width="50px" alt="report image" />
              </Zoom>
            )}
            {photo4 != null && (
              <Zoom>
                <img src={photo4} width="50px" alt="report image" />
              </Zoom>
            )}
          </div>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Coordinates:
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {latitude}/{longitude}
          </Typography>
          <div style={{ width: 450, height: 200 }}>
            {/* <ReactMapGL
              mapboxApiAccessToken={apiKey}
              latitude={latitude}
              longitude={longitude}
              zoom={11}
              width="100%"
              height="100%"
            >
              <Marker
                latitude={latitude}
                longitude={longitude}
                offsetLeft={250}
                offsetTop={120}
              >
                <Icon.MapPin size={30} fill="red" />
              </Marker>
            </ReactMapGL> */}
          </div>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Status:
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {status}
          </Typography>

          {JSON.parse(localStorage.getItem("roles"))[0].name !==
            "Supervisor" && (
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
          )}
        </Box>
      </Modal>
    </div>
  );
}
