import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { Typography } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import WorkIcon from "@material-ui/icons/Work";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import UnfoldMoreIcon from "@material-ui/icons/UnfoldMore";
import Divider from "@material-ui/core/Divider";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Snackbar from "@material-ui/core/Snackbar";
import SnackbarContentWrapper from "../SnackbarContentComponent/SnackbarContentComponent";
import TextField from "@material-ui/core/TextField";
import Fab from "@material-ui/core/Fab";
import { db } from "../../firebase";
import * as R from "ramda";

const styles = theme => ({
  paper: {
    padding: theme.spacing(4),
    margin: "auto"
  },

  contentBlock: { paddingTop: theme.spacing(2) },
  text: {
    textAlign: "left",
    alignSelf: "left",
    fontSize: "0.98rem",
    paddingLeft: theme.spacing(10),
    paddingRight: theme.spacing(10),
    [theme.breakpoints.down("sm")]: {
      paddingLeft: theme.spacing(1),
      paddingRight: theme.spacing(1)
    }
  },

  button: {
    margin: theme.spacing(2),
    float: "right"
  },
  icon: {
    margin: theme.spacing(1)
  },
  error: {
    color: "red"
  },

  actionDelete: {
    margin: theme.spacing(1),
    backgroundColor: "#c62828",
    color: theme.palette.secondary.contrastText
  },
  fab: {
    margin: theme.spacing(1),
    paddingTop: 0
  },
  actions: {
    float: "right"
  },
  index: {
    display: "inline-block",
    textAlign: "center"
  },
  btn: {
    marginLeft: 10,
    [theme.breakpoints.down("sm")]: {
      margin: theme.spacing(2)
    }
  },
  redButton: {
    margin: theme.spacing(1),
    backgroundColor: "#c62828",
    color: theme.palette.secondary.contrastText
  }
});

class SetExperience extends Component {
  constructor(props) {
    super(props);
    this.state = {
      institution: "",
      country: "",
      dates: "",
      position: "",
      openExperience: false,
      openSnackbar: false,
      message: "",
      typeOfMessage: "success",
      key: "",
      index: 0,
      changes: new Map(),
      keys: [],
      openChanges: false,
      selectedIndex: "",
      openDeleteExperience: false,
      selectedExperience: ""
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      //console.log(prevProps);
      this.setState({
        n: this.props.n
      });
    }
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleOpenExperience = () => {
    this.setState({
      openExperience: true,
      message: "",
      index: this.state.selectedIndex !== "" ? this.state.selectedIndex : 0
    });
  };

  handleIndexChanges = () => {
    this.setState({ openChanges: true });
  };

  handleCloseIndexChanges = () => {
    this.setState({ openChanges: false });
  };

  setIndexChanges = e => {
    e.preventDefault();
    const { n, experienceTable } = this.props;
    const { changes } = this.state;
    if (changes) {
      let x = 0;
      let selectedKeys = new Set();
      while (n > x) {
        selectedKeys.add(
          document.getElementById([experienceTable[x]["key"]]).value
        );
        x++;
      }

      if (selectedKeys.size === n) {
        db.setExperienceIndex(changes)
          .then(() => {
            this.setState({
              openChanges: false,
              openSnackbar: true,
              message: "The changes were made successfully!",
              typeOfMessage: "success",
              changes: new Map()
            });
            this.props.onBio();
          })
          .catch(() => {
            this.setState({
              openChanges: false,
              openSnackbar: true,
              message: "Something went wrong, try again!",
              typeOfMessage: "error"
            });
          });
      } else {
        this.setState({
          openChanges: false,
          openSnackbar: true,
          message: "Please select a different number for each entry.",
          typeOfMessage: "error"
        });
      }
    }
  };

  handleCloseExperience = () => {
    this.setState({
      openExperience: false,
      position: "",
      institution: "",
      country: "",
      dates: "",
      message: "",
      key: "",
      selectedIndex: ""
    });
  };

  getExperiencePayload = () => {
    return R.pick(
      ["position", "institution", "country", "dates", "index"],
      this.state
    );
  };

  handleSaveExperience = e => {
    e.preventDefault();
    if (
      this.state.position &&
      this.state.institution &&
      this.state.country &&
      this.state.dates
    ) {
      const experience = this.getExperiencePayload();
      db.setExperience(
        this.state.key,
        experience,
        this.props.experienceTable
      ).then(() => {
        this.setState({
          openSnackbar: true,
          message: "Item has been saved!",
          typeOfMessage: "success",
          openExperience: false,
          position: "",
          institution: "",
          country: "",
          dates: "",
          key: "",
          selectedIndex: ""
        });
        this.props.onBio();
      });
    } else {
      this.setState({
        message: "Fields with * are required"
      });
    }
  };

  /**
   * handleEditExperience - set entry data in state to be displayed in dialog
   * @param {Object} entry to edit
   * @param {Object} key to edit
   * @return {void}
   */
  handleEditExperience = (entry, k) => {
    this.setState({
      openExperience: true,
      position: entry.position,
      institution: entry.institution,
      country: entry.country,
      dates: entry.dates,
      index: entry.index,
      key: k
    });
  };
  /**
   * handleOpenDeleteExperience - display message to confirm entry deletion
   * @param {Object} entry to delete
   * @return {void}
   */
  handleOpenDeleteExperience = (entry, k) => {
    this.setState({
      openDeleteExperience: true,
      selectedExperience: entry,
      key: k
    });
  };

  handleCloseDeleteExperience = () => {
    this.setState({ openDeleteExperience: false, selectedExperience: "" });
  };

  /**
   * deleteExperience - delete experience entry
   * @return {void}
   */
  deleteExperience = () => {
    let index =
      this.state.selectedExperience.index + 1 < this.props.n
        ? this.state.selectedExperience.index
        : null;

    db.deleteExperience(this.state.key, index)
      .then(() => {
        this.setState({
          openSnackbarDeleted: true,
          openDeleteExperience: false,
          selectedExperience: ""
        });
        this.props.onBio();
      })
      .catch(e => {
        this.setState({
          openSnackbar: true,
          typeOfMessage: "error",
          message: "Something went wrong! Try again."
        });
      });
  };
  /**
   * handleSnackbarClose - sets the actions when the snackbar is closed
   * @param {Object} event the event object
   * @param {Object} reason for closing the snackbar
   * @return {void}
   */
  handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    this.setState({
      openSnackbar: false,
      typeOfMessage: "success",
      message: ""
    });
  };

