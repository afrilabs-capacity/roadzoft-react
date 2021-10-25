import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import * as Item from "@mui/material"

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function ReportModal({
  status,
  photo1,
  photo2,
  photo3,
  photo4,
  latitude,
  longitude,
  approve,
  reject
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
            <img src={photo1} width="50px" alt="report image" />
            <img src={photo2} width="50px" alt="report image" />
            <img src={photo3} width="50px" alt="report image" />
            <img src={photo4} width="50px" alt="report image" />
          </div>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Coordinates:
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {latitude}/{longitude}
          </Typography>

          <Typography id="modal-modal-title" variant="h6" component="h2">
            Status:
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {status}
          </Typography>
          <div className="flex flex-row justify-between items-center my-5">
          <Item.Button onClick={approve} color="primary" variant="outlined">Approve</Item.Button><Item.Button onClick={reject} color="error" variant="outlined">Reject</Item.Button>
          </div>
        </Box>
        
      </Modal>
    </div>
  );
}
