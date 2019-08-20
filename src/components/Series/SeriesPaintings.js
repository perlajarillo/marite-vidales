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

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const styles = theme => ({
  card: {
    margin: "10px",
    width: "330px",
    height: "370px",
    wrap: "wrapper"
  },
  image: {
    width: "50%",
    height: "50%"
  },
  bigDialogImage: {
    width: "25%",
    height: "25%"
  },

  regularImage: {
    width: "65%",
    height: "55%",
    marginLeft: "60px"
  },
  cards: {
    display: "flex",
    flexFlow: "row wrap",
    [theme.breakpoints.up("sm")]: {
      padding: theme.sectionPadding.padding
    }
  },
  masthead: {
    textAlign: "center",
    color: "white",
    paddingTop: "50px",
    paddingBottom: "100px",
    paddingLeft: "50px",
    [theme.breakpoints.down("sm")]: {
      paddingLeft: "10px"
    }
  },
  container: {
    textAlign: "center"
  },
  button: {
    backgroundColor: "#00c853",
    color: theme.palette.secondary.contrastText,
    fontSize: "1.05rem",
    fontFamily: '"Montserrat"',
    padding: "20px 30px",
    "&:hover": { backgroundColor: "#ffc400" }
  },
  picture: {
    textAlign: "center"
  }
});

class SeriesPainting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      selectedImage: ""
    };
  }
  handleClickOpen = url => {
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
  /**
   * isBigImage – returns true when one of the sizes of the image is
   * considerably bigger than the other.
   * @returns {boolean}
   */
  isBigImage(url) {
    let img = new Image();
    img.src = url;
    console.log(img.naturalWidth, img.naturalHeight);
    if (
      img.naturalWidth > img.naturalHeight &&
      img.naturalWidth / img.naturalHeight > 3
    ) {
      img = null;
      return true;
    } else if (
      img.naturalHeight > img.naturalWidth &&
      img.naturalHeight / img.naturalWidth > 1.25
    ) {
      img = null;
      return true;
    }
    img = null;
    return false;
  }

  render() {
    const { classes } = this.props;
    const { open, series, selectedImage } = this.state;
    return series ? (
      <div className={classes.masthead}>
        <Typography gutterBottom variant="h5" component="h2" color="secondary">
          {series.name}
        </Typography>
        <Typography color="secondary">{series.description}</Typography>
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
              <CardActionArea>
                <CardContent>
                  <Typography variant="body2" color="textSecondary">
                    "{image.title}" {image.year} {"("}
                    {image.technique} {image.measures} {")"}
                  </Typography>
                </CardContent>
                <div className={classes.picture}>
                  <CardMedia
                    component="img"
                    image={image.url}
                    title={image.title}
                    className={classes.regularImage}
                  />
                </div>
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
              <Typography variant="caption">
                {" "}
                {this.isBigImage(selectedImage.url) &&
                  "Use the vertical scrollbar to see more details. "}{" "}
                Click Close to return.
              </Typography>
              <Button
                onClick={this.handleClose}
                color="secondary"
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
                  className={
                    this.isBigImage(selectedImage.url)
                      ? classes.bigDialogImage
                      : classes.image
                  }
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
