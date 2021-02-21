import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { Paper, Typography } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import mail from "../../images/icon_mail.svg";
import facebook from "../../images/icon_facebook.svg";
import instagram from "../../images/icon_instagram.svg";

const styles = theme => ({
  root: {
    padding: theme.spacing(2, 1),
    position: "fixed",
    width: "100%",
    bottom: 0,
    backgroundColor: "#fafafa",
    boxShadow:
      "0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)"
  },
  copyright: {
    color: theme.palette.primary.contrastText
  },
  paper: {
    backgroundColor: "transparent",
    textAlign: "center",
    borderRadius: 0
  },
  artistContainer: {
    marginLeft: theme.spacing(6),
    textAlign: "Left"
  },
  iconsContainer: {
    marginRight: theme.spacing(6),
    textAlign: "right"
  },
  icons: {
    marginRight: theme.spacing(5),
    width: "1.5em"
  }
});

class Footer extends Component {
  render() {
    const { classes } = this.props;
    return (
      <footer className={classes.root}>
        <Paper className={classes.paper} elevation={0}>
          <Grid container>
            <Grid item xs={12} sm={6} md={6} lg={6}>
              <div className={classes.artistContainer}>
                <Typography variant="caption" className={classes.copyright}>
                  Copyright &copy; 2019 Paintings of Marité Vidales, {"  "}
                </Typography>
                <Typography variant="caption" className={classes.copyright}>
                  Washington, D.C.
                </Typography>
              </div>
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={6}>
              <div className={classes.iconsContainer}>
                <a
                  className={classes.links}
                  href={"mailto:paulzye@aol.com"}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {" "}
                  <img
                    src={mail}
                    alt="send me an email"
                    className={classes.icons}
                  />
                </a>
                <a
                  className={classes.links}
                  href="https://www.facebook.com/marite.vidales"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src={facebook}
                    alt="visit my facebook page"
                    className={classes.icons}
                  />
                </a>
                <a
                  className={classes.links}
                  href="https://www.instagram.com/vidalesmarite/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src={instagram}
                    alt="follow me in instagram"
                    className={classes.icons}
                  />
                </a>
              </div>
            </Grid>
          </Grid>
        </Paper>
      </footer>
    );
  }
}

export default withStyles(styles)(Footer);
