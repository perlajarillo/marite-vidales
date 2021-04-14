import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
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
import picture10 from "../../images/ten.jpg";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Carousel from 'react-material-ui-carousel'


const solo = exhibitions.solo;
const selected = exhibitions.selected;
const galleries = exhibitions.galleries;
const juried = exhibitions.juried;

const styles = makeStyles((theme) => ({
    root: {
    maxWidth: "100%",
  },
    media: {
      height: 0,
      paddingTop: '70%',
  },

  carouselContainer: {
    textAlign: "center",
    width: "45%",
    margin: "auto",
    paddingBottom:"2em",
[theme.breakpoints.down("md")]: {
      width: "100%",
    },

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
      paddingRight: "10px",
    },
  },
  paper: {
    padding: theme.spacing(4),
    margin: "auto",
  },

  contentBlock: { paddingTop: theme.spacing(2) },
  text: {
    textAlign: "justify",
    fontSize: "0.95rem",
    paddingLeft: theme.spacing(30),
    paddingRight: theme.spacing(30),
    [theme.breakpoints.down("sm")]: {
      paddingLeft: theme.spacing(1),
      paddingRight: theme.spacing(1),
    },
  },
  legend: {
    fontSize: "0.85rem",
        color:"#fff",

  },
  cardContent: {
    backgroundColor: "black",
    opacity:.4,
    '&:hover': {
      opacity:.6
    }

  }

}));

function Item(props) {
   const classes = styles();
  return (
    <Card className={classes.root}>
      <CardMedia
        className={classes.media}
        image={props.image}
      />
      <CardContent className={classes.cardContent}>

        <Typography variant="caption" color="secondary"  className={classes.legend}>
          {props.legend}
      </Typography>

      </CardContent>


    </Card>)
};


const Exhibitions =() =>{
  const classes = styles();
  const carouselItems = [
    {
      image: picture1,
      legend: "Fondo de Cultura Economica FCE, Lima, Peru"
    },
    {
      image: picture2,
      legend: "Galeria de Arte Ryoichi Jinnai, Centro Cultural Peruano Japones, Lima Peru"
    },
    {
      image: picture3,
      legend: "Fruits of Nature. Universidad Femenina del Sagrado Corazón (UNIFE), Lima, Peru."
    },
    {
      image: picture4,
      legend: "Montpelier Arts Center, Laurel, Montpelier Juried Art Exhibit"
    },
    {
      image: picture5,
      legend: ""
    },
    {
      image: picture7,
      legend: "Timeless Huacas"
    },
    {
      image: picture8,
      legend: "Torpedo Factory Art Center"
    },
    {
      image: picture9,
      legend: "Hill Center"
    },
    {
      image: picture10,
      legend: "In the studio"
    }

  ];
    return (
      <div className={classes.masthead}>
        <Typography variant="h4" color="secondary" gutterBottom>
          Exhibits
        </Typography>
        <br></br>
        <Paper className={classes.paper}>
            <Carousel
              autoPlay={true}
            className={classes.carouselContainer}
            fullHeightHover={false}
            >
              {carouselItems.map(i=> <Item image={i.image} legend={i.legend}/>)}

            </Carousel>
          <Typography variant="h6">Galleries </Typography>
          {galleries
            ? Object.keys(galleries).map((i) => (
                <div className={classes.contentBlock} key={i}>
                  <Typography className={classes.text}>
                    {galleries[i].gallery + ". "}
                    {galleries[i].address + ". "}
                  </Typography>

                  <br></br>
                  <br></br>
                </div>
              ))
            : "No galleries have been added yet!"}
          <Typography variant="h6">Solo Exhibits </Typography>
          {solo
            ? Object.keys(solo).map((i) => (
                <div className={classes.contentBlock} key={i}>
                  <Typography className={classes.text}>
                    {'"' + solo[i].name + '". '}
                    {solo[i].place + ". "}
                    {solo[i].dates + ". "}
                  </Typography>

                  <br></br>
                </div>
              ))
            : "No solo exhibitions have been added yet!"}
        </Paper>
        <Paper className={classes.paper}>
          <Typography variant="h6">Juried exhibits</Typography>
          {juried
            ? Object.keys(juried).map((x) => (
                <div className={classes.contentBlock} key={x}>
                  <Typography className={classes.text}>
                    {'"' + juried[x].name + '". '}
                    {juried[x].place + ". "}
                    {juried[x].dates + ". "}
                  </Typography>

                  <br></br>
                </div>
              ))
            : "No juried exhibitions been added yet!"}
        </Paper>
        <Paper className={classes.paper}>
          <Typography variant="h6">Selected exhibits</Typography>
          {selected
            ? Object.keys(selected).map((x) => (
                <div className={classes.contentBlock} key={x}>
                  <Typography className={classes.text}>
                    {'"' + selected[x].name + '". '}
                    {selected[x].place + ". "}
                    {selected[x].dates + ". "}
                  </Typography>

                  <br></br>
                </div>
              ))
            : "No selected exhibitions been added yet!"}
        </Paper>
      </div>
    );
  }

export default Exhibitions;
