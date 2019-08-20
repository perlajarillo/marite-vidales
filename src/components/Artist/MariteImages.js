import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import Typography from "@material-ui/core/Typography";
import { setSeriesFirebase } from "../../firebase/transactions";
import Snackbar from "@material-ui/core/Snackbar";
import SnackbarContentWrapper from "../SnackbarContentComponent/SnackbarContentComponent";
import * as R from "ramda";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import DeleteIcon from "@material-ui/icons/Delete";
import Fab from "@material-ui/core/Fab";
import { green } from "@material-ui/core/colors";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { withStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import NoAuthenticated from "../NoAuthenticated/NoAuthenticated";

const styles = makeStyles(theme => ({
  masthead: {
    textAlign: "center",
    paddingTop: "100px",
    paddingBottom: "100px",
    paddingLeft: "50px",
    marginLeft: 20,
    marginRight: 20,
    flexGrow: 1,
    [theme.breakpoints.up("xs")]: {
      paddingTop: "50px",
      paddingBottom: "100px",
      paddingLeft: "10px"
    }
  },
  button: {
    backgroundColor: "#00c853",
    marginBottom: 10,
    color: theme.palette.secondary.contrastText,
    fontSize: "1.05rem",
    fontFamily: '"Montserrat"',
    "&:hover": { backgroundColor: "#ffc400" }
  },
  formControl: {
    display: "block",
    margin: "10px 0"
  },
  textField: {
    [theme.breakpoints.up("xs")]: {
      width: 200
    },
    [theme.breakpoints.up("sm")]: {
      width: 400
    },
    [theme.breakpoints.up("md")]: {
      width: 450
    },

    [theme.breakpoints.between("sm", "md")]: {
      width: 250
    },
    [theme.breakpoints.only("lg")]: {
      width: 400
    }
  },
  fileArea: {
    backgroundColor: theme.palette.primary.dark,
    display: "flex",
    margin: "10px 30px",
    flexDirection: "column",
    flexWrap: "wrap",
    textAlign: "center"
  },
  content: {
    textAlign: "center",
    marginLeft: 10
  },

  thumb: {
    display: "inline-block",
    borderRadius: 2,
    width: 150,
    height: 150,

    textAlign: "center"
  },
  thumbsContainer: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 16,
    textAlign: "center"
  },
  thumbInner: {
    display: "inline-block",
    minWidth: 0,
    textAlign: "center",
    alignItems: "center"
  },
  detailsStyles: {
    display: "block"
  },
  img: {
    display: "block",
    width: "auto",
    height: "auto",
    maxHeight: "150px",
    maxWidth: "150px"
  },
  card: {
    margin: 10,
    [theme.breakpoints.down("xs")]: {
      width: 500
    }
  },
  dialog: {
    textAlign: "center",
    [theme.breakpoints.up("xs")]: {
      width: 250
    },
    [theme.breakpoints.up("sm")]: {
      width: 450
    },
    [theme.breakpoints.up("md")]: {
      width: 500
    },

    [theme.breakpoints.between("sm", "md")]: {
      width: 300
    },
    [theme.breakpoints.only("lg")]: {
      width: 450
    }
  },
  centerAlignment: {
    [theme.breakpoints.up("xs")]: {
      marginLeft: 10
    },
    [theme.breakpoints.up("sm")]: {
      marginLeft: 100
    },
    [theme.breakpoints.up("md")]: {
      marginLeft: 100
    },

    [theme.breakpoints.between("sm", "md")]: {
      marginLeft: 100
    },
    [theme.breakpoints.only("lg")]: {
      marginLeft: 100
    }
  },
  progress: {
    margin: theme.spacing(2)
  }
}));

const GreenCheckbox = withStyles({
  root: {
    color: green[400],
    "&$checked": {
      color: green[600]
    }
  },
  checked: {}
})(props => <Checkbox color="default" {...props} />);

