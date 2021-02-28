import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import Divider from "@material-ui/core/Divider";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Snackbar from "@material-ui/core/Snackbar";
import SnackbarContentWrapper from "../SnackbarContentComponent/SnackbarContentComponent";
import NoAuthenticated from "../NoAuthenticated/NoAuthenticated";

import { db } from "../../firebase";

const styles = theme => ({
  card: {
    width: 450,
    margin: theme.spacing(1),
    [theme.breakpoints.between("sm", "md")]: {
      width: 900
    }
  },
  media: {
    height: 190
  },
  content: {
    height: 220,
    paddingBottom: 10,
    textAlign: "justify",
    [theme.breakpoints.down("xs")]: {
      height: 290
    },
    [theme.breakpoints.between("sm", "md")]: {
      height: 300
    }
  },
  cards: {
    display: "flex",
    flexFlow: "row wrap",
    padding: "1rem 0"
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
  wrapper: {
    textAlign: "center",
    paddingTop: "100px",
    paddingBottom: "200px",
    alignItems: "center"
  },
  progressDiv: {
    margin: "20px 0",
    alignItems: "center",
    justifyContent: "center",
    display: "fixed",
    minWidth: "100%",
    [theme.breakpoints.up("sm")]: {
      margin: "10px 0"
    },
    [theme.breakpoints.up("xs")]: { minHeight: "50vh" }
  },

  button: {
    margin: theme.spacing(1)
  },
  redButton: {
    margin: theme.spacing(1),
    backgroundColor: "#c62828"
  },
  rightIcon: {
    marginLeft: theme.spacing(1)
  }
});

class MySeries extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allSeries: [],
      open: false,
      selectedSeries: {},
      openSnackbarDeleted: false
    };
  }

  componentDidMount() {
    this.observer = this.getSeries();
  }

  getSeries = () => {
    db.getAllSeries().then(snapshot => {
      let series =
        snapshot.val() &&
        Object.keys(snapshot.val()).map(serie => {
          let serieData = {
            name: snapshot.val()[serie].name,
            description: snapshot.val()[serie].description,
            images_details: snapshot.val()[serie].images_details,
            cover: snapshot.val()[serie].cover,
            key: serie,
            isInTopSeries: snapshot.val()[serie].isInTopSeries,
            order: snapshot.val()[serie].order
          };
          return serieData;
        });
      this.setState({ allSeries: series });
    });
  };

  handleDeleteSeries = () => {
    db.deleteSeries(this.state.selectedSeries).then(
      this.setState({ openSnackbarDeleted: true })
    );
    this.handleClose();
    this.getSeries();
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
      openSnackbarDeleted: false
    });
  };
  handleOpen = series => {
    this.setState({ open: true, selectedSeries: series });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { classes } = this.props;
    const { allSeries, open, selectedSeries, openSnackbarDeleted } = this.state;
    return this.props.authUser ? (
      <div className={classes.masthead}>
        <Typography gutterBottom variant="h5" component="h2" color="secondary">
          My series
        </Typography>
        <Divider component="li" />

        <Button
          variant="contained"
          color="secondary"
          className={classes.button}
          component={Link}
          to={{
            pathname: "/setseries"
          }}
        >
          Add serie
        </Button>

        <div className={classes.cards}>
          {allSeries ? (
            allSeries.map((serie, i) => (
              <Card className={classes.card} key={i}>
                <CardActionArea
                  component={Link}
                  to={{
                    pathname: "/setseries",
                    state: {
                      series: serie
                    }
                  }}
                >
                  <CardMedia
                    className={classes.media}
                    image={serie.images_details[serie.cover].url}
                    title={serie.name}
                  />
                  <CardContent className={classes.content}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {serie.name}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      {serie.description.length > 325
                        ? serie.description.slice(0, 325) + "..."
                        : serie.description}
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  <Button
                    size="small"
                    color="secondary"
                    variant="contained"
                    component={Link}
                    to={{
                      pathname: "/setseries",
                      state: {
                        series: serie
                      }
                    }}
                  >
                    View series
                    <EditIcon className={classes.rightIcon} />
                  </Button>
                  <Button
                    size="small"
                    color="secondary"
                    variant="contained"
                    className={classes.redButton}
                    onClick={() => this.handleOpen(serie)}
                  >
                    Delete series
                    <DeleteIcon className={classes.rightIcon} />
                  </Button>
                </CardActions>
              </Card>
            ))
          ) : (
            <div className={classes.progressDiv}>
              {" "}
              <CircularProgress
                color="secondary"
                className={classes.progress}
              />
            </div>
          )}
        </div>
        <Dialog
          open={open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title" color="secondary">
            {"Delete " + selectedSeries.name + " series?"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are you sure you want to delete this series? This action can NOT
              be undone.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={this.handleDeleteSeries}
              variant="contained"
              className={classes.redButton}
            >
              Yes
            </Button>
            <Button
              onClick={this.handleClose}
              color="secondary"
              autoFocus
              variant="contained"
            >
              No
            </Button>
          </DialogActions>
        </Dialog>
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left"
          }}
          open={openSnackbarDeleted}
          autoHideDuration={3000}
          onClose={this.handleSnackbarClose}
          id="openSnackbarDeleted"
          name="openSnackbarDeleted"
        >
          <SnackbarContentWrapper
            onClose={this.handleSnackbarClose}
            variant="warning"
            message="Series deleted"
          />
        </Snackbar>
      </div>
    ) : (
      <div className={classes.wrapper}>
        <NoAuthenticated />
      </div>
    );
  }
}

export default withStyles(styles)(MySeries);
