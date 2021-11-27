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

const ExhibitionType = {
  Solo: "Selected Solo",
  Juried: "Selected Juried",
  Group: "Selected Group"
};

const ExhibitionDialog = (props) => {
  const [dates, setDates] = useState(undefined);
  const [name, setName] = useState(undefined);
  const [place, setPlace] = useState(undefined);
  const [year, setYear] = useState(undefined);
  const [message, setMessage] = useState(undefined)
  const [key, setKey] = useState("");
  const {
    openExhibitions,
    toggleOpenExhibitions,
    exhibitionType,
    getExhibitsData,
    selectedItem,
    setSnackbarMessage
  } = props;
  const addEditText = selectedItem ? "Edit" : "Add";
  useEffect(() => {
    setDates(selectedItem?.dates);
    setName(selectedItem?.name);
    setPlace(selectedItem?.place);
    setYear(selectedItem?.year);
    setKey(selectedItem?.key || "");
  }, [props, selectedItem]);
  const addedOrEdited = addEditText === "Add" ? "added" : "edited";
  const onSaveExhibition = (e) => {
    e.preventDefault();
    if (dates && name && place && year) {
      const data = {
        dates,
        name,
        place,
        year
      };
      switch (exhibitionType) {
        case (ExhibitionType.Group):
          db.setGroupExhibition(key, data).then(() => {
            getExhibitsData();
            setSnackbarMessage(`Group exhibition has been ${addedOrEdited}`);
            onClose();
          });
          break;
        case (ExhibitionType.Juried):
          db.setJuriedExhibition(key, data).then(() => {
            getExhibitsData();
            setSnackbarMessage(`Juried exhibition has been ${addedOrEdited}`);
            onClose();
          });
          break;
        case (ExhibitionType.Solo):
          db.setSoloExhibition(key, data).then(() => {
            getExhibitsData();
            setSnackbarMessage(`Solo exhibition has been ${addedOrEdited}`);
            onClose();
          });
          break;
        default:
          break;
      }
    } else {
      setMessage("Fields with * are required");
    };
  }

  const onClose = e => {
    e?.preventDefault();
    if (!selectedItem) {
      setDates(undefined);
      setName(undefined);
      setPlace(undefined);
      setYear(undefined);
    }
    setMessage(undefined);
    toggleOpenExhibitions();
  }
  return (
    < Dialog
      open={openExhibitions}
      onClose={onClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">{addEditText} {exhibitionType} Exhibition</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Fill the next fields to add a exhibition. All fields are required.
        </DialogContentText>
        <div>
          <TextField
            name="dates"
            placeholder="from-to e.g. November 5-29 or September 15- October 15"
            margin="normal"
            label="Dates: "
            fullWidth
            value={dates}
            required
            onChange={e => setDates(e.target.value)}
          />
          <TextField
            name="name"
            placeholder="Name of the exhibition"
            margin="normal"
            label="Name: "
            fullWidth
            value={name}
            required
            onChange={e => setName(e.target.value)}
          />
          <TextField
            name="place"
            placeholder="e.g. Design Studio Art Gallery, Hyattsville, Maryland"
            margin="normal"
            label="Place: "
            fullWidth
            value={place}
            required
            onChange={e => setPlace(e.target.value)}
          />
          <TextField
            name="Year"
            placeholder="e.g. 2021"
            margin="normal"
            label="Year: "
            fullWidth
            value={year}
            required
            onChange={e => setYear(e.target.value)}
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
          onClick={onSaveExhibition}
          color="secondary"
          variant="contained"
          type="submit"
        >
          Save
        </Button>
      </DialogActions>
    </Dialog >
  )
}

export default ExhibitionDialog;