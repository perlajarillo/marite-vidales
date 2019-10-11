import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import marite from "../../images/Mariteweb.jpg";
import { db } from "../../firebase";
import { Typography } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import Divider from "@material-ui/core/Divider";

const styles = theme => ({
  image: {
    with: "250px",
    height: "250px"
  },

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

  contentBlock: { paddingTop: theme.spacing(2) },
  text: {
    textAlign: "left",
    alignSelf: "left",
    fontSize: "0.95rem",
    paddingLeft: theme.spacing(10),
    paddingRight: theme.spacing(10),
    [theme.breakpoints.down("sm")]: {
      paddingLeft: theme.spacing(1),
      paddingRight: theme.spacing(1)
    }
  },
  subtitle: {
    textAlign: "left",
    fontSize: "1.2rem",
    style: "bold",
    textTransform: "uppercase"
  },
  multiline: {
    whiteSpace: "pre-line",
    textAlign: "justify",
    fontSize: "0.98rem",
    paddingLeft: theme.spacing(10),
    paddingRight: theme.spacing(10),
    paddingTop: theme.spacing(4),
    [theme.breakpoints.down("sm")]: {
      paddingLeft: theme.spacing(1),
      paddingRight: theme.spacing(1)
    }
  }
});

class Biography extends Component {
  constructor(props) {
    super(props);
    this.state = {
      summary: "",
      education: [],
      experience: [],
      pictureUrl: marite
    };
  }
  /**
   * componentDidMount – calls the method to bring the existing data
   * @returns {void}
   */
  componentDidMount = () => {
    this.observer = this.getBiography();
  };

  componentDidUpdate = () => {
    this.observer = this.getBiography();
  };
  /**
   * componentWillUnmount – set observer to null to avoid memory leaks
   * @returns {void}
   */
  componentWillUnmount = () => {
    this.observer = null;
  };

  getBiography = () => {
    if (this.props) {
      db.getBiography().then(snapshot => {
        let summary = snapshot.val().summary;
        let education = snapshot.val().education;
        let experience = snapshot.val().experience;
        let url = snapshot.val().pictureUrl;

        this.setState({
          summary: summary,
          education: education,
          experience: experience,
          pictureUrl: url ? url : marite
        });
      });
    }
  };

  render() {
    const { classes } = this.props;
    const { summary, education, experience, pictureUrl } = this.state;

    return (
      <div className={classes.masthead}>
        <Typography variant="h4" color="secondary" gutterBottom>
          Marite Vidales' Biography
        </Typography>
        <br></br>
        <Paper className={classes.paper}>
          <img
            src={pictureUrl}
            alt="Marite Vidales"
            className={classes.image}
          />
          <Typography
            variant="body2"
            gutterBottom
            className={classes.multiline}
          >
            {summary}
          </Typography>
          <br></br>
        </Paper>

        <Paper className={classes.paper}>
          <Typography variant="h6">Education </Typography>
          {education
            ? Object.keys(education).map(i => (
                <div className={classes.contentBlock} key={i}>
                  <Typography className={classes.text}>
                    {education[i].field + ". "}
                    {education[i].degree + ". "}
                    {education[i].institution + ". "}
                    {education[i].country + ". "} {education[i].year}{" "}
                  </Typography>

                  <br></br>
                  <Divider />
                </div>
              ))
            : "No education has been added yet!"}
        </Paper>
        <Paper className={classes.paper}>
          <Typography variant="h6">Professional experience</Typography>
          {experience
            ? Object.keys(experience).map(x => (
                <div className={classes.contentBlock} key={x}>
                  <Typography variant="body2" className={classes.text}>
                    {experience[x].position + ". "}
                    {experience[x].institution + ". "}
                    {experience[x].country + ". "} {experience[x].dates}
                  </Typography>

                  <br></br>
                  <Divider />
                </div>
              ))
            : "No professional experience has been added yet!"}
        </Paper>
      </div>
    );
  }
}

export default withStyles(styles)(Biography);
