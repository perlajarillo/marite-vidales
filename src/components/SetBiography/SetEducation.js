import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { Typography } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import BookIcon from "@material-ui/icons/Book";
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
    paddingTop: 0,
    [theme.breakpoints.down("sm")]: {
      float: "none"
    }
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
    marginRight: 0,
    [theme.breakpoints.down("sm")]: {
      marginTop: theme.spacing(1)
    }
  },
  redButton: {
    margin: theme.spacing(1),
    backgroundColor: "#c62828",
    color: theme.palette.secondary.contrastText
  }
});

class SetEducation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      institution: "",
      country: "",
      field: "",
      degree: "",
      year: "",
      openEducation: false,
      openSnackbar: false,
      message: "",
      typeOfMessage: "success",
      key: "",
      index: 0,
      changes: new Map(),
      keys: [],
      openChanges: false,
      selectedIndex: "",
      openDeleteEducation: false,
      selectedEducation: ""
    };
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleIndexChanges = () => {
    this.setState({ openChanges: true });
  };

  handleCloseIndexChanges = () => {
    this.setState({ openChanges: false });
  };

  setIndexChanges = e => {
    e.preventDefault();
    const { n, educationTable } = this.props;
    const { changes } = this.state;
    if (changes) {
      let x = 0;
      let selectedKeys = new Set();
      while (n > x) {
        selectedKeys.add(
          document.getElementById([educationTable[x]["key"]]).value
        );
        x++;
      }

      if (selectedKeys.size === n) {
        db.setEducationIndex(changes)
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

  handleCloseEducation = () => {
    this.setState({
      openEducation: false,
      field: "",
      degree: "",
      institution: "",
      country: "",
      year: "",
      message: "",
      key: "",
      selectedIndex: ""
    });
  };

  getEducationPayload = () => {
    return R.pick(
      ["field", "degree", "institution", "country", "year", "index"],
      this.state
    );
  };

  handleSaveEducation = e => {
    e.preventDefault();
    if (
      this.state.field &&
      this.state.degree &&
      this.state.institution &&
      this.state.country &&
      this.state.year
    ) {
      const education = this.getEducationPayload();
      db.setEducation(this.state.key, education).then(() => {
        this.setState({
          openSnackbar: true,
          message: "Item has been saved!",
          typeOfMessage: "success",
          openEducation: false,
          field: "",
          degree: "",
          institution: "",
          country: "",
          year: "",
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
   * handleEditEducation - set entry data in state to be displayed in dialog
   * @param {Object} entry to edit
   * @param {Object} key to edit
   * @return {void}
   */
  handleEditEducation = (entry, k) => {
    this.setState({
      openEducation: true,
      field: entry.field,
      degree: entry.degree,
      institution: entry.institution,
      country: entry.country,
      year: entry.year,
      index: entry.index,
      key: k
    });
  };
  /**
   * handleOpenDeleteEducation - display message to confirm entry deletion
   * @param {Object} entry to delete
   * @return {void}
   */
  handleOpenDeleteEducation = (entry, k) => {
    this.setState({
      openDeleteEducation: true,
      selectedEducation: entry,
      key: k
    });
  };

  handleCloseDeleteEducation = () => {
    this.setState({ openDeleteEducation: false, selectedEducation: "" });
  };

  /**
   * deleteEducation - delete education entry
   * @return {void}
   */
  deleteEducation = () => {
    let index =
      this.state.selectedEducation.index + 1 < this.props.n
        ? this.state.selectedEducation.index
        : null;
    db.deleteEducation(this.state.key, index)
      .then(() => {
        this.setState({
          openSnackbarDeleted: true,
          openDeleteEducation: false,
          selectedEducation: ""
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

  handleOpenEducation = () => {
    this.setState({
      openEducation: true,
      message: "",
      index:
        this.state.selectedIndex !== ""
          ? this.state.selectedIndex
          : this.props.n
    });
  };

  /**
   * handleChangeEducationOrder - sets the order for an specific entry
   * in education
   * @param {Object} event the event object
   * @return {void}
   */
  handleChangeEducationOrder = event => {
    this.state.changes.set(event.target.name, parseInt(event.target.value, 10));
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

  render() {
    const { classes, education, n, educationTable } = this.props;
    const {
      institution,
      country,
      field,
      degree,
      year,
      openEducation,
      typeOfMessage,
      message,
      openDeleteEducation,
      selectedEducation,
      openChanges,
      openSnackbar
    } = this.state;

    let listElements = [];
    for (let d = 1; d <= this.props.n; d++) {
      listElements.push(d);
    }
    return (
      <div>
        <Paper className={classes.paper}>
          <Button
            variant="contained"
            color="secondary"
            onClick={this.handleOpenEducation}
            className={classes.btn}
          >
            Add education <BookIcon className={classes.icon} />
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={this.handleIndexChanges}
            className={classes.btn}
          >
            Confirm change education order{" "}
            <UnfoldMoreIcon className={classes.icon} />
          </Button>
          <Typography variant="h6">Education </Typography>
          {educationTable
            ? educationTable.map((e, x) => (
                <div className={classes.contentBlock} key={e.key}>
                  <div className={classes.actions} key={e.key}>
                    <Fab
                      color="secondary"
                      aria-label="edit"
                      className={classes.fab}
                      onClick={() =>
                        this.handleEditEducation(education[e.key], e.key)
                      }
                    >
                      <EditIcon />
                    </Fab>
                    <Fab
                      aria-label="delete"
                      className={classes.actionDelete}
                      onClick={() =>
                        this.handleOpenDeleteEducation(education[e.key], e.key)
                      }
                    >
                      <DeleteIcon />
                    </Fab>
                  </div>

                  <Typography variant="body2" className={classes.text}>
                    {educationTable[x]["i"] + ". "}
                    {education[e.key].field + ". "}
                    {education[e.key].degree + ". "}
                    {education[e.key].institution + ". "}
                    {education[e.key].country + ". "}
                    {education[e.key].year}{" "}
                  </Typography>
                  <TextField
                    name={e.key}
                    id={e.key}
                    placeholder="order"
                    helperText="Select a different order in list"
                    select
                    value={this.state.changes[e.key]}
                    defaultValue={this.props && educationTable[x]["i"]}
                    SelectProps={{
                      native: true,
                      MenuProps: {
                        className: classes.menu
                      }
                    }}
                    className={classes.index}
                    onChange={this.handleChangeEducationOrder}
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
              ))
            : "No education has been added yet!"}
        </Paper>

        <Dialog
          open={openEducation}
          onClose={this.handleCloseEducation}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Image details</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Fill the next fields to add to education. All fields are required.
            </DialogContentText>
            <div className={classes.detailsStyles}>
              <TextField
                name="field"
                placeholder="e.g. visual arts, history of art, etc."
                margin="normal"
                label="Field of study: "
                fullWidth
                value={field}
                required
                onChange={this.handleChange}
              />
              <TextField
                name="degree"
                placeholder="e.g. bachelors, certificate, course, etc."
                margin="normal"
                label="Degree: "
                fullWidth
                value={degree}
                required
                onChange={this.handleChange}
              />
              <TextField
                name="institution"
                placeholder="Institution"
                margin="normal"
                label="Institution: "
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
                name="year"
                placeholder="Year/Period e.g. 1970, January - February 2014"
                margin="normal"
                label="Completion Year (or expected): "
                fullWidth
                value={year}
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
              onClick={this.handleCloseEducation}
              className={classes.button}
              color="primary"
              variant="contained"
              type="button"
            >
              Cancel
            </Button>
            <Button
              onClick={this.handleSaveEducation}
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
          open={openDeleteEducation}
          onClose={this.handleCloseDeleteEducation}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title" color="secondary">
            {"Delete " + selectedEducation.field + " entry?"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are you sure you want to delete this entry? This action can NOT be
              undone.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={this.deleteEducation}
              variant="contained"
              className={classes.redButton}
            >
              Yes
            </Button>
            <Button
              onClick={this.handleCloseDeleteEducation}
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
          onClose={this.handleCloseIndexChanges}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title" color="secondary">
            {"Change entries ordet?"}
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
    );
  }
}

export default withStyles(styles)(SetEducation);
