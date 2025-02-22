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
import Divider from "@material-ui/core/Divider";
import { Redirect } from "react-router-dom";

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
    marginBottom: 10,
    color: theme.palette.secondary.contrastText,
    fontSize: "1.05rem",
    maxWidth: 500,
    alignSelf: "center"
  },
  formControl: {
    display: "flex",
    margin: "10px 30px",
    marginLeft: 40,
    textAlign: "center"
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
  formControlDialog: {
    display: "block",
    margin: "10px 0"
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

export default function SetSeries(props) {
  const classes = styles();
  const setSelectedSeries = p => {
    let name = "";
    let description = "";
    let images_details = [];
    let cover = 0;
    let key = "";
    let isInTopSeries = false;
    let order = 1;
    if (p.location.state) {
      if (p.location.state.series) {
        let series = p.location.state.series;
        name = series.name;
        description = series.description;
        images_details = series.images_details;
        cover = series.cover;
        key = series.key;
        isInTopSeries = series.isInTopSeries;
        order = series.order;
      }
    }

    return {
      name: name,
      description: description,
      key: key,
      files: [],
      images_details: images_details,
      openSnackbarSaved: false,
      openSnackbarError: false,
      error: "",
      open: false,
      i: -1,
      cover: cover,
      j: -1,
      openSaved: false,
      saved_images: images_details.filter(
        currentImage => currentImage.url !== ""
      ),
      toDelete: [],
      returnMySeries: false,
      isInTopSeries: isInTopSeries,
      order: order
    };
  };

  /**
   * Lazy initial state: The initialState argument is the state used during the
   * initial render. In subsequent renders, it is disregarded.
   */
  const [series, setSeries] = useState(() => {
    const initialState = setSelectedSeries(props);
    return initialState;
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
          collectionType: "",
          file: file.name,
          checked: true,
          isTopTen: false
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
      ? setSeries({ ...series, openSnackbarSaved: false, returnMySeries: true })
      : setSeries({ ...series, openSnackbarError: false });
  };

  const handleClickOpen = i => e => {
    e.preventDefault();
    setSeries({ ...series, open: true, i: i });
  };

  const handleClickOpenSaved = j => e => {
    e.preventDefault();
    setSeries({ ...series, openSaved: true, j: j });
  };

  const handleClose = () => {
    setSeries({ ...series, open: false, i: -1 });
  };

  const handleCloseSaved = () => {
    setSeries({ ...series, openSaved: false, j: -1 });
  };

  const handleCoverChange = i => event => {
    setSeries({ ...series, cover: i });
  };

  const handleMarkAsTopSeries = name => event => {
    setSeries({ ...series, [name]: event.target.checked });
  };

  const handleIsTopTen = name => event => {
    const detail = event.target.name;
    const detailsPath = R.lensPath([name, detail]);
    setSeries({
      ...series,
      images_details: R.set(
        detailsPath,
        event.target.checked,
        series.images_details
      )
    });
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
    let updatedCover =
      i + series.saved_images.length < series.cover
        ? series.cover - 1
        : series.cover;
    let newCover =
      i + series.saved_images.length === series.cover ? 0 : updatedCover;
    const copyDetails = series.images_details;
    copyDetails.splice(i + series.saved_images.length, 1);
    const copyFiles = series.files;
    copyFiles.splice(i, 1);
    setSeries({
      ...series,
      images_details: copyDetails,
      files: copyFiles,
      cover: newCover
    });
  };

  const deleteSavedImage = i => e => {
    e.preventDefault();
    let updatedCover = i < series.cover ? series.cover - 1 : series.cover;
    let newCover = i === series.cover ? 0 : updatedCover;
    series.toDelete.push(series.saved_images[i].file);
    const copyDetails = series.images_details;
    copyDetails.splice(i, 1);
    const copySavedImages = series.saved_images;
    copySavedImages.splice(i, 1);
    setSeries({
      ...series,
      images_details: copyDetails,
      saved_images: copySavedImages,
      cover: newCover
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

  const thumbsPreviouslySaved = series.saved_images.map((image, i) => (
    <Card key={i} className={classes.card}>
      <CardContent>
        <div className={classes.thumb}>
          <div className={classes.thumbInner}>
            <img
              src={image.url}
              alt={image.title}
              onClick={handleClickOpenSaved(i)}
              className={classes.img}
            />
          </div>
        </div>
      </CardContent>
      <CardActions className={classes.detailsStyles}>
        <Fab aria-label="Delete" color="primary" onClick={deleteSavedImage(i)}>
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
    return R.pick(["name", "description", "images_details", "cover", "isInTopSeries", "order"], series);
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (series.name && series.description && series.images_details.length > 0) {
      const s = getPayload();
      setSeriesFirebase(
        s,
        series.key,
        series.files,
        series.toDelete,
        series.saved_images.length
      )
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
        error: "Please add the series name, description and at least 1 art work"
      });
    }
  };
  let n = series.saved_images.length;
  return props.authUser ? (
    <div className={classes.masthead}>
      {series.returnMySeries && (
        <Redirect
          to={{
            pathname: "/myseries"
          }}
        />
      )}
      <Typography variant="h4" color="textSecondary">
        {!series.name ? "New series of paintings" : series.name + " series"}
      </Typography>
      <form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <FormControl required className={classes.formControl}>
          <TextField
            id="series_name"
            label="Series name"
            placeholder="Series name"
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
            margin="normal"
            value={series.description}
            onChange={handleChange("description")}
          />
        </FormControl>
        <FormControl required className={classes.formControl}>
          <TextField
            id="standard-textarea"
            label="Order"
            placeholder="Series order: 1, 2, 3, etc."
            multiline
            required
            margin="normal"
            value={series.order}
            onChange={handleChange("order")}
          />
        </FormControl>
        <FormControlLabel
          className={classes.formControl}
          control={
            <GreenCheckbox
              checked={series.isInTopSeries}
              onChange={handleMarkAsTopSeries('isInTopSeries')}
              value="isInTopSeries"
            />
          }
          label="Mark as top series"
        />
        <FormControl className={classes.formControl}>
          <Button
            color="secondary"
            variant="contained"
            className={classes.button}
            type="submit"
          >
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
          {series.saved_images.length > 0 && (
            <div>
              <Typography variant="h5">Current art in this series</Typography>

              <div className={classes.thumbsContainer}>
                {thumbsPreviouslySaved}
              </div>
              <Divider />
            </div>
          )}
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
                  value={series.images_details[series.i + n].title}
                  onChange={handleChangeDetails(series.i + n)}
                />
                <TextField
                  name="year"
                  placeholder="Year"
                  margin="normal"
                  label="Year: "
                  className={classes.textField}
                  value={series.images_details[series.i + n].year}
                  onChange={handleChangeDetails(series.i + n)}
                />
              </div>

              <div className={classes.detailsStyles}>
                <TextField
                  name="technique"
                  placeholder="Technique"
                  margin="normal"
                  label="Technique: "
                  className={classes.textField}
                  value={series.images_details[series.i + n].technique}
                  onChange={handleChangeDetails(series.i + n)}
                />
                <TextField
                  name="measures"
                  placeholder="Measures"
                  margin="normal"
                  label="Measures: "
                  className={classes.textField}
                  value={series.images_details[series.i + n].measures}
                  onChange={handleChangeDetails(series.i + n)}
                />
                <TextField
                  name="collectionType"
                  placeholder="Collection Type: e.g. Private Collection"
                  margin="normal"
                  label="Collection Type: "
                  className={classes.textField}
                  value={series.images_details[series.i + n].collectionType}
                  onChange={handleChangeDetails(series.i + n)}
                />
                <TextField
                  name="order"
                  placeholder="Display as: 1, 2, 3... in the list"
                  margin="normal"
                  label="Order: "
                  className={classes.textField}
                  value={series.images_details[series.i + n].order}
                  onChange={handleChangeDetails(series.i + n)}
                />
                <FormControlLabel
                  control={
                    <GreenCheckbox
                      checked={series.i + n === series.cover}
                      onChange={handleCoverChange(series.i + n)}
                      value="cover"
                    />
                  }
                  label="Mark as series cover"
                />
                <FormControlLabel
                  control={
                    <GreenCheckbox
                      name="isTopTen"
                      checked={series.images_details[series.i + n].isTopTen}
                      onChange={handleIsTopTen(series.i + n)}
                      value="isTopTen"
                    />
                  }
                  label="Mark as top ten"
                />
              </div>
            </DialogContent>
            <DialogActions>
              <Button
                color="secondary"
                variant="contained"
                onClick={handleClose}
                className={classes.button}
              >
                Close
              </Button>
            </DialogActions>
          </Dialog>
        )}
        {series.j !== -1 && (
          <Dialog
            open={series.openSaved}
            onClose={handleCloseSaved}
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
                      src={series.images_details[series.j].url}
                      alt={series.images_details[series.j].title}
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
                  value={series.images_details[series.j].title}
                  onChange={handleChangeDetails(series.j)}
                />
                <TextField
                  name="year"
                  placeholder="Year"
                  margin="normal"
                  label="Year: "
                  className={classes.textField}
                  value={series.images_details[series.j].year}
                  onChange={handleChangeDetails(series.j)}
                />
              </div>

              <div className={classes.detailsStyles}>
                <TextField
                  name="technique"
                  placeholder="Technique"
                  margin="normal"
                  label="Technique: "
                  className={classes.textField}
                  value={series.images_details[series.j].technique}
                  onChange={handleChangeDetails(series.j)}
                />
                <TextField
                  name="measures"
                  placeholder="Measures"
                  margin="normal"
                  label="Measures: "
                  className={classes.textField}
                  value={series.images_details[series.j].measures}
                  onChange={handleChangeDetails(series.j)}
                />
                <TextField
                  name="collectionType"
                  placeholder="Collection Type: e.g. Private Collection"
                  margin="normal"
                  label="Collection Type: "
                  className={classes.textField}
                  value={series.images_details[series.j].collectionType}
                  onChange={handleChangeDetails(series.j)}
                />
                <TextField
                  name="order"
                  placeholder="Display as: 1, 2, 3... in the list"
                  margin="normal"
                  label="Order: "
                  className={classes.textField}
                  value={series.images_details[series.j].order}
                  onChange={handleChangeDetails(series.j)}
                />
                <FormControlLabel
                  control={
                    <GreenCheckbox
                      checked={series.j === series.cover}
                      onChange={handleCoverChange(series.j)}
                      value="cover"
                    />
                  }
                  label="Mark as series cover"
                />
                <FormControlLabel
                  control={
                    <GreenCheckbox
                      name="isTopTen"
                      checked={series.images_details[series.j].isTopTen}
                      onChange={handleIsTopTen(series.j)}
                      value="isTopTen"
                    />
                  }
                  label="Mark as top ten"
                />
              </div>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={handleCloseSaved}
                className={classes.button}
                color="secondary"
                variant="contained"
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
