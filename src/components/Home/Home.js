import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import painting from "../../images/HomePage-Image-Transparent4.jpg";

const styles = theme => ({
  root: {
    padding: theme.spacing(3, 2),
  },

  masthead: {
    position: "fixed",
    width: "100%",
    height: "76%",
    paddingBottom: "0px",
    boxSizing: "border-box",
    [theme.breakpoints.up('xl')]: {
      height: "82%",
    },
  },

  collage: {
    minHeight: "100%",
    overflow: "visible",
    textAlign: "center",
    background: "url(" + painting + ")",
    backgroundRepeat: "no-repeat",
    backgroundAttachment: "scroll",
    backgroundPosition: "center",
    backgroundSize: "55%",
    [theme.breakpoints.down("sm")]: {
      backgroundSize: "90%",
    },
   [theme.breakpoints.only('md')]: {
      backgroundSize: "80%",
    },
    [theme.breakpoints.only('xl')]: {
      backgroundSize: "63%",
    },
  },

});

class Home extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.masthead}>
        <div className={classes.collage}>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(Home);
