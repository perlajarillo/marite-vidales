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
import Carousel from 'react-material-ui-carousel';
import Grid from '@material-ui/core/Grid';


const solo = exhibitions.solo;
const selected = exhibitions.selected;
const galleries = exhibitions.galleries;
const juried = exhibitions.juried;
const grantsAndAwards = exhibitions.grantsAndAwards;

const groupByYear = (objectOfExhibits) =>
  [...Object.values(objectOfExhibits)].reduce((acc, value) => {
    // Group initialization
    if (!acc[value.year]) {
      acc[value.year] = [];
    }
    // Grouping
    acc[value.year].push(value);

    return acc;
  }, {});

const selectedByYear = groupByYear(selected);
const soloByYear = groupByYear(solo);
const juriedByYear = groupByYear(juried);

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
    paddingBottom: "2em",
    [theme.breakpoints.down("md")]: {
      width: "100%",
    },

  },
  masthead: {
    textAlign: "center",
    color: "white",
    paddingTop: "50px",
    paddingBottom: "110px",
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
    color: "#fff",

  },
  cardContent: {
    backgroundColor: "black",
    opacity: .4,
    '&:hover': {
      opacity: .6
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
        <Typography variant="caption" color="secondary" className={classes.legend}>
          {props.legend}
        </Typography>
      </CardContent>
    </Card>)
};

function Exhibits(props) {
  const exhibitsObject = props.exhibitsObject;
  const classes = styles();
  return (Object.entries(exhibitsObject).sort((a, b) => b[0] - a[0]).map(entry => {
    const year = entry[0];
    const exhibits = entry[1];
    return (
      <Grid container wrap="nowrap" spacing={7} key={year}>
        <Grid item xs={1}>
          <Typography className={classes.text}>{year}</Typography>
        </Grid>
        <Grid item xs={11}>
          {exhibits.map((exhibit, idx) =>
            <Typography className={classes.text} key={idx} gutterBottom>
              <i>{exhibit.name + '. '}</i>
              {exhibit.place + ". "}
              {exhibit.dates + ". "}
            </Typography>
          )}
        </Grid>
      </Grid>
    )
  }))
};

const Exhibitions = () => {
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
          {carouselItems.map((i, idx) => <Item image={i.image} legend={i.legend} key={idx} />)}

        </Carousel>
        <Typography variant="h6">Galleries </Typography>
        {galleries
          ? Object.keys(galleries).map((i) => (
            <div className={classes.contentBlock} key={i}>
              <Typography className={classes.text}>
                {galleries[i].gallery + ". "}
                {galleries[i].address + ". "}
              </Typography>

            </div>
          ))
          : "No galleries have been added yet!"}
        <br></br>
        <Typography variant="h6">Grands and Awards </Typography>
        {grantsAndAwards
          ? Object.keys(grantsAndAwards).map((i) => (
            <div className={classes.contentBlock} key={i}>
              <Typography className={classes.text}>
                {grantsAndAwards[i]}
              </Typography>
            </div>
          ))
          : "No grants and awards have been added yet!"}
        <br></br>
        <br></br>
        <Typography variant="h6" gutterBottom>Selected Solo Exhibitions </Typography>
        {soloByYear
          ? <Exhibits exhibitsObject={soloByYear} />
          : "No solo exhibitions have been added yet!"}
      </Paper>
      <Paper className={classes.paper}>
        <Typography variant="h6" gutterBottom>Selected Juried Exhibitions</Typography>
        {juriedByYear
          ? <Exhibits exhibitsObject={juriedByYear} />
          : "No juried exhibitions been added yet!"}
      </Paper>
      <Paper className={classes.paper}>
        <Typography variant="h6" gutterBottom>Selected Group Exhibitions</Typography>
        {selectedByYear ? <Exhibits exhibitsObject={selectedByYear} />
          : "No selected exhibitions been added yet!"}
      </Paper>
    </div >
  );
}

export default Exhibitions;
