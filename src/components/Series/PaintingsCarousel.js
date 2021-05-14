

import React from "react";
import Paper from "@material-ui/core/Paper";
import Carousel from 'react-material-ui-carousel';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from "@material-ui/core";
import { Author } from "../../constants";

const styles = makeStyles((theme) => ({
  root: {
    maxWidth: "100%",
  },
  carouselContainer: {
    textAlign: "center",
    width: "60%",
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
    padding: theme.spacing(1),
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

  },
  image: {
    width: "auto",
    height: "auto",
    maxHeight: theme.spacing(95),
    maxWidth: theme.spacing(150),
    [theme.breakpoints.down("sm")]: {
      maxWidth: theme.spacing(35),
      padding: 0,
    },
    padding: "10px",
  },

}));

function Painting(props) {
  const classes = styles();
  const { paintingData } = props;
  const { title, year, technique, measures, url, collectionType } = paintingData;
  const measuresArray = measures.split("x");
  const widthIn = measuresArray[0].split("\"");
  const heightIn = measuresArray[1].split("\"");
  const measuresIn = `${widthIn[0]}x${heightIn[0]} in`;
  const widthCm = widthIn[0] * 2.54;
  const heightCm = heightIn[0] * 2.54;
  const measuresCm = `${widthCm}x${heightCm} cm`;
  const collectionTypeString = collectionType ? ` ${collectionType}.` : "";
  const authorString = `${Author}, `;
  const yearString = `, ${year}. `;
  const workDetails = `${technique}, ${measuresIn}. (${measuresCm}). ${collectionTypeString}`;
  return (
    <Card className={classes.root}>
      <img
        src={url}
        alt={title}
        className={classes.image}
      />
      <CardContent className={classes.cardContent}>
        <Typography variant="caption" color="secondary" className={classes.legend}>
          {authorString}
          <i>{title}</i>
          {yearString}
          {workDetails}
        </Typography>
      </CardContent>
    </Card>)
};

export default function PaintingsCarousel(props) {
  const classes = styles();
  const { carouselPaintings, selectedImage } = props;
  const index = carouselPaintings.findIndex(i => i.url === selectedImage.url);
  return <Paper className={classes.paper}>
    <Carousel
      autoPlay={true}
      className={classes.carouselContainer}
      fullHeightHover={false}
      index={index >= 0 ? index : 0}
    >
      {carouselPaintings.map((i, idx) => <Painting paintingData={i} legend={i.legend} key={idx} />)}

    </Carousel>
  </Paper>
};