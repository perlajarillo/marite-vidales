import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Fab from "@material-ui/core/Fab";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";


const styles = makeStyles((theme) => ({
  actions: {
    display: "flex",
  },

  actionDelete: {
    margin: theme.spacing(1),
    backgroundColor: "#c62828",
    color: theme.palette.secondary.contrastText
  },
  fab: {
    margin: theme.spacing(1),
    paddingTop: 0,
  },

}));

export function ActionIcons(props) {
  const classes = styles();
  const {
    selectedItem,
    openEditDialog,
    handleOpenDeleteDialog,
    entryType
  } = props;

  const handleOpenEditDialog = () => {
    openEditDialog(selectedItem);
  };

  const onHandleOpenDeleteDialog = () => {
    handleOpenDeleteDialog(selectedItem, entryType);
  }

  return (<div className={classes.actions} >
    <Fab
      color="secondary"
      aria-label="edit"
      className={classes?.fab}
      sx={{ mr: 1 }}
      onClick={handleOpenEditDialog}
    >
      <EditIcon />
    </Fab>
    <Fab
      aria-label="delete"
      className={classes?.actionDelete}
      onClick={onHandleOpenDeleteDialog}
    >
      <DeleteIcon />
    </Fab>
  </div>);
};