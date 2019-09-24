import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import marite from "../../images/Mariteweb.jpg";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { Typography } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import BookIcon from "@material-ui/icons/Book";
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
  image: {
    with: "250px",
    height: "250px"
  },

  masthead: {
    textAlign: "center",
    color: "white",
    paddingTop: "50px",
    paddingBottom: "100px",
    paddingLeft: "50px",
    paddingRight: "50px",
    [theme.breakpoints.down("sm")]: {
      paddingLeft: "10px"
    }
  },
  paper: {
    padding: theme.spacing(4),
    margin: "auto"
  },

  info: { paddingRight: theme.spacing(4) },
  contentBlock: { paddingTop: theme.spacing(2) },
  text: {
    textAlign: "left",
    alignSelf: "left",
    fontSize: "0.85rem"
  },
  subtitle: {
    textAlign: "left",
    fontSize: "1.2rem",
    style: "bold",
    textTransform: "uppercase"
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
    marginLeft: 10
  },
  redButton: {
    margin: theme.spacing(1),
    backgroundColor: "#c62828",
    color: theme.palette.secondary.contrastText
  }
});

class SetBiography extends Component {
  constructor(props) {
    super(props);
    this.state = {
      summary: "",
      education: [],
      experience: [],
      pictureUrl: "",
      field: "",
      degree: "",
      institution: "",
      country: "",
      year: "",
      position: "",
      jobInstitution: "",
      jobCountry: "",
      start: "",
      end: "",
      openEducation: false,
      openExperience: false,
      openSnackbar: false,
      message: "",
      typeOfMessage: "success",
      key: "",
      educationTable: [],
      n: 0,
      index: 0,
      changes: new Map(),
      selectedEducation: "",
      keys: [],
      openDeleteEducation: false
    };
  }
  /**
   * componentDidMount – calls the method to bring the existing data
   * @returns {void}
   */
  componentDidMount = () => {
    this.observer = this.getBiography();
  };

  componentDidUpdate = () => {
    this.observer = this.getBiography();
  };
  /**
   * componentWillUnmount – set observer to null to avoid memory leaks
   * @returns {void}
   */
  componentWillUnmount = () => {
    this.observer = null;
  };

  /** handleChange sets in the state changes made in textfields
   *
   */
  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  /**
   * getBiography – bring the existing biography data from database
   * @returns {void}
   */
  getBiography = () => {
    if (this.props) {
      db.getBiography().then(snapshot => {
        let summary = snapshot.val().summary;
        let n = snapshot.child("education").numChildren();
        let educationTable = new Array(n);
        let education = snapshot.val().education;
        snapshot.val().education &&
          Object.keys(snapshot.val().education).map(edu => {
            educationTable[snapshot.val().education[edu].index] = {
              key: edu,
              i: snapshot.val().education[edu].index + 1
            };
          });
        let experience =
          snapshot.val().experience &&
          Object.keys(snapshot.val().experience).map(exp => {
            let ExpData = {
              key: exp,
              position: snapshot.val().experience[exp].position,
              institution: snapshot.val().experience[exp].institution,
              country: snapshot.val().experience[exp].country,
              start: snapshot.val().experience[exp].start,
              end: snapshot.val().experience[exp].end
            };
            return ExpData;
          });
        let url = snapshot.val().url ? snapshot.val().url : "";
        this.setState({
          summary: summary,
          education: education,
          experience: experience,
          pictureUrl: url,
          educationTable: educationTable,
          n: n,
          index: n
        });
      });
    }
  };

