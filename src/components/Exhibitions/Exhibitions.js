import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import Divider from "@material-ui/core/Divider";
import exhibitions from "./data";
import picture1 from "../../images/one.jpg";
import picture2 from "../../images/two.jpg";
import picture3 from "../../images/three.jpg";
import picture4 from "../../images/four.jpg";
import picture5 from "../../images/five.JPG";
import picture6 from "../../images/six.JPG";
import picture7 from "../../images/seven.JPG";
import picture8 from "../../images/eight.jpg";
import picture9 from "../../images/nine.jpg";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

const solo = exhibitions.solo;
const selected = exhibitions.selected;
const galleries = exhibitions.galleries;
const juried = exhibitions.juried;

const styles = theme => ({
  image: {
    width: "650px",

    [theme.breakpoints.down("sm")]: {
      width: "auto"
    }
  },
  carouselContainer: {
    textAlign: "center",
    width: "50%",
    margin: "auto"
  },
  masthead: {
    textAlign: "center",
    color: "white",
    paddingTop: "50px",
    paddingBottom: "30px",
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
  }
});

class Exhibitions extends Component {
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.masthead}>
        <Typography variant="h4" color="secondary" gutterBottom>
          Exhibits
        </Typography>
        <br></br>
        <Paper className={classes.paper}>
          <div className={classes.carouselContainer}>
            <Carousel
              showArrows={true}
              autoPlay={true}
              className={classes.image}
            >
              <div>
                <img src={picture6} alt="Exhibitions" />
                <p className="legend">Peru</p>
              </div>
              <div>
                <img src={picture1} alt="Exhibitions" />
                <p className="legend">
                  Fondo de Cultura Economica FCE, Lima, Peru
                </p>
              </div>
              <div>
                <img src={picture2} alt="Exhibitions" />
                <p className="legend">
                  Galeria de Arte Ryoichi Jinnai, Centro Cultural Peruano
                  Japones, Lima Peru
                </p>
              </div>
              <div>
                <img src={picture3} alt="Exhibitions" />
                <p className="legend">
                  ArtDC Gallery at the Lustine Center, Arts District,
                  Hyattsville, Maryland
                </p>
              </div>
              <div>
                <img src={picture4} alt="Exhibitions" />
                <p className="legend">
                  Montpelier Arts Center, Laurel, Montpelier Juried Art Exhibit
                </p>
              </div>
              <div>
                <img src={picture5} alt="Exhibitions" />
                <p className="legend"></p>
              </div>

              <div>
                <img src={picture7} alt="Exhibitions" />
                <p className="legend">Timeless Huacas</p>
              </div>
              <div>
                <img src={picture8} alt="Exhibitions" />
                <p className="legend">Torpedo Factory Art Center </p>
              </div>
              <div>
                <img src={picture9} alt="Exhibitions" />
                <p className="legend">Hill Center</p>
              </div>
            </Carousel>
          </div>
          <Typography variant="h6">Galleries </Typography>
          {galleries
            ? Object.keys(galleries).map(i => (
                <div className={classes.contentBlock} key={i}>
                  <Typography className={classes.text}>
                    {galleries[i].gallery + ". "}
                    {galleries[i].address + ". "}
                  </Typography>

                  <br></br>
                  <Divider />
                  <br></br>
                </div>
              ))
            : "No galleries have been added yet!"}
          <Typography variant="h6">Solo Exhibits </Typography>
          {solo
            ? Object.keys(solo).map(i => (
                <div className={classes.contentBlock} key={i}>
                  <Typography className={classes.text}>
                    {'"' + solo[i].name + '". '}
                    {solo[i].place + ". "}
                    {solo[i].dates + ". "}
                  </Typography>

                  <br></br>
                  <Divider />
                </div>
              ))
            : "No solo exhibitions have been added yet!"}
        </Paper>
        <Paper className={classes.paper}>
          <Typography variant="h6">Juried exhibits</Typography>
          {juried
            ? Object.keys(juried).map(x => (
                <div className={classes.contentBlock} key={x}>
                  <Typography className={classes.text}>
                    {'"' + juried[x].name + '". '}
                    {juried[x].place + ". "}
                    {juried[x].dates + ". "}
                  </Typography>

                  <br></br>
                  <Divider />
                </div>
              ))
            : "No juried exhibitions been added yet!"}
        </Paper>
        <Paper className={classes.paper}>
          <Typography variant="h6">Selected exhibits</Typography>
          {selected
            ? Object.keys(selected).map(x => (
                <div className={classes.contentBlock} key={x}>
                  <Typography className={classes.text}>
                    {'"' + selected[x].name + '". '}
                    {selected[x].place + ". "}
                    {selected[x].dates + ". "}
                  </Typography>

                  <br></br>
                  <Divider />
                </div>
              ))
            : "No selected exhibitions been added yet!"}
        </Paper>
      </div>
    );
  }
}

export default withStyles(styles)(Exhibitions);
