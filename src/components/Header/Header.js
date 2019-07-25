import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { wrap } from "module";

const styles = theme => ({
  root: {
    flexGrow: 1,
    maxHeight: "100px"
  },

  menuButton: {
    marginRight: theme.spacing(2)
  },

  navbar: {
    background: theme.palette.primary.main,
    boxShadow: "none",
    paddingTop: 15,
    flex: "fixed"
  },

  navbarBrand: {
    color: "#66bb6a",
    fontSize: "3em",
    webkitTransition: "all 0.3s",
    transition: "all 0.3s",
    fontFamily: "Caveat"
  },
  links: {
    textDecoration: "none",
    color: "#000"
  },
  items: {
    fontSize: "90%",
    fontWeight: 400,
    padding: "0.75em 0",
    letterSpacing: "1px",
    color: theme.palette.primary.contrastText
  },
  container: {
    width: "100%",
    paddingRight: "150px",
    paddingLeft: "150px",
    marginRight: "0px",
    marginLeft: "0px",
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "space-between",
    minWidth: "992px !important"
  }
});

class Header extends Component {
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <AppBar position="fixed" className={classes.navbar}>
          <link
            href="https://fonts.googleapis.com/css?family=Caveat&display=swap"
            rel="stylesheet"
          />

          <Toolbar>
            {/*             <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="Menu"
            >
              <MenuIcon />
            </IconButton> */}
            <div className={classes.container}>
              <Typography variant="h6" className={classes.navbarBrand}>
                <a href="/" className={classes.links}>
                  Marite Vidales
                </a>
              </Typography>

              <Button
                color="inherit"
                className={classes.items}
                component={Link}
                to="/series"
              >
                Images{" "}
              </Button>
              <Button
                color="inherit"
                className={classes.items}
                component={Link}
                to="/"
              >
                Exhibits{" "}
              </Button>

              <Button
                color="inherit"
                className={classes.items}
                component={Link}
                to="/biography"
              >
                Biography{" "}
              </Button>
              <Button
                color="inherit"
                className={classes.items}
                component={Link}
                to="/"
              >
                Contact{" "}
              </Button>
            </div>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

export default withStyles(styles)(Header);
