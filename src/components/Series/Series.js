import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import immigrant from "../../images/immigrant_AlasAbiertaIIweb.jpg";
import landscapes from "../../images/landscapes_mountain.jpg";
import nests from "../../images/nests_FreedomWeb.jpg";
import peru from "../../images/peru_FragmentosVweb.jpg";
import petra from "../../images/Petra.jpg";
import portraits from "../../images/portraits_Pablosmallweb.jpg";
import stilllife from "../../images/still_life_bananas.jpg";
import volcanos from "../../images/volcanos_De_la_tierra2.jpg";

import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import { db } from "../../firebase";

const styles = theme => ({
  root: {
    padding: theme.spacing(3, 2)
  },
  card: {
    maxWidth: 345,
    margin: theme.spacing(0),
    flexGrow: 1
  },
  media: {
    height: 140
  },
  cards: {
    display: "flex",
    flexFlow: "row wrap",
    [theme.breakpoints.up("sm")]: {
      padding: theme.sectionPadding.padding
    }
  },
  masthead: {
    textAlign: "center",
    color: "white",
    paddingTop: "150px",
    paddingBottom: "100px",
    paddingLeft: "50px"
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
    db.getAllSeries().then(snapshot =>
      this.setState({ allSeries: snapshot.val() })
    );
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.masthead}>
        <div className={classes.cards}>
          {" "}
          <Card className={classes.card}>
            <CardActionArea>
              <CardMedia
                className={classes.media}
                image={immigrant}
                title="Immigrants"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  Immigrants
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  This project aims to increase an appreciation for art as a way
                  of addressing social causes of immigrants
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button
                size="small"
                color="secondary"
                href="/seriespaintingscarousel"
              >
                View series
              </Button>
            </CardActions>
          </Card>
          <Card className={classes.card}>
            <CardActionArea>
              <CardMedia
                className={classes.media}
                image={landscapes}
                title="Landscapes"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  Landscapes
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  Beautiful landscapes
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button size="small" color="secondary" href="/seriespaintings">
                View series
              </Button>
            </CardActions>
          </Card>
          <Card className={classes.card}>
            <CardActionArea>
              <CardMedia
                className={classes.media}
                image={nests}
                title="Nests"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  Nests
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  Based on the concept of the nest - a symbol of home and family
                  - both physical and emotional.
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button size="small" color="secondary">
                View series
              </Button>
            </CardActions>
          </Card>
          <Card className={classes.card}>
            <CardActionArea>
              <CardMedia className={classes.media} image={peru} title="Peru" />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  Peru
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  Based on the ruins of ancient Peruvian cultures and
                  civilizations..
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button size="small" color="secondary">
                View series
              </Button>
            </CardActions>
          </Card>
          <Card className={classes.card}>
            <CardActionArea>
              <CardMedia
                className={classes.media}
                image={petra}
                title="Petra"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  Petra
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  A beautiful place to explore and enjoy the wonders of God's
                  Creations, along with the ingeniousness of man{" "}
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button size="small" color="secondary">
                View series
              </Button>
            </CardActions>
          </Card>
          <Card className={classes.card}>
            <CardActionArea>
              <CardMedia
                className={classes.media}
                image={portraits}
                title="portrait"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  Portraits
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  Portraits from people in my life.
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button size="small" color="secondary">
                View series
              </Button>
            </CardActions>
          </Card>
          <Card className={classes.card}>
            <CardActionArea>
              <CardMedia
                className={classes.media}
                image={stilllife}
                title="Still Life"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  Still Life
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  Every day things capture under Marite's point of view.
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button size="small" color="secondary">
                View series
              </Button>
            </CardActions>
          </Card>
          <Card className={classes.card}>
            <CardActionArea>
              <CardMedia
                className={classes.media}
                image={volcanos}
                title="Volcanos"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  Volcanos
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  The Volcano is a supreme and symbolic place, and an element of
                  the Costa Rican landscape. This series is based on the Arenal
                  Volcano.
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button size="small" color="secondary">
                View series
              </Button>
            </CardActions>
          </Card>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(Series);