  /**
   * handleChangeExperienceOrder - sets the order for an specific entry
   * in experience
   * @param {Object} event the event object
   * @return {void}
   */
  handleChangeExperienceOrder = event => {
    this.state.changes.set(event.target.name, parseInt(event.target.value, 10));
  };

  render() {
    const { classes, experience, n, experienceTable } = this.props;
    const {
      position,
      institution,
      country,
      dates,
      openExperience,
      typeOfMessage,
      message,
      openDeleteExperience,
      selectedExperience,
      openChanges,
      openSnackbar
    } = this.state;

    let listElements = [];

    for (let d = 1; d <= n; d++) {
      listElements.push(d);
    }
    return (
      this.props && (
        <div>
          <Paper className={classes.paper}>
            <Button
              variant="contained"
              color="secondary"
              onClick={this.handleOpenExperience}
            >
              Add professional experience <WorkIcon className={classes.icon} />
            </Button>
            {experienceTable.length > 0 && (
              <Button
                variant="contained"
                color="secondary"
                onClick={this.handleIndexChanges}
                className={classes.btn}
              >
                Confirm change experience order{" "}
                <UnfoldMoreIcon className={classes.icon} />
              </Button>
            )}
            <Typography variant="h6">Professional experience</Typography>
            {experienceTable
              ? experienceTable.map(
                  (e, x) =>
                    experienceTable[x]["i"] !== null && (
                      <div className={classes.contentBlock} key={e.key}>
                        <div className={classes.actions}>
                          <Fab
                            color="secondary"
                            aria-label="edit"
                            className={classes.fab}
                            onClick={() =>
                              this.handleEditExperience(
                                experience[e.key],
                                e.key
                              )
                            }
                          >
                            <EditIcon />
                          </Fab>
                          <Fab
                            aria-label="delete"
                            className={classes.actionDelete}
                            onClick={() =>
                              this.handleOpenDeleteExperience(
                                experience[e.key],
                                e.key
                              )
                            }
                          >
                            <DeleteIcon />
                          </Fab>
                        </div>
                        <Typography variant="body2" className={classes.text}>
                          {experienceTable[x]["i"] + ". "}{" "}
                          {experience[e.key].position + ". "}
                          {experience[e.key].institution + ". "}
                          {experience[e.key].country + ". "}{" "}
                          {experience[e.key].dates}
                        </Typography>
                        <TextField
                          name={e.key}
                          id={e.key}
                          placeholder="order"
                          helperText="Select a different order in list"
                          select
                          value={this.state.changes[e.key]}
                          defaultValue={e.i}
                          SelectProps={{
                            native: true,
                            MenuProps: {
                              className: classes.menu
                            }
                          }}
                          className={classes.index}
                          onChange={this.handleChangeExperienceOrder}
                        >
                          {listElements.map(l => (
                            <option key={l} value={l}>
                              {l}
                            </option>
                          ))}
                          }
                        </TextField>
                        <br></br>
                        <Divider />
                      </div>
                    )
                )
              : "No professional experience has been added yet!"}
          </Paper>

          <Dialog
            open={openExperience}
            onClose={this.handleCloseExperience}
            aria-labelledby="form-dialog-title"
          >
            <DialogTitle id="form-dialog-title">Experience details</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Fill the next fields to add a new entry to professional
                experience. All fields are required.
              </DialogContentText>
              <div className={classes.detailsStyles}>
                <TextField
                  name="position"
                  placeholder="e.g. art teacher, juror, exposition guide."
                  margin="normal"
                  label="Position/Rol: "
                  fullWidth
                  value={position}
                  required
                  onChange={this.handleChange}
                />
                <TextField
                  name="institution"
                  placeholder="name of the event, museum, etc."
                  margin="normal"
                  label="Institution/Place: "
                  fullWidth
                  value={institution}
                  required
                  onChange={this.handleChange}
                />
                <TextField
                  name="country"
                  placeholder="City, Country: "
                  margin="normal"
                  label="Country: "
                  fullWidth
                  value={country}
                  required
                  onChange={this.handleChange}
                />
                <TextField
                  name="dates"
                  placeholder="Year/Period e.g. 1970, January - February 2014"
                  margin="normal"
                  label="Period of time (start-end): "
                  fullWidth
                  value={dates}
                  required
                  onChange={this.handleChange}
                />
              </div>
            </DialogContent>
            <DialogActions>
              <Typography variant="caption" className={classes.error}>
                {message}
              </Typography>
              <Button
                onClick={this.handleCloseExperience}
                className={classes.button}
                color="primary"
                variant="contained"
                type="button"
              >
                Cancel
              </Button>
              <Button
                onClick={this.handleSaveExperience}
                className={classes.button}
                color="secondary"
                variant="contained"
                type="submit"
              >
                Save
              </Button>
            </DialogActions>
          </Dialog>

          <Snackbar
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left"
            }}
            open={openSnackbar}
            autoHideDuration={3000}
            onClose={this.handleSnackbarClose}
            id="openSnackbarError"
            name="openSnackbarError"
          >
            <SnackbarContentWrapper
              onClose={this.handleSnackbarClose}
              variant={typeOfMessage}
              message={message}
            />
          </Snackbar>
          <Dialog
            open={openDeleteExperience}
            onClose={this.handleCloseDeleteExperience}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title" color="secondary">
              {"Delete " + selectedExperience.position + " entry?"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Are you sure you want to delete this entry? This action can NOT
                be undone.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={this.deleteExperience}
                variant="contained"
                className={classes.redButton}
              >
                Yes
              </Button>
              <Button
                onClick={this.handleCloseDeleteExperience}
                color="secondary"
                autoFocus
                variant="contained"
              >
                No
              </Button>
            </DialogActions>
          </Dialog>
          <Dialog
            open={openChanges}
            onClose={this.handleCloseDeleteExperience}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title" color="secondary">
              {"Change entries order?"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Are you sure you want to change the entries order?.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={this.setIndexChanges}
                variant="contained"
                className={classes.redButton}
              >
                Yes
              </Button>
              <Button
                onClick={this.handleCloseIndexChanges}
                color="secondary"
                autoFocus
                variant="contained"
              >
                No
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      )
    );
  }
}

export default withStyles(styles)(SetExperience);