  handleOpenEducation = () => {
    this.setState({ openEducation: true, message: "" });
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
      key: ""
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
      db.setEducation(this.state.key, education).then(
        this.setState({
          openSnackbar: true,
          message: "A new item has been added to education!",
          typeOfMessage: "success",
          openEducation: false,
          field: "",
          degree: "",
          institution: "",
          country: "",
          year: "",
          key: ""
        })
      );
    } else {
      this.setState({
        message: "Fields with * are required"
      });
    }
  };

  /**
   * handleOpenDeleteEducation - display message to confirm entry deletion
   * @param {Object} entry to delete
   * @return {void}
   */
  handleOpenDeleteEducation = entry => {
    this.setState({ openDeleteEducation: true, selectedEducation: entry });
  };

  handleCloseDeleteEducation = () => {
    this.setState({ openDeleteEducation: false, selectedEducation: "" });
  };

  /**
   * deleteEducation - delete education entry
   * @return {void}
   */
  deleteEducation = () => {
    db.deleteEducation(this.state.selectedEducation, this.state.keys).then(
      this.setState({ openSnackbarDeleted: true })
    );
    this.handleClose();
    this.getBiography();
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
   * handleChangeEducationOrder - sets the order for an specific entry
   * in education
   * @param {Object} event the event object
   * @return {void}
   */
  handleChangeEducationOrder = event => {
    this.state.changes.set(event.target.name, parseInt(event.target.value, 10));
  };

  render() {
    const { classes } = this.props;
    const {
      summary,
      education,
      experience,
      url,
      field,
      degree,
      institution,
      country,
      year,
      openEducation,
      typeOfMessage,
      message,
      key,
      educationTable,
      n,
      openDeleteEducation,
      selectedEducation
    } = this.state;
    let listElements = [];
    for (let d = 1; d <= n; d++) {
      listElements.push(d);
    }
    return (
      <div className={classes.masthead}>
        <Typography variant="h4" color="secondary" gutterBottom>
          Marite Vidales' Biography
        </Typography>
        <Grid container spacing={2}>
          <Grid item sm={4} xs={12}>
            <Paper className={classes.paper}>
              <img
                src={marite}
                alt="Marite Vidales"
                className={classes.image}
              />
              <Typography variant="body2" gutterBottom>
                {summary}
              </Typography>
              <br></br>
              <Button variant="contained" color="secondary">
                Edit <EditIcon className={classes.icon} />
              </Button>
            </Paper>
          </Grid>

          <Grid item xs={12} sm={8}>
            <Paper className={classes.paper}>
              <Button
                variant="contained"
                color="secondary"
                onClick={this.handleOpenEducation}
              >
                Add education <BookIcon className={classes.icon} />
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={this.handleOpenEducation}
                className={classes.btn}
              >
                Confirm change order <UnfoldMoreIcon className={classes.icon} />
              </Button>
              <Typography variant="h6">Education </Typography>
              {education
                ? educationTable.map((e, x) => (
                    <div className={classes.contentBlock} key={e.key}>
                      <div className={classes.actions} key={e.key}>
                        <Fab
                          color="secondary"
                          aria-label="edit"
                          className={classes.fab}
                        >
                          <EditIcon />
                        </Fab>
                        <Fab
                          aria-label="delete"
                          className={classes.actionDelete}
                          onClick={() =>
                            this.handleOpenDeleteEducation(education[e.key])
                          }
                        >
                          <DeleteIcon />
                        </Fab>
                      </div>

                      <Typography className={classes.subtitle}>
                        {this.state.educationTable[x]["i"]}{" "}
                        {education[e.key].field}
                      </Typography>
                      <Typography variant="body2" className={classes.text}>
                        {education[e.key].degree}
                      </Typography>
                      <Typography variant="body2" className={classes.text}>
                        {education[e.key].institution}
                      </Typography>
                      <Typography variant="body2" className={classes.text}>
                        {education[e.key].country} {" ."}{" "}
                        {education[e.key].year}{" "}
                      </Typography>
                      <TextField
                        name={e.key}
                        placeholder="order"
                        helperText="Select a different order in list"
                        select
                        value={this.state.changes[e.key]}
                        defaultValue={this.state.educationTable[x]["i"]}
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
            <Paper className={classes.paper}>
              <Button variant="contained" color="secondary">
                Add professional experience{" "}
                <WorkIcon className={classes.icon} />
              </Button>
              <Typography variant="h6">Professional experience</Typography>
              {experience
                ? experience.map(x => (
                    <div className={classes.contentBlock} key={x.key}>
                      <div className={classes.actions}>
                        <Fab
                          color="secondary"
                          aria-label="edit"
                          className={classes.fab}
                        >
                          <EditIcon />
                        </Fab>
                        <Fab
                          aria-label="delete"
                          className={classes.actionDelete}
                        >
                          <DeleteIcon />
                        </Fab>
                      </div>
                      <Typography className={classes.subtitle}>
                        {x.position}
                      </Typography>
                      <Typography variant="body2" className={classes.text}>
                        {x.institution}
                      </Typography>
                      <Typography variant="body2" className={classes.text}>
                        {x.country} {" ."} {x.start}
                        {" - "}
                        {x.start}
                      </Typography>
                      <br></br>
                      <Divider />
                    </div>
                  ))
                : "No professional experience has been added yet!"}
            </Paper>
          </Grid>
        </Grid>
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
          open={this.openSnackbar}
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
      </div>
    );
  }
}

export default withStyles(styles)(SetBiography);
