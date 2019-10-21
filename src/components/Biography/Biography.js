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
      pictureUrl: marite,
      educationTable: [],
      experienceTable: []
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
        let n = snapshot.child("education").numChildren();
        let nExp = snapshot.child("experience").numChildren();
        let education = snapshot.val().education;
        let experience = snapshot.val().experience;
        let url = snapshot.val().pictureUrl;
        let educationTable = new Array(n);
        snapshot.val().education &&
          Object.keys(snapshot.val().education).forEach(edu => {
            educationTable[snapshot.val().education[edu].index] = {
              key: edu,
              i: snapshot.val().education[edu].index + 1
            };
          });
        let experienceTable = new Array(nExp);
        for (let exp in experience) {
          experienceTable[experience[exp].index] = {
            key: exp,
            i: experience[exp].index + 1
          };
        }
        this.setState({
          summary: summary,
          education: education,
          experience: experience,
          pictureUrl: url ? url : marite,
          n: n,
          nExp: nExp,
          educationTable: educationTable,
          experienceTable: experienceTable
        });
      });
    }
  };

  render() {
    const { classes } = this.props;
    const {
      summary,
      education,
      experience,
      pictureUrl,
      educationTable,
      experienceTable
    } = this.state;

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
            ? educationTable.map(e => (
                <div className={classes.contentBlock} key={e}>
                  <Typography className={classes.text}>
                    {education[e.key].field + ". "}
                    {education[e.key].degree + ". "}
                    {education[e.key].institution + ". "}
                    {education[e.key].country + ". "}
                    {education[e.key].year}{" "}
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
            ? experienceTable.map(x => (
                <div className={classes.contentBlock} key={x}>
                  <Typography variant="body2" className={classes.text}>
                    {experience[x.key].position + ". "}
                    {experience[x.key].institution + ". "}
                    {experience[x.key].country + ". "} {experience[x.key].dates}
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
