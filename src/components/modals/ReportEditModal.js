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
import TextField from "@mui/material/TextField";

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

export default function ReportEditModal({
  data,
  edit
}) {


  const [comment, setComment] = React.useState("");  
  const [roadname, setRoadName] = React.useState("");
  const [roportId, setReportId] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

   React.useEffect(() => {
    setComment(data.message)
     setRoadName(data.stateroad)
     setReportId(data.id)
  }, [data]);

  return (
    <div>
      <Button onClick={handleOpen}>Edit</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
           <div className="grid  gap-4 p-2 bg-white pt-8 mx-2">
                      <TextField
                        className="sm:my-2"
                        style={{ minWidth: "50%" }}
                        placeholder="Comment"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        id="outlined-basic"
                        label="Comment"
                        variant="outlined"
                      />
                      <TextField
                        className="sm:my-2"
                        style={{ minWidth: "50%" }}
                        placeholder="Road Name"
                        value={roadname}
                        onChange={(e) => setRoadName(e.target.value)}
                        id="outlined-basic"
                        label="Road Name"
                        variant="outlined"
                      />
                    </div>

                      <div className="my-3 flex flex-row justify-evenly items-center">
                      <Item.Button
                        className="user-button sm:my-2"
                        onClick={()=>edit({message:comment,stateroad:roadname,id:roportId})}
                        color="primary"
                        variant="contained"
                        disabled={!roadname || !comment}
                        
                      >
                        Update Report
                      </Item.Button>

                       <Item.Button
                        className="user-button sm:my-2"
                        onClick={handleClose}
                        color="primary"
                        variant="contained"
                        disabled={!roadname || !comment}
                        
                      >
                       Close
                      </Item.Button>
                    </div>
        </Box>
      </Modal>
    </div>
  );
}
