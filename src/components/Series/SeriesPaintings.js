import React, { Component } from "react";
import Dialog from "@material-ui/core/Dialog";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import mountain from "../../images/landscapes_mountain.jpg";
import casaflor from "../../images/landscapes_casaflor.jpg";
import { withStyles } from "@material-ui/core/styles";
import Slide from "@material-ui/core/Slide";
import Button from "@material-ui/core/Button";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import spring from "../../images/immigrant_Springweb.jpg";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const styles = theme => ({
  card: {
    maxWidth: 545
  },
  image: {
    width: "50%",
    height: "50%"
  },
  cards: {
    display: "flex",
    flexFlow: "row wrap",
    [theme.breakpoints.up("sm")]: {
      padding: theme.sectionPadding.padding
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
  }
});

class SeriesPainting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
  }
  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };
  render() {
    const { classes } = this.props;

    const { open } = this.state;

    return (
      <div className={classes.cards}>
        <Card className={classes.card} onClick={this.handleClickOpen}>
          <CardActionArea>
            <CardContent>
              <img src={mountain} alt="Montain" />
              <Typography variant="body2" color="textSecondary">
                "Heredia Landscape" 1993 (Acrylic on canvas 30"x40")
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>

        <Card className={classes.card}>
          <CardActionArea>
            <CardContent>
              <img src={casaflor} alt="Casa Flor" />
              <Typography variant="body2" color="textSecondary">
                "Casa en San Joaquin de Flores" 1993 (Acrylic on canvas 30"x40){" "}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>

        <Dialog
          open={open}
          onClose={this.handleClose}
          TransitionComponent={Transition}
          fullScreen
        >
          <DialogContent>
            <div className={classes.container}>
              <Typography variant="h4" color="textSecondary">
                Heredia Landscape
              </Typography>
              <img src={mountain} alt="Montain" className={classes.image} />
              <Typography variant="body2" color="textSecondary">
                1993 (Acrylic on canvas 30"x40")
              </Typography>
            </div>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={this.handleClose}
              color="secondary"
              className={classes.button}
            >
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default withStyles(styles)(SeriesPainting);
