import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import { db } from "../../firebase";
import { Typography } from "@mui/material";


const GrantAwardDialog = (props) => {
  const [grantAward, setGrantAward] = useState(undefined);
  const [message, setMessage] = useState(undefined);
  const [key, setKey] = useState("");
  const {
    openGrantsAndAwards,
    toggleOpenGrantsAndAwards,
    getExhibitsData,
    selectedItem,
    setSnackbarMessage
  } = props;
  const addEditText = selectedItem ? "Edit" : "Add";
  const addedOrEdited = addEditText === "Add" ? "added" : "edited";

  useEffect(() => {
    setGrantAward(selectedItem?.grantAward);
    setKey(selectedItem?.key || "");
  }, [selectedItem]);

  const onSaveGrantAward = (e) => {
    e.preventDefault();
    if (grantAward) {
      db.setGrantsAndAwards(key, grantAward).then(() => {
        getExhibitsData();
        setSnackbarMessage(`Solo exhibition has been ${addedOrEdited}`);
        onClose();
      });
    } else {
      setMessage("Fields with * are required");
    };
  }

  const onClose = e => {
    e && e.preventDefault();
    if (!selectedItem) {
      setGrantAward(undefined);
    }
    setMessage(undefined);
    toggleOpenGrantsAndAwards();
  }

  return (
    <Dialog
      open={openGrantsAndAwards}
      onClose={onClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">{addEditText} Grant/Award</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Fill the next fields to add a gallery. All fields are required.
        </DialogContentText>
        <div>
          <TextField
            name="grantAward"
            placeholder="Award/Grant, event/date, place"
            margin="normal"
            label="Grant/Award: "
            fullWidth
            value={grantAward}
            required
            multiline
            onChange={e => setGrantAward(e.target.value)}
          />
        </div>
      </DialogContent>
      <DialogActions>
        <Typography variant="caption" color="error">
          {message}
        </Typography>
        <Button
          onClick={onClose}
          color="primary"
          variant="contained"
          type="button"
        >
          Cancel
        </Button>
        <Button
          onClick={onSaveGrantAward}
          color="secondary"
          variant="contained"
          type="submit"
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default GrantAwardDialog;