export default function Maritemages(props) {
  const { authUser } = props;

  const classes = styles();
  const [series, setSeries] = useState({
    name: "",
    description: "",
    files: [],
    images_details: [],
    openSnackbarSaved: false,
    openSnackbarError: false,
    error: "",
    open: false,
    i: -1,
    cover: 0,
    mounted: false
  });

  const pushFiles = acceptedFiles => {
    const previousFiles = series.files;

    Array.prototype.push.apply(
      previousFiles,
      acceptedFiles.map(file =>
        Object.assign(file, {
          preview: URL.createObjectURL(file)
        })
      )
    );

    return previousFiles;
  };

  const setDetails = acceptedFiles => {
    const details = series.images_details;
    const newDetails = acceptedFiles.map(file =>
      Object.assign(
        {},
        {
          title: "",
          year: "",
          technique: "",
          measures: "",
          file: file.name,
          checked: true
        }
      )
    );
    Array.prototype.push.apply(details, newDetails);
    return details;
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    onDrop: acceptedFiles => {
      setSeries({
        ...series,
        files: pushFiles(acceptedFiles),
        images_details: setDetails(acceptedFiles)
      });
    }
  });

  /**
   * handleSnackbarClose - sets the actions when the snackbar is closed
   * @param {Object} event the event object
   * @param {Object} reason for closing the snackbar
   * @return {void}
   */
  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    series.openSnackbarSaved
      ? setSeries({ ...series, openSnackbarSaved: false })
      : setSeries({ ...series, openSnackbarError: false });
  };

  const handleClickOpen = i => e => {
    e.preventDefault();
    setSeries({ ...series, open: true, i: i });
  };

  const handleClose = () => {
    setSeries({ ...series, open: false });
  };

  const handleCoverChange = i => event => {
    setSeries({ ...series, cover: i });
  };

  const handleChange = name => event => {
    setSeries({ ...series, [name]: event.target.value });
  };

  const handleChangeDetails = name => event => {
    const detail = event.target.name;
    const detailsPath = R.lensPath([name, detail]);
    setSeries({
      ...series,
      images_details: R.set(
        detailsPath,
        event.target.value,
        series.images_details
      )
    });
  };

  const deleteImage = i => e => {
    e.preventDefault();
    const copyDetails = series.images_details;
    copyDetails.splice(i, 1);
    const copyFiles = series.files;
    copyFiles.splice(i, 1);
    setSeries({
      ...series,
      images_details: copyDetails,
      files: copyFiles,
      cover: i === series.cover ? 0 : series.cover
    });
  };

  const thumbs = series.files.map((file, i) => (
    <Card key={i} className={classes.card}>
      <CardContent>
        <div className={classes.thumb}>
          <div className={classes.thumbInner}>
            <img
              src={file.preview}
              alt={file.name}
              onClick={handleClickOpen(i)}
              className={classes.img}
            />
          </div>
        </div>
      </CardContent>
      <CardActions className={classes.detailsStyles}>
        <Fab aria-label="Delete" color="primary" onClick={deleteImage(i)}>
          <DeleteIcon />
        </Fab>
      </CardActions>
    </Card>
  ));

  /**
   * useEffect - Revokes the data uris to avoid memory leaks
   */
  useEffect(
    () => () => {
      series.files.forEach(file => URL.revokeObjectURL(file.preview));
    },
    [series.files]
  );

  const getPayload = () => {
    return R.pick(["name", "description", "images_details", "cover"], series);
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (series.name && series.description) {
      const s = getPayload();
      setSeriesFirebase(s, series.files)
        .then(() => {
          setSeries({ ...series, openSnackbarSaved: true });
        })
        .catch(error => {
          setSeries({ ...series, openSnackbarError: true, error: error });
        });
    } else {
      setSeries({
        ...series,
        openSnackbarError: true,
        error: "Please add the series name and description"
      });
    }
  };

  return authUser ? (
    <div className={classes.masthead}>
      <Typography variant="h4" color="textSecondary">
        New series of paintings
      </Typography>
      <form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <FormControl required className={classes.formControl}>
          <TextField
            id="series_name"
            label="Series name"
            placeholder="Series name"
            className={classes.textField}
            required
            margin="normal"
            value={series.name}
            onChange={handleChange("name")}
          />
        </FormControl>
        <FormControl required className={classes.formControl}>
          <TextField
            id="standard-textarea"
            label="Series description"
            placeholder="Series description"
            multiline
            required
            className={classes.textField}
            margin="normal"
            value={series.description}
            onChange={handleChange("description")}
          />
        </FormControl>
        <FormControl className={classes.formControl}>
          <Button color="secondary" className={classes.button} type="submit">
            Save
          </Button>
        </FormControl>
        <Typography variant="caption">Fields with * are required.</Typography>
        <div className={classes.content}>
          <div {...getRootProps({ className: "dropzone" })}>
            <input {...getInputProps()} />
            <div className={classes.fileArea}>
              Drag and drop the images here, or click to select files
            </div>
          </div>

          {series.files.length > 0 && (
            <div>
              <Typography variant="h5">
                Click in the image to include the details for each art work
              </Typography>
              <Typography variant="caption">
                To do this later, leave in blank and click in save.
              </Typography>
              <aside className={classes.thumbsContainer}>{thumbs}</aside>
            </div>
          )}
        </div>

        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left"
          }}
          open={series.openSnackbarSaved}
          autoHideDuration={3000}
          onClose={handleSnackbarClose}
          id="openSnackbarSaved"
          name="openSnackbarSaved"
        >
          <SnackbarContentWrapper
            onClose={handleSnackbarClose}
            variant="success"
            message="The series have been save!"
          />
        </Snackbar>
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left"
          }}
          open={series.openSnackbarError}
          autoHideDuration={3000}
          onClose={handleSnackbarClose}
          id="openSnackbarError"
          name="openSnackbarError"
        >
          <SnackbarContentWrapper
            onClose={handleSnackbarClose}
            variant="error"
            message={series.error}
          />
        </Snackbar>
        {series.i !== -1 && (
          <Dialog
            open={series.open}
            onClose={handleClose}
            aria-labelledby="form-dialog-title"
          >
            <DialogTitle id="form-dialog-title">Image details</DialogTitle>
            <DialogContent
              className={(classes.dialog, classes.centerAlignment)}
            >
              <div className={classes.centerAlignment}>
                <div className={classes.thumb}>
                  <div className={classes.thumbInner}>
                    <img
                      src={series.files[series.i].preview}
                      alt={series.files[series.i].name}
                      onClick={handleClickOpen(series.i)}
                      className={classes.img}
                    />
                  </div>
                </div>
              </div>

              <div className={classes.detailsStyles}>
                <TextField
                  name="title"
                  placeholder="Title"
                  margin="normal"
                  label="Work art title: "
                  className={classes.textField}
                  value={series.images_details[series.i].title}
                  onChange={handleChangeDetails(series.i)}
                />
                <TextField
                  name="year"
                  placeholder="Year"
                  margin="normal"
                  label="Year: "
                  className={classes.textField}
                  value={series.images_details[series.i].year}
                  onChange={handleChangeDetails(series.i)}
                />
              </div>

              <div className={classes.detailsStyles}>
                <TextField
                  name="technique"
                  placeholder="Technique"
                  margin="normal"
                  label="Technique: "
                  className={classes.textField}
                  value={series.images_details[series.i].technique}
                  onChange={handleChangeDetails(series.i)}
                />
                <TextField
                  name="measures"
                  placeholder="Measures"
                  margin="normal"
                  label="Measures: "
                  className={classes.textField}
                  value={series.images_details[series.i].measures}
                  onChange={handleChangeDetails(series.i)}
                />{" "}
                <FormControlLabel
                  control={
                    <GreenCheckbox
                      checked={series.i === series.cover}
                      onChange={handleCoverChange(series.i)}
                      value="cover"
                    />
                  }
                  label="Mark as series cover"
                />
              </div>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={handleClose}
                className={classes.button}
                color="primary"
              >
                Close
              </Button>
            </DialogActions>
          </Dialog>
        )}
      </form>
    </div>
  ) : (
    <div className={classes.masthead}>
      <CircularProgress color="secondary" className={classes.progress} />
      <NoAuthenticated />
    </div>
  );
}
