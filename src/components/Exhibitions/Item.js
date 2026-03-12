import React from "react";
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import { Typography } from "@mui/material";
import { makeStyles } from '@mui/styles';

const styles = makeStyles((theme) => ({
  root: {
    maxWidth: "100%",
  },
  media: {
    height: 0,
    paddingTop: '70%',
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

export const Item = (props) => {
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