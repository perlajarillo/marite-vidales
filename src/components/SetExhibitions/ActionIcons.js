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

export function ActionIcons() {
  const classes = styles();
  return (<div className={classes.actions} >
    <Fab
      color="secondary"
      aria-label="edit"
      className={classes?.fab}
      sx={{ mr: 1 }}
    /*  onClick={() =>
       this.handleEditEducation(education[e.key], e.key)
     } */
    >
      <EditIcon />
    </Fab>
    <Fab
      aria-label="delete"
      className={classes?.actionDelete}
    /*  onClick={() =>
       this.handleOpenDeleteEducation(education[e.key], e.key)
     } */
    >
      <DeleteIcon />
    </Fab>
  </div>);
};