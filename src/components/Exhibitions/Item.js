import React from "react";
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import { Typography } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';

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