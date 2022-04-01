import * as React from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import PersonIcon from "@mui/icons-material/Person";
import AddIcon from "@mui/icons-material/Add";
import Typography from "@mui/material/Typography";
import { blue } from "@mui/material/colors";
import { useHistory } from "react-router-dom";

const platforms = ["Ad-hoc", "Citizen","Supervisor"];

function SwitchDialog(props) {
  const { onClose, selectedValue, open } = props;
  const history = useHistory();

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value) => {
    if (value == "Ad-hoc") {
      localStorage.setItem("platform", "Ad-hoc");
      window.location.reload();
    } else if (value == "Citizen") {
      localStorage.setItem("platform", "Citizen");
      window.location.reload();
    } else if (value == "Supervisor") {
      localStorage.setItem("platform", "Supervisor");
      window.location.reload();
    }
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Switch to:</DialogTitle>
      <List sx={{ pt: 0 }}>
        {platforms.map((platform) => (
          <ListItem
            button
            onClick={() => handleListItemClick(platform)}
            key={platform}
          >
            <ListItemText primary={platform} />
          </ListItem>
        ))}
      </List>
    </Dialog>
  );
}

SwitchDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
};

export default function SwitchDialogDemo() {
  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState(platforms[1]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
    setSelectedValue(value);
  };

  return (
    <div>
      <div variant="outlined" onClick={handleClickOpen}>
        <div className="dashname-container center-item">
          <div className="dashname-wrapper">
            <p>Current View</p>
            <p
              onClick={() => console.log("You want to change dashboard?")}
              style={{ fontWeight: "bolder", cursor: "pointer" }}
            >
              {localStorage.getItem("platform")}
            </p>
          </div>
        </div>
      </div>
      <SwitchDialog
        selectedValue={selectedValue}
        open={open}
        onClose={handleClose}
      />
    </div>
  );
}
