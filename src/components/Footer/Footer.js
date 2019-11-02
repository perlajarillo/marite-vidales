import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { Paper, Typography } from "@material-ui/core";
import Divider from "@material-ui/core/Divider";

const styles = theme => ({
  root: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
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
  },
  divider: {
    height: "2px",
    color: "white",
    backgroundColor: "white",
    border: "none",
    width: "auto",
    marginBottom: "25px"
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
          <Divider />
          <Typography
            variant="caption"
            align="left"
            gutterBottom
            className={classes.mLeft}
          >
            Web app developed by{" "}
            <a
              className={classes.links}
              href="https://www.linkedin.com/in/perla-jarillo-98290436/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Perla Jarillo
            </a>
          </Typography>
        </Paper>
      </footer>
    );
  }
}

export default withStyles(styles)(Footer);
