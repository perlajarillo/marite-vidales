import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { Paper, Typography } from "@material-ui/core";

const styles = theme => ({
  root: {
    marginTop: theme.spacing(1),
    bottom: 0,
    width: "auto"
  },
  copyright: {
    color: theme.palette.primary.contrastText
  },

  paper: {
    backgroundColor: "transparent",
    textAlign: "center",
    borderRadius: 0
  }
});

class Footer extends Component {
  render() {
    const { classes } = this.props;

    return (
      <footer className={classes.root}>
        <Paper className={classes.paper} elevation={0}>
          <Typography
            variant="caption"
            className={classes.copyright}
            gutterBottom
          >
            Copyright &copy; 2019 Paintings of Marité Vidales, {"  "}
          </Typography>

          <Typography variant="caption" className={classes.copyright}>
            Washington, D.C.
          </Typography>
        </Paper>
      </footer>
    );
  }
}

export default withStyles(styles)(Footer);
