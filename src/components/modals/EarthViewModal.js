import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Iframe from 'react-iframe'


const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "100%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function EarthView() {
  const [open, setOpen] = React.useState(false);
  const [projects, setProjects] = React.useState([]);
  const [filterTerm, setFilterTerm] = React.useState("")
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


  return (
    <div>
      <Button
        style={{ borderRadius: 50 }}
        color="primary"
        variant="contained"
        onClick={handleOpen}
      >
        Earth View
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
            <Iframe url="https://earth.google.com/web/search/9.0796393,7.4758355"
        id="myId"
        className="myClassname"
        display="initial"
        allowFullScreen
        position="relative"/>
         
        </Box>
      </Modal>
    </div>
  );
}
