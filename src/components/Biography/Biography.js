import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import marite from "../../images/Mariteweb.jpg";
import Grid from "@material-ui/core/Grid";

import { Typography } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";

const styles = theme => ({
  image: {
    borderRadius: "80%",
    with: "250px",
    height: "250px"
  },

  masthead: {
    textAlign: "center",
    color: "white",
    paddingTop: "50px",
    paddingBottom: "100px",
    paddingLeft: "50px",
    [theme.breakpoints.down("sm")]: {
      paddingLeft: "10px"
    }
  },
  paper: {
    padding: theme.spacing(4),
    margin: "auto",
    maxWidth: 450
  },
  info: { paddingRight: theme.spacing(4) },
  contentBlock: { padding: theme.spacing(4) },
  text: {
    textAlign: "left",
    alignSelf: "left",
    fontSize: "0.85rem"
  },
  subtitle: {
    textAlign: "left",
    fontSize: "1.2rem",
    style: "bold",
    textTransform: "uppercase"
  }
});

class Biography extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.masthead}>
        <Typography variant="h4" color="secondary" gutterBottom>
          Marite Vidales' Biography
        </Typography>
        <Grid container spacing={2}>
          <Grid item>
            <Paper className={classes.paper}>
              <img
                src={marite}
                alt="Marite Vidales"
                className={classes.image}
              />
              <Typography variant="body2" gutterBottom>
                Marité Vidales was born in San José, Costa Rica, where she
                graduated from the School of Fine Arts of the University of
                Costa Rica. For over 25 years, Marité has exhibited throughout
                United States, Costa Rica, Germany, and Peru. Her work reflects
                a passion for symbols and colors.
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm container>
            <Grid
              item
              xs
              container
              direction="column"
              spacing={0}
              className={classes.info}
            >
              <Paper className={classes.paperContent}>
                <Typography variant="h6">Education</Typography>

                <div className={classes.contentBlock}>
                  <Typography className={classes.subtitle}>
                    Fine Arts
                  </Typography>
                  <Typography variant="body2" className={classes.text}>
                    Bachelor's degree{" "}
                  </Typography>
                  <Typography variant="body2" className={classes.text}>
                    University of Costa Rica{" "}
                  </Typography>
                  <Typography variant="body2" className={classes.text}>
                    San Jose, Costa Rica. 1987{" "}
                  </Typography>
                </div>
              </Paper>
              <Paper className={classes.paperContent}>
                <Typography variant="h6">Professional experience</Typography>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(Biography);
