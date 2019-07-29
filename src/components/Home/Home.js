import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import painting from "../../images/Variacionesweb.jpg";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";

const styles = theme => ({
  root: {
    padding: theme.spacing(3, 2)
  },
  introText: {
    paddingTop: "150px",
    paddingBottom: "100px"
  },
  masthead: {
    textAlign: "center",
    color: "white",
    background: "url(" + painting + ")",
    backgroundRepeat: "no-repeat",
    backgroundAttachment: "scroll",
    backgroundPosition: "center",
    backgroundSize: "cover",
    paddingTop: "150px",
    marginRight: "auto"
  },

  introHeading: {
    fontSize: "75px",
    fontStyle: "bold",
    fontWeight: "700",
    lineHeight: "75px",
    marginBottom: "50px",
    fontFamily: '"Montserrat"',
    textTransform: "uppercase !important"
  },

  introLeadIn: {
    fontSize: "35px",
    fontStyle: "italic",
    lineHeight: "70px",
    marginBottom: "32px",
    fontFamily: "'Droid Serif'"
  },
  button: {
    backgroundColor: "#00c853",
    color: theme.palette.secondary.contrastText,
    fontSize: "1.05rem",
    fontFamily: '"Montserrat"',
    padding: "20px 30px",
    "&:hover": { backgroundColor: "#ffc400" }
  },

  divider: {
    height: "2px",
    color: "white",
    backgroundColor: "white",
    border: "none",
    width: "auto",
    marginBottom: "25px"
  },
  dividerContainer: {
    textAlign: "center",
    alignItems: "center"
  },
  container: {
    width: "100%",
    padding: "100px",
    marginRight: "auto",
    marginLeft: "auto",
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "space-between",
    minWidth: "992px !important"
  }
});

class Home extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.masthead}>
        <div className={classes.introText}>
          <div className={classes.introHeading}>Marite Vidales</div>
          <div className={classes.dividerContainer}>
            <Divider className={classes.divider} />
          </div>
          <div className={classes.introLeadIn}>Visual Artist</div>
          <br />
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(Home);
