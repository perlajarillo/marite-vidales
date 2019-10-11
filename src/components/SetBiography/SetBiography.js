import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import marite from "../../images/Mariteweb.jpg";
import Button from "@material-ui/core/Button";
import { Typography } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import EditIcon from "@material-ui/icons/Edit";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Snackbar from "@material-ui/core/Snackbar";
import SnackbarContentWrapper from "../SnackbarContentComponent/SnackbarContentComponent";
import SetExperience from "./SetExperience";
import SetEducation from "./SetEducation";
import TextField from "@material-ui/core/TextField";
import FormHelperText from "@material-ui/core/FormHelperText";
import CircularProgress from "@material-ui/core/CircularProgress";
import NoAuthenticated from "../NoAuthenticated/NoAuthenticated";
import { db } from "../../firebase";

const styles = theme => ({
  image: {
    with: "350px",
    height: "350px"
  },

  masthead: {
    textAlign: "center",
    color: "white",
    paddingTop: "50px",
    paddingBottom: "100px",
    paddingLeft: "50px",
    paddingRight: "50px",
    [theme.breakpoints.down("sm")]: {
      paddingLeft: "10px",
      paddingRight: "10px"
    }
  },
  paper: {
    padding: theme.spacing(4),
    margin: "auto"
  },

  button: {
    margin: theme.spacing(2),
    float: "right",
    [theme.breakpoints.down("sm")]: {
      float: "none"
    }
  },
  icon: {
    margin: theme.spacing(1)
  },
  error: {
    color: "red"
  },

  multiline: {
    whiteSpace: "pre-line",
    textAlign: "justify",
    fontSize: "0.98rem",
    paddingLeft: theme.spacing(10),
    paddingRight: theme.spacing(10),
    paddingTop: theme.spacing(4),
    [theme.breakpoints.down("sm")]: {
      paddingLeft: theme.spacing(1),
      paddingRight: theme.spacing(1)
    }
  }
});

class SetBiography extends Component {
  constructor(props) {
    super(props);
    this.state = {
      summary: "",
      education: [],
      experience: [],
      pictureUrl: marite,
      openSnackbar: false,
      message: "",
      typeOfMessage: "success",
      educationTable: [],
      n: 0,
      openSummary: false,
      pictureBlob: "",
      imageError: "",
      experienceTable: [],
      nExp: 0,
      newPictureUrl: marite,
      getBio: false
    };
  }
  /**
   * componentDidMount – calls the method to bring the existing data
   * @returns {void}
   */
  componentDidMount() {
    if (this.props.authUser !== null) {
      this.unregisterObserver = this.getBiography();
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props !== prevProps || this.state.getBio) {
      this.getBiography();
    }
  }
  /**
   * componentWillUnmount – set observer to null to avoid memory leaks
   * @returns {void}
   */
  componentWillUnmount() {
    this.unregisterObserver = null;
  }

  /** handleChange sets in the state changes made in text fields
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
    if (this.props.authUser) {
      db.getBiography().then(snapshot => {
        let summary = snapshot.val().summary;
        let n = snapshot.child("education").numChildren();
        let nExp = snapshot.child("experience").numChildren();
        let educationTable = new Array(n);
        let education = snapshot.val().education;
        snapshot.val().education &&
          Object.keys(snapshot.val().education).forEach(edu => {
            educationTable[snapshot.val().education[edu].index] = {
              key: edu,
              i: snapshot.val().education[edu].index + 1
            };
          });
        let experienceTable = new Array(nExp);
        let experience = snapshot.val().experience;
        for (let exp in experience) {
          experienceTable[experience[exp].index] = {
            key: exp,
            i: experience[exp].index + 1
          };
        }
        let url = snapshot.val().pictureUrl;

        this.setState({
          summary: summary,
          education: education,
          experience: experience,
          pictureUrl: url ? url : marite,
          newPictureUrl: url ? url : marite,
          educationTable: educationTable,
          experienceTable: experienceTable,
          n: n,
          nExp: nExp,
          getBio: false
        });
      });
    }
  };

  handleOpenSummary = () => {
    this.setState({
      openSummary: true,
      message: "",
      editSummary: this.state.summary
    });
  };

  onBio = () => {
    this.setState({
      getBio: true
    });
    console.log("onBio");
  };

  handleCloseSummary = () => {
    this.setState({
      openSummary: false,
      message: "",
      newPictureUrl: this.state.pictureUrl
    });
  };

  handleSaveSummary = e => {
    e.preventDefault();
    if (this.state.editSummary) {
      db.setSummary(this.state.editSummary, this.state.pictureBlob).then(() => {
        this.setState({
          openSummary: false,
          openSnackbar: true,
          message: "Summary updated!",
          typeOfMessage: "success",
          pictureUrl: this.state.newPictureUrl,
          getBio: true
        });
      });
    } else {
      this.setState({
        message: "Fields with * are required"
      });
    }
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
   * handlePicture - Creates a Blob objects and send it as an argument to
   * createObjectURL method, then sets the values of pictureUrl and pictureBlob
   * in the state if the size of the file is equal or les than 8MB
   * @returns void
   */
  handlePicture = event => {
    event.preventDefault();
    const currentFile = new Blob(event.target.files, { type: "image/png" });
    const size = event.target.files[0].size / 1024 / 1024;
    size <= 8
      ? this.setState({
          newPictureUrl: window.URL.createObjectURL(currentFile),
          pictureBlob: currentFile
        })
      : this.setState({
          sectionError: "The size of the image must be inferior to 8 MB.",
          message:
            "The size of the image must be inferior to 8 MB. This image will not be save, choose another.",
          openSnackbar: true
        });
  };

