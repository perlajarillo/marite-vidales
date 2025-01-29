

import React from "react";
import Paper from "@material-ui/core/Paper";
import Carousel from 'react-material-ui-carousel';
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
    width: "100%",
    margin: "auto",
    paddingBottom: "0.2em",

  },

  paper: {
    margin: "0px",
  },
  legend: {
    fontSize: "0.85rem",
  },
  cardContent: {
    paddingBottom: "2px !important"
  },
  image: {
    width: "auto",
    height: "auto",
    maxHeight: theme.spacing(78),
    [theme.breakpoints.down("sm")]: {
      maxWidth: "90%",
      padding: 0,
    },
    padding: "0px",
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
    <div className={classes.root}>
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
    </div>)
};

export default function PaintingsCarousel(props) {
  const classes = styles();
  const { carouselPaintings, selectedImage } = props;
  const index = carouselPaintings.findIndex(i => i.url === selectedImage.url);
  return <Paper className={classes.paper}>
    <Carousel
      autoPlay={false}
      className={classes.carouselContainer}
      fullHeightHover={false}
      index={index >= 0 ? index : 0}
    >
      {carouselPaintings.map((i, idx) => <Painting paintingData={i} legend={i.legend} key={idx} />)}

    </Carousel>
  </Paper>
};