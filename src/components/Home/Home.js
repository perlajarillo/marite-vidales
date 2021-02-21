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
    height: "100%",
    paddingBottom: "0px",
    boxSizing: "border-box",
    minHeight: "100%",
  },

  collage: {
    margin: "1em",
    minHeight: "100%",
    overflow: "visible",
    position: "relative",
    textAlign:"center",
  },
  image: {
    maxWidth: "100%",
    height: "auto",
  }

});

class Home extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.masthead}>
        <div className={classes.collage}>
          <img src={painting} className={classes.image}></img>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(Home);
