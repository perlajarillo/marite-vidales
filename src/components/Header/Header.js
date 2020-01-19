import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import AuthUserContext from "../Session/context";
import { auth } from "../../firebase";

const styles = theme => ({
  root: {
    flexGrow: 1,
    display: "flex"
  },

  links: {
    textDecoration: "none",
    color: "#000"
  },
  items: {
    letterSpacing: "1px",
    color: theme.palette.primary.contrastText,
    marginLeft: 50,
    [theme.breakpoints.down("xs")]: {
      fontSize: "0.9rem",
      marginLeft: 5
    }
  },
  brand: {
    flex: 1,
    [theme.breakpoints.down("xs")]: {
      fontSize: "1.1rem"
    }
  }
});

const NavNoAuth = props => {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h5" className={classes.brand}>
            <a href="/" className={classes.links}>
              Marite Vidales
            </a>
          </Typography>
          <div>
            <Button
              color="inherit"
              className={classes.items}
              component={Link}
              to="/"
            >
              Home
            </Button>
            <Button
              color="inherit"
              className={classes.items}
              component={Link}
              to="/series"
            >
              Artwork
            </Button>
            <Button
              color="inherit"
              className={classes.items}
              component={Link}
              to="/exhibitions"
            >
              Exhibits
            </Button>
            <Button
              color="inherit"
              className={classes.items}
              component={Link}
              to="/biography"
            >
              Biography
            </Button>
            <Button
              color="inherit"
              className={classes.items}
              component={Link}
              to="/reviews"
            >
              Reviews
            </Button>
            {/*             <Button
              color="inherit"
              className={classes.items}
              component={Link}
              to="/"
            >
              Contact{" "}
            </Button> */}
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};

const NavAuth = props => {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h5" className={classes.brand}>
            <a href="/" className={classes.links}>
              Marite Vidales
            </a>
          </Typography>
          <div>
            <Button
              color="inherit"
              className={classes.items}
              component={Link}
              to="/myseries"
            >
              My Series
            </Button>
            <Button
              color="inherit"
              className={classes.items}
              component={Link}
              to="/setbiography"
            >
              Biography
            </Button>
            <Button
              color="inherit"
              className={classes.items}
              component={Link}
              to="/"
            >
              Exhibits
            </Button>

            <Button
              color="inherit"
              className={classes.items}
              component={Link}
              onClick={auth.onLogOut}
              to="/"
            >
              Log out
            </Button>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};
class Header extends Component {
  render() {
    const { classes } = this.props;
    return (
      <AuthUserContext.Consumer>
        {authUser =>
          authUser ? (
            <NavAuth classes={classes} />
          ) : (
            <NavNoAuth classes={classes} />
          )
        }
      </AuthUserContext.Consumer>
    );
  }
}

export default withStyles(styles)(Header);
