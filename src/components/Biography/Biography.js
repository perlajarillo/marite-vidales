import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import marite from "../../images/Mariteweb.jpg";

import { Typography } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";

const styles = theme => ({
  root: {
    padding: theme.spacing(3, 2)
  },
  image: {
    display: "block",
    marginLeft: "auto",
    marginRight: "auto"
  },

  container: {
    width: "50%",
    padding: "100px",
    marginRight: "auto",
    marginLeft: "auto",
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "space-between",
    minWidth: "992px !important"
  }
});

class Biography extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <meta name="description" content="" />
        <meta name="author" content="" />

        <title>Marite Vidales</title>

        <section id="about">
          <div className={classes.container}>
            <Paper className={classes.root}>
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
          </div>
        </section>
      </div>
    );
  }
}

export default withStyles(styles)(Biography);