  render() {
    const { classes } = this.props;
    const {
      summary,
      education,
      experience,
      editSummary,
      typeOfMessage,
      message,
      pictureUrl,
      imageError,
      educationTable,
      n,
      openSummary,
      openSnackbar,
      experienceTable,
      nExp,
      newPictureUrl
    } = this.state;

    return this.props.authUser ? (
      <div className={classes.masthead}>
        <Typography variant="h4" color="secondary" gutterBottom>
          Marite Vidales' Biography
        </Typography>

        <Paper className={classes.paper}>
          <div>
            {" "}
            <img
              src={pictureUrl}
              alt="Marite Vidales"
              className={classes.image}
            />{" "}
            <Button
              variant="contained"
              color="secondary"
              onClick={this.handleOpenSummary}
              className={classes.button}
            >
              Edit <EditIcon className={classes.icon} />
            </Button>
          </div>

          <Typography
            variant="body2"
            gutterBottom
            className={classes.multiline}
          >
            {summary}
          </Typography>
          <br></br>
        </Paper>
        <SetEducation
          n={n}
          education={education}
          educationTable={educationTable}
          onBio={this.onBio}
        />
        <SetExperience
          n={nExp}
          experience={experience}
          experienceTable={experienceTable}
          onBio={this.onBio}
        />

        <Dialog
          open={openSummary}
          onClose={this.handleCloseSummary}
          aria-labelledby="form-dialog-title"
          fullScreen
        >
          <DialogTitle id="form-dialog-title">Summary</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Include summary and photo. All fields are required.
            </DialogContentText>
            <div className={classes.detailsStyles}>
              <div>
                <img
                  src={newPictureUrl}
                  alt="Marite Vidales"
                  className={classes.image}
                />
                <input
                  type="file"
                  id="picture"
                  name="picture"
                  accept=".jpg, .jpeg, .png"
                  onChange={this.handlePicture}
                />
                {imageError ? (
                  <FormHelperText error={true}>{imageError}</FormHelperText>
                ) : (
                  (pictureUrl === "NA" || pictureUrl === marite) && (
                    <FormHelperText>
                      Please upload an image inferior to 8MB.
                    </FormHelperText>
                  )
                )}
              </div>
              <TextField
                name="editSummary"
                placeholder="Artist statement"
                margin="normal"
                label="Summary/Statement: "
                fullWidth
                value={editSummary ? editSummary : summary}
                required
                multiline
                onChange={this.handleChange}
              />
            </div>
          </DialogContent>
          <DialogActions>
            <Typography variant="caption" className={classes.error}>
              {message}
            </Typography>
            <Button
              onClick={this.handleCloseSummary}
              className={classes.button}
              color="primary"
              variant="contained"
              type="button"
            >
              Cancel
            </Button>
            <Button
              onClick={this.handleSaveSummary}
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
      </div>
    ) : (
      <div className={classes.masthead}>
        <CircularProgress color="secondary" className={classes.progress} />
        <NoAuthenticated />
      </div>
    );
  }
}

export default withStyles(styles)(SetBiography);
