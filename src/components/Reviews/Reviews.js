import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import Divider from "@material-ui/core/Divider";
import reviewsData from "./data";

const styles = theme => ({
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
  paper: {
    padding: theme.spacing(4),
    margin: "auto"
  },

  contentBlock: { paddingTop: theme.spacing(2), textAlign: "justify" },

  reviewContent: {
    whiteSpace: "pre-line",
    textAlign: "justify",
    fontStyle: "italic"
  },
  reviewer: {
    textAlign: "right",
    fontWeight: "bold",
    alignSelf: "right",
    fontSize: "0.95rem"
  }
});

class Reviews extends Component {
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.masthead}>
        <Typography variant="h4" color="secondary" gutterBottom>
          Reviews
        </Typography>
        <br></br>
        <Paper className={classes.paper}>
          {reviewsData
            ? Object.keys(reviewsData).map(i => (
                <div className={classes.contentBlock} key={i}>
                  <Typography variant="body2" className={classes.reviewContent}>
                    {'"' + reviewsData[i].review + '"'}
                  </Typography>
                  <br></br>
                  <Typography variant="subtitle2" className={classes.reviewer}>
                    {reviewsData[i].reviewer}
                  </Typography>
                  <br></br>
                  <Divider />
                </div>
              ))
            : "No reviews have been added yet!"}
        </Paper>
      </div>
    );
  }
}

export default withStyles(styles)(Reviews);