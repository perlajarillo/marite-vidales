import React, { useState, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
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
import Carousel from 'react-material-ui-carousel';
import { getExhibitions } from "../../firebase/transactions";
import { groupByYear } from "./utilities";
import { Exhibits } from "./Exhibits";
import { Item } from "./Item";

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

const Exhibitions = () => {
  const [grantsAndAwards, setGrantsAndAwards] = useState({});
  const [selectedByYear, setSelectedByYear] = useState({});
  const [soloByYear, setSoloByYear] = useState({});
  const [juriedByYear, setJuriedByYear] = useState({});
  const [galleries, setGalleries] = useState({});

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

  const getExhibitsData = () => {
    getExhibitions().then(snapshot => {
      const solo = snapshot.val().solo;
      const selected = snapshot.val().selected;
      const juried = snapshot.val().juried;
      setGalleries(snapshot.val().galleries);
      setGrantsAndAwards(snapshot.val().grantsAndAwards);
      setSelectedByYear(selected && groupByYear(selected));
      setSoloByYear(solo && groupByYear(solo));
      setJuriedByYear(juried && groupByYear(juried));

    });

  }

  useEffect(() => {
    getExhibitsData()
  }, []);

  const grantsAndAwardsArray = Object.keys(grantsAndAwards).slice(0).reverse();
  const galleriesArray = Object.keys(galleries).slice(0).reverse();

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
          ? galleriesArray.map((i) => (
            <div className={classes.contentBlock} key={i}>
              <Typography className={classes.text}>
                {galleries[i].gallery + ". "}
                {galleries[i].address + ". "}
              </Typography>

            </div>
          ))
          : "No galleries have been added yet!"}
        <br></br>
        <Typography variant="h6">Grants and Awards </Typography>
        {grantsAndAwards
          ? grantsAndAwardsArray.map((i) => (
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
