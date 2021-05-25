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
import PaintingsCarousel from "./PaintingsCarousel";

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
    [theme.breakpoints.between("xs", "sm")]: {
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
    fontSize: ".85rem",
    padding: "0px 30px",
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
      moreButtonText: "View More",
    };
  }
  handleClickOpen = (url) => {
    this.setState({ open: true, selectedImage: url });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleMorePaintings = () => {
    this.setState({ moreButtonText: this.state.viewMore ? "View More" : "View Less", viewMore: !this.state.viewMore })
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
    const { open, series, selectedImage, viewMore, moreButtonText, index } = this.state;
    const topTenSeries = series ? series.images_details.filter(image => image.isTopTen) : [];
    topTenSeries.sort((a, b) => a.order - b.order);
    const noTopTenSeries = series ? series.images_details.filter((image, i) =>
      !image.isTopTen) : [];
    const paintings = viewMore ? [...topTenSeries, ...noTopTenSeries] : topTenSeries;
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
        {paintings.length > 0 && <Typography variant="caption" color="secondary" noWrap>
          Click in the image to see more details.
        </Typography>}
        <div className={classes.cards}>
          {paintings.map((image, i) => (
            <PaintingCard image={image} handleClickOpen={this.handleClickOpen} key={i} />
          ))}

          <Dialog
            open={open}
            onClose={this.handleClose}
            TransitionComponent={Transition}
            fullScreen
          >
            <DialogActions>
              <Button
                onClick={this.handleClose}
                color="secondary"

                className={classes.button}
              >
                Close
              </Button>
            </DialogActions>
            <DialogContent>
              <PaintingsCarousel carouselPaintings={paintings} selectedImage={selectedImage}
              />
            </DialogContent>
          </Dialog>
        </div>
        {topTenSeries.length > 0 && (topTenSeries.length !== series.images_details.length) && <Button
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
