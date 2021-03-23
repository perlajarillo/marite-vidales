import React from "react";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import { makeStyles } from "@material-ui/core/styles";


const styles = makeStyles(theme => ({
  card: {
    margin: "10px",
    width: "18.2%",
    wrap: "wrapper",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
    [theme.breakpoints.between("sm", "md")]: {
      width: "25%",
    },
  },

  cardContent: {
    width: "100%",
    height: "20rem",
  },
  regularImage: {
    width: "auto",
    height: "auto",
    paddingLeft: "9px",
    paddingRight: "9px",
    maxWidth: "260px",
    maxHeight: "240px",
    [theme.breakpoints.between("sm", "md")]: {
    maxHeight: "250px",
      maxWidth: "200px",
    },

        [theme.breakpoints.down("sm")]: {
    maxHeight: "303px",
      maxWidth: "431px",
    },
  },
  cards: {
    display: "flex",
    flexFlow: "row wrap",
    [theme.breakpoints.up("sm")]: {
      padding: theme.sectionPadding.padding,
    },
  },
    picture: {
    textAlign: "center",
    display: "inline-block",
  },
}));


export default function PaintingCard(props)
{
  const classes = styles();
  return (
    <Card
      className={classes.card}
      onClick={()=>props.handleClickOpen(props?.image)}
      name={props?.image?.url}
    >
  <CardActionArea className={classes.cardContent}>
    <div className={classes.picture}>
      <CardMedia
        component="img"
        image={props?.image?.url}
        title={props?.image?.title}
        className={classes.regularImage}
      />
    </div>
  </CardActionArea>
  </Card>);
}