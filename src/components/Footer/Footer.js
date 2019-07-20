import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { Paper, Typography } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";

const styles = theme => ({
  root: {
    //marginTop: theme.spacing(3),
    bottom: 0,
    width: "99vw"
  },
  copyright: {
    lineHeight: "20px",
    color: theme.palette.primary.contrastText
  },
  credits: {
    fontSize: "0.75rem",
    color: theme.palette.primary.contrastText
  },
  paper: {
    padding: theme.spacing(1),
    backgroundColor: theme.palette.primary,
    borderRadius: 0,
    textAlign: "center"
  },
  creditsRow: {
    backgroundColor: theme.palette.primary.dark,
    display: "flex",
    paddingRight: theme.spacing(4),
    borderRadius: 0,
    textAlign: "center"
  },
  textColor: {
    color: theme.palette.primary.contrastText
  },
  socialButtons: {
    fontSize: "20px",
    lineHeight: "50px",
    display: "block",
    width: "50px",
    height: "50px",
    transition: "all 0.3s",
    color: "#fff",
    borderRadius: "100%",
    outline: 0,
    backgroundColor: "#212529",
    "&:hover": { backgroundColor: "#fed136" },
    marginBottom: 25
  },
  listInline: {
    paddingLeft: 100,
    listStyle: "none",
    marginBottom: 0,
    marginTop: 0
  },
  links: {
    textDecoration: "none",
    color: theme.palette.primary.contrastText,
    "&:hover": {
      textDecoration: "underline"
    }
  },
  listinlineItem: {
    display: "inline-block",
    marginRight: "0.2rem",
    textAlign: "center"
  },
  twitterIcon: {
    class: "fab fa-twitter"
  }
});

class Footer extends Component {
  render() {
    const { classes } = this.props;

    return (
      <footer className={classes.root}>
        {/*         <link
          rel="stylesheet"
          href="https://use.fontawesome.com/releases/v5.7.0/css/all.css"
          integrity="sha384-lZN37f5QGtY3VHgisS14W3ExzMWZxybE1SJSEsQp9S+oqd12jhcu+A56Ebc1zFSJ"
          crossOrigin="anonymous"
        /> */}
        <Paper className={classes.paper} elevation={0}>
          <Grid container spacing={8}>
            <Grid item xs={12} sm={4} md={4} lg={4}>
              <Typography variant="caption" className={classes.copyright}>
                Copyright &copy; 2019 Paintings of Marité Vidales
              </Typography>
            </Grid>
            <Grid item xs={12} sm={4} md={4} lg={4}>
              <Typography variant="caption" className={classes.copyright}>
                708 Rhode Island, N.W. Washington, D.C. 20001
              </Typography>
            </Grid>
            <Grid item xs={12} sm={4} md={4} lg={4}>
              <Typography variant="caption" className={classes.copyright}>
                Inquires: paulzye@aol.com | (301) 502-5634 | (202) 725-8543
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      </footer>
    );
  }
}

export default withStyles(styles)(Footer);
