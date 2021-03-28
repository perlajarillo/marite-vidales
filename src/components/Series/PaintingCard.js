import React from "react";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import { makeStyles } from "@material-ui/core/styles";


const styles = makeStyles(theme => ({
  card: {
    marginRight: "20px",
    marginBottom: "20px",
    width: "calc(20% - 20px)",
    wrap: "wrapper",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
    [theme.breakpoints.only("sm")]: {
      width: "calc(50% - 20px)",
    },
    [theme.breakpoints.only("md")]: {
      width: "calc(33.333% - 20px)",
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
    maxWidth: "17rem",
    maxHeight: "18rem",
    [theme.breakpoints.only("lg")]: {
        maxWidth: "14rem",
    },
    [theme.breakpoints.only("xs")]: {
      maxWidth: "23rem",
    },
    [theme.breakpoints.only("xl")]: {
        maxWidth: "21rem",
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