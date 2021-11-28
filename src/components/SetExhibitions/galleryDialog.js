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


const GalleryDialog = (props) => {
  const {
    openGalleries,
    toggleOpenGalleries,
    getExhibitsData,
    selectedItem,
    setSnackbarMessage
  } = props;
  const [address, setAddress] = useState(undefined);
  const [gallery, setGallery] = useState(undefined);
  const [message, setMessage] = useState(undefined);
  const [key, setKey] = useState("");
  const addEditText = selectedItem ? "Edit" : "Add";

  useEffect(() => {
    setAddress(selectedItem?.address);
    setGallery(selectedItem?.gallery);
    setKey(selectedItem?.key || "");
  }, [selectedItem]);

  const onSaveGallery = (e) => {
    e.preventDefault();
    if (address && gallery) {
      const data = {
        address,
        gallery
      };
      db.setGallery(key, data).then(() => {
        getExhibitsData();
        onClose();
        const addedOrEdited = addEditText === "Add" ? "added" : "edited";
        setSnackbarMessage(`Galery has been ${addedOrEdited}`);
      });
    } else {
      setMessage("Fields with * are required");
    };
  }

  const onClose = e => {
    e?.preventDefault();
    if (!selectedItem) {
      setAddress(undefined);
      setGallery(undefined);
    }
    setMessage(undefined);
    toggleOpenGalleries()
  }

  return (
    <Dialog
      open={openGalleries}
      onClose={onClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">{addEditText} Gallery</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Fill the next fields to add a gallery. All fields are required.
        </DialogContentText>
        <div>
          <TextField
            name="address"
            placeholder="Street, state, country"
            margin="normal"
            label="Address: "
            fullWidth
            value={address}
            required
            multiline
            onChange={e => setAddress(e.target.value)}
          />
          <TextField
            name="gallery"
            placeholder="Name of the gallery"
            margin="normal"
            label="Gallery: "
            fullWidth
            value={gallery}
            required
            multiline
            onChange={e => setGallery(e.target.value)}
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
          onClick={onSaveGallery}
          color="secondary"
          variant="contained"
          type="submit"
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>)
};

export default GalleryDialog;