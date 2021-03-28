import React, { Component } from "react";
import Dialog from "@material-ui/core/Dialog";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import Slide from "@material-ui/core/Slide";
import Button from "@material-ui/core/Button";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import CircularProgress from "@material-ui/core/CircularProgress";
import Paper from "@material-ui/core/Paper";
import PaintingCard from "./PaintingCard";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const styles = (theme) => ({
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
  cards: {
    display: "flex",
    flexFlow: "row wrap",
    marginRight: "20px",
    [theme.breakpoints.up("sm")]: {
      padding: theme.sectionPadding.padding,
    },
    [theme.breakpoints.between("xs","sm")]: {
          marginRight: "0px",
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
    padding: "10px 20px",
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
      viewMore: false,
      moreButtonText:"View More"
    };
  }
  handleClickOpen = (url) => {
    this.setState({ open: true, selectedImage: url });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleMorePaintings = () => {
    this.setState({moreButtonText: this.state.viewMore?"View More": "View Less", viewMore: !this.state.viewMore})
  }

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
    const { open, series, selectedImage, viewMore, moreButtonText } = this.state;
    const topTenSeries = series ? series.images_details.filter(image => image.isTopTen) : [];
    topTenSeries.sort((a, b) => a.order - b.order);
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
        {topTenSeries.length>0 && <Typography variant="caption" color="secondary" noWrap>
          Click in the image to see more details.
        </Typography>}
        <div className={classes.cards}>
          {topTenSeries.map((image, i) => (
            <PaintingCard image={image} handleClickOpen={this.handleClickOpen} key={i}/>
          ))}

          {viewMore && series.images_details.map((image, i) => (
            !image.isTopTen &&
              <PaintingCard image={image} handleClickOpen={this.handleClickOpen} key={i+topTenSeries.length} />
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
        {topTenSeries.length>0 && (topTenSeries.length !== series.images_details.length)&&<Button
          size="small"
          variant="outlined"
          onClick={this.handleMorePaintings}
          color="secondary"
                >
                  {moreButtonText}
          </Button>}
      </div>
    ) : (
      <div className={classes.progressDiv}>
        <CircularProgress color="secondary" />
      </div>
    );
  }
}

export default withStyles(styles)(SeriesPainting);
