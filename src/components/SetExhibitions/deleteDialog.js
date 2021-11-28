import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { db } from "../../firebase";

const styles = makeStyles((theme) => ({

  redButton: {
    margin: theme.spacing(1),
    backgroundColor: "#c62828",
    color: theme.palette.secondary.contrastText
  },

}));

export const EntryType = {
  Solo: "Solo",
  Juried: "Juried",
  Group: "Group",
  GrantAward: "GrantAward",
  Gallery: "Gallery"
};


export const DeleteDialog = (props) => {
  const { openDeleteDialog, entryType, handleCloseDeleteDialog, selectedItem } = props;
  const classes = styles();
  const Completed = true;
  const IsError = true;

  const deleteEntry = () => {
    if (!selectedItem?.key) {
      handleCloseDeleteDialog(!Completed, IsError);
    }
    else {
      switch (entryType) {
        case EntryType.GrantAward:
          db.deleteGrantAward(selectedItem.key).then(() => {
            handleCloseDeleteDialog(Completed, !IsError);
          });
          break;
        case EntryType.Gallery:
          db.deleteGallery(selectedItem.key).then(() => {
            handleCloseDeleteDialog(Completed, !IsError);
          });
          break;
        case EntryType.Juried:
          db.deleteJuriedExhibit(selectedItem.key).then(() => {
            handleCloseDeleteDialog(Completed, !IsError);
          });
          break;
        case EntryType.Solo:
          db.deleteSoloExhibit(selectedItem.key).then(() => {
            handleCloseDeleteDialog(Completed, !IsError);
          });
          break;
        case EntryType.Group:
          db.deleteGroupExhibit(selectedItem.key).then(() => {
            handleCloseDeleteDialog(Completed, !IsError);
          });
          break;
        default:
          handleCloseDeleteDialog(!Completed, IsError);
          break;
      }
    }
  }

  return <Dialog
    open={openDeleteDialog}
    onClose={handleCloseDeleteDialog}
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description"
  >
    <DialogTitle id="alert-dialog-title" color="secondary">
      {"Delete " + entryType + " entry?"}
    </DialogTitle>
    <DialogContent>
      <DialogContentText id="alert-dialog-description">
        Are you sure you want to delete this entry? This action can NOT be
        undone.
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button
        onClick={deleteEntry}
        variant="contained"
        className={classes.redButton}
      >
        Yes
      </Button>
      <Button
        onClick={() => handleCloseDeleteDialog(!Completed, !IsError)}
        color="secondary"
        autoFocus
        variant="contained"
      >
        No
      </Button>
    </DialogActions>
  </Dialog>
}