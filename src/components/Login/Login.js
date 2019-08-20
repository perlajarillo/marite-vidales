import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { auth } from "../../firebase";
import { Link } from "react-router-dom";
import Snackbar from "@material-ui/core/Snackbar";
import SnackbarContentWrapper from "../SnackbarContentComponent/SnackbarContentComponent";

const styles = makeStyles(theme => ({
  wrapper: {
    margin: "50px 0",
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
    paddingBottom: theme.spacing(15),
    [theme.breakpoints.up("sm")]: {
      margin: "30px 0"
    },
    [theme.breakpoints.down("sm")]: {
      margin: "0px 0",
      paddingBottom: theme.spacing(10)
    },
    [theme.breakpoints.up("xs")]: { minHeight: "70vh" }
  },

  container: {
    paddingTop: theme.spacing(3),
    [theme.breakpoints.up("sm")]: {
      padding: theme.spacing(2)
    },
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(2)
    }
  },
  formControl: {
    margin: theme.spacing(1)
  },
  button: {
    marginTop: theme.spacing(2),
    marginLeft: theme.spacing(3),
    maxWidth: 410,
    [theme.breakpoints.up("xs")]: {
      maxWidth: 250,
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

export default function Login(props) {
  const classes = styles();
  const [state, setState] = useState({
    email: "",
    password: "",
    user: false,
    error: "",
    openSnackbarError: false
  });
  const { history } = props;

  const handleChange = event => {
    const { target } = event;
    const { value, name } = target;
    setState({ ...state, [name]: value });
  };

  const handleSubmit = event => {
    event.preventDefault();
    const { email, password } = state;

    auth
      .onLogIn(email, password)
      .then(() => {
        setState({
          ...state,
          email: email,
          password: password,
          authenticated: true
        });
        history.push("/mariteimages");
      })
      .catch(error => {
        setState({ ...state, error: error.message, openSnackbarError: true });
      });
  };

  /**
   * handleSnackbarClose - sets the actions when the snackbar is closed
   * @param {Object} event the event object
   * @param {Object} reason for closing the snackbar
   * @return {void}
   */
  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setState({ ...state, openSnackbarError: false });
  };

  const { email, password, error, openSnackbarError } = state;

  return (
    <div className={classes.wrapper}>
      <div className={classes.container}>
        <Card className={classes.card}>
          <form onSubmit={handleSubmit}>
            <Typography className={classes.text} variant="body1">
              Login to enter your account.
            </Typography>
            <CardContent>
              <FormControl
                className={classes.formControl}
                fullWidth
                aria-describedby="required"
                aria-required="true"
              >
                <TextField
                  id="email"
                  label="Email"
                  name="email"
                  type="email"
                  autoComplete="username email"
                  required
                  value={email}
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl
                className={classes.formControl}
                fullWidth
                aria-describedby="required"
                aria-required="true"
              >
                <TextField
                  id="password"
                  name="password"
                  type="password"
                  label="Password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={handleChange}
                />
              </FormControl>
              <Button
                variant="contained"
                type="submit"
                color="primary"
                fullWidth
                className={classes.button}
              >
                Log In
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                fullWidth
                component={Link}
                to="/password-reset"
                className={classes.button}
              >
                Reset my password
              </Button>
            </CardContent>
          </form>
        </Card>
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left"
          }}
          open={openSnackbarError}
          autoHideDuration={3000}
          onClose={handleSnackbarClose}
          id="openSnackbarError"
          name="openSnackbarError"
        >
          <SnackbarContentWrapper
            onClose={handleSnackbarClose}
            variant="error"
            message={error}
          />
        </Snackbar>
      </div>
    </div>
  );
}
