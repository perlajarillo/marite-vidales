import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import noPicture from "../../images/noPicture.png";

import { db } from "../../firebase";

const styles = theme => ({
  card: {
    width: 450,
    margin: theme.spacing(1),
    [theme.breakpoints.between("sm", "md")]: {
      width: 900
    }
  },
  media: {
    height: 190
  },
  content: {
    height: 220,
    paddingBottom: 10,
    textAlign: "justify",
    [theme.breakpoints.down("xs")]: {
      height: 320
    },
    [theme.breakpoints.between("sm", "md")]: {
      height: 300
    }
  },
  cards: {
    display: "flex",
    flexFlow: "row wrap",
    padding: "3rem 0",
    [theme.breakpoints.up("sm")]: {
      padding: theme.sectionPadding.padding
    }
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
  progressDiv: {
    textAlign: "center",
    paddingTop: "150px",
    paddingBottom: "400px"
  }
});

class Series extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allSeries: []
    };
  }

  componentDidMount() {
    this.observer = this.getSeries();
  }

  getSeries = () => {
    db.getAllSeries().then(snapshot => {
      let series = Object.keys(snapshot.val()).map(serie => {
        let serieData = {
          name: snapshot.val()[serie].name,
          description: snapshot.val()[serie].description,
          shortDescription:
            snapshot.val()[serie].description.length > 325
              ? snapshot.val()[serie].description.slice(0, 325) + "..."
              : snapshot.val()[serie].description,
          images_details:
            snapshot.val()[serie].images_details.length > 0 &&
            snapshot.val()[serie].images_details,
          cover: snapshot.val()[serie].cover
        };
        return serieData;
      });
      this.setState({ allSeries: series });
    });
  };

  render() {
    const { classes } = this.props;
    const { allSeries } = this.state;
    return allSeries ? (
      <div className={classes.masthead}>
        <Typography gutterBottom variant="h5" component="h2" color="secondary">
          Art work series
        </Typography>
        <div className={classes.cards}>
          {allSeries.map((serie, i) => (
            <Card className={classes.card} key={i}>
              <CardActionArea
                component={Link}
                to={{
                  pathname: "/seriespaintings",
                  state: {
                    serie: serie
                  }
                }}
              >
                <CardMedia
                  className={classes.media}
                  image={
                    serie.images_details.length > 0
                      ? serie.images_details[serie.cover].url
                      : noPicture
                  }
                  title={serie.name}
                />
                <CardContent className={classes.content}>
                  <Typography gutterBottom variant="h5" component="h2">
                    {serie.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    {serie.shortDescription}
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Button
                  size="small"
                  color="secondary"
                  component={Link}
                  to={{
                    pathname: "/seriespaintings",
                    state: {
                      serie: serie
                    }
                  }}
                >
                  View series
                </Button>
              </CardActions>
            </Card>
          ))}
        </div>
      </div>
    ) : (
      <div className={classes.progressDiv}>
        <CircularProgress color="secondary" />
      </div>
    );
  }
}

export default withStyles(styles)(Series);
