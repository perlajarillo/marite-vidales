import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import { db } from "../../firebase";
import { Typography } from "@material-ui/core";
import { v4 as uuidv4 } from 'uuid';


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
    e?.preventDefault();
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