import React, { Component } from "react";
import Dialog from "@material-ui/core/Dialog";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import Slide from "@material-ui/core/Slide";
import Button from "@material-ui/core/Button";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import CircularProgress from "@material-ui/core/CircularProgress";
import CardMedia from "@material-ui/core/CardMedia";
import Paper from "@material-ui/core/Paper";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const styles = (theme) => ({
  card: {
    margin: "10px",
    width: "21.2rem",
    height: "25rem",
    wrap: "wrapper",
    [theme.breakpoints.down("sm")]: {
      width: "auto",
    },
    [theme.breakpoints.between("sm", "md")]: {
      width: "95%",
    },
  },

  cardContent: {
    width: "21.2rem",
    height: "25rem",
    [theme.breakpoints.down("sm")]: {
      width: "auto",
    },
    [theme.breakpoints.between("sm", "md")]: {
      width: "95%",
    },
  },

  image: {
    width: "auto",
    height: "auto",
    maxHeight: theme.spacing(70),
    maxWidth: theme.spacing(150),
    [theme.breakpoints.down("sm")]: {
      maxWidth: theme.spacing(35),
      padding: 0,
    },
    padding: "10px",
  },
  regularImage: {
    width: "auto",
    height: "auto",
    maxHeight: "285px",
    maxWidth: "300px",
    padding: "10px",
  },
  cards: {
    display: "flex",
    flexFlow: "row wrap",
    [theme.breakpoints.up("sm")]: {
      padding: theme.sectionPadding.padding,
    },
  },
  masthead: {
    textAlign: "center",
    color: "white",
    paddingTop: "50px",
    paddingBottom: "100px",
    paddingLeft: "50px",
    [theme.breakpoints.down("sm")]: {
      paddingLeft: "10px",
    },
  },
  container: {
    textAlign: "center",
  },
  button: {
    color: theme.palette.secondary.contrastText,
    fontSize: "1.05rem",
    fontFamily: '"Montserrat"',
    padding: "10px 20px",
  },
  picture: {
    textAlign: "center",
    display: "inline-block",
  },
  root: {
    padding: theme.spacing(3, 2),
    textAlign: "justify",
    marginRight: theme.spacing(5),
    [theme.breakpoints.down("sm")]: {
      marginRight: theme.spacing(2),
    },
  },
});

class SeriesPainting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      selectedImage: "",
    };
  }
  handleClickOpen = (url) => {
    this.setState({ open: true, selectedImage: url });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  /**
   * componentDidMount – sets in the data series to edit
   * @returns {void}
   */
  componentDidMount = () => {
    this.observer = this.getSeries();
  };

  componentWillUnmount = () => {
    this.observer = null;
  };

  getSeries = () => {
    if (this.props.location.state.serie) {
      const { serie } = this.props.location.state;
      this.setState({ series: serie });
    }
  };

  render() {
    const { classes } = this.props;
    const { open, series, selectedImage } = this.state;
    return series ? (
      <div className={classes.masthead}>
        <Paper className={classes.root}>
          <Typography
            gutterBottom
            variant="h4"
            component="h2"
            color="secondary"
          >
            {series.name}
          </Typography>
          <div
            style={{
              backgroundImage:
                "url(" + series.images_details[series.cover].url + ")",
              backgroundSize: "cover",
              height: "10px",
              margin: 10,
            }}
          ></div>
          <Typography color="secondary">{series.description}</Typography>
        </Paper>
        <Typography variant="caption" color="secondary">
          Click in the image to see more details.
        </Typography>
        <div className={classes.cards}>
          {series.images_details.map((image, i) => (
            <Card
              className={classes.card}
              onClick={() => this.handleClickOpen(image)}
              key={i}
              name={image.url}
            >
              <CardActionArea className={classes.cardContent}>
                <div className={classes.picture}>
                  <CardMedia
                    component="img"
                    image={image.url}
                    title={image.title}
                    className={classes.regularImage}
                  />
                </div>
                <CardContent>
                  <Typography variant="body2" color="textSecondary" noWrap>
                    {image.title && '"' + image.title + '"'} {image.year}{" "}
                    {image.technique && image.measures && "("}
                    {image.technique} {image.measures}{" "}
                    {image.technique && image.measures && ")"}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          ))}

          <Dialog
            open={open}
            onClose={this.handleClose}
            TransitionComponent={Transition}
            fullScreen
          >
            <DialogActions>
              <Typography variant="caption"> Click Close to return.</Typography>
              <Button
                onClick={this.handleClose}
                color="secondary"
                variant="contained"
                className={classes.button}
              >
                Close
              </Button>
            </DialogActions>
            <DialogContent>
              <div className={classes.container}>
                <img
                  src={selectedImage.url}
                  alt={selectedImage.title}
                  className={classes.image}
                />
                <Typography variant="body2" color="textSecondary">
                  {" "}
                  "{selectedImage.title}" {selectedImage.year} {"("}
                  {selectedImage.technique} {selectedImage.measures} {")"}
                </Typography>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    ) : (
      <div className={classes.progressDiv}>
        <CircularProgress color="secondary" />
      </div>
    );
  }
}

export default withStyles(styles)(SeriesPainting);
