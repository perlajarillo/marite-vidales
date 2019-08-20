import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";

const styles = makeStyles(theme => ({
  wrapper: {
    margin: "20px 0",
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
    [theme.breakpoints.up("sm")]: {
      margin: "10px 0"
    },
    [theme.breakpoints.up("xs")]: { minHeight: "50vh" }
  },

  button: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    marginLeft: theme.spacing(3),
    maxWidth: 410,
    [theme.breakpoints.up("xs")]: {
      maxWidth: 270,
      marginLeft: theme.spacing(2),
      fontSize: "0.9rem"
    },
    [theme.breakpoints.up("sm")]: {
      maxWidth: 400,
      marginLeft: theme.spacing(3)
    },
    [theme.breakpoints.up("md")]: {
      maxWidth: 410,
      marginLeft: theme.spacing(3)
    },
    [theme.breakpoints.between("sm", "md")]: {
      maxWidth: 445,
      marginLeft: theme.spacing(3)
    }
  },
  text: {
    padding: theme.spacing(3),
    marginLeft: theme.spacing(2),
    color: theme.palette.primary.contrastText
  },
  card: {
    width: "500px",
    paddingBottom: "1%",
    [theme.breakpoints.up("xs")]: {
      width: "auto",
      marginTop: "5px"
    },
    [theme.breakpoints.up("sm")]: {
      width: "250px",
      marginTop: "40px"
    },
    [theme.breakpoints.up("md")]: {
      width: "500px",
      marginTop: "40px"
    },
    [theme.breakpoints.between("sm", "md")]: {
      width: "520px"
    }
  }
}));

export default function NoAuthenticated(props) {
  const classes = styles();

  return (
    <div className={classes.wrapper}>
      <div className={classes.container}>
        <Card className={classes.card}>
          <Typography className={classes.text} variant="body1">
            Only the artist can access this section.
          </Typography>
          <Button
            variant="outlined"
            color="secondary"
            fullWidth
            component={Link}
            to="/"
            className={classes.button}
          >
            Go to home page
          </Button>
        </Card>
      </div>
    </div>
  );
}
