import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Axios from 'axios'
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import SnackbarContentWrapper from "../SnackbarContentComponent/SnackbarContentComponent";
import { Typography } from "@material-ui/core";
import { firebase } from "../../firebase";
import { REACT_FUNCTION_URL } from "../../functions_env";

const styles = makeStyles((theme) => ({
  masthead: {
    textAlign: "center",
    color: "white",
    paddingTop: "50px",
    paddingBottom: "110px",
    paddingLeft: "50px",
    paddingRight: "50px",
    [theme.breakpoints.down("sm")]: {
      paddingLeft: "10px",
      paddingRight: "10px",
    },
  },
  paper: {
    padding: theme.spacing(4),
    margin: "auto",
    alignItems: "center"
  },
  form: {
    paddingLeft: "20%",
    paddingRight: "20%"
  },
}));

const Contact = () => {
  const [formData, setFormData] = useState({});
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const classes = styles();

  const updateInput = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }
  const handleSubmit = event => {
    event.preventDefault()
    sendEmail();
    setFormData({
      name: '',
      email: '',
      message: '',
    });
  }
  const sendEmail = () => {

    Axios.post(
      REACT_FUNCTION_URL,
      formData
    ).then(setOpenSnackbar(true)).catch(error => {
      console.log(error)
    })
  }

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };

  return (
    <div className={classes.masthead}>
      <Typography variant="h4" color="secondary" gutterBottom>
        Contact
      </Typography>
      <Paper className={classes.paper}>

        <Typography variant="body2" color="secondary" gutterBottom>
          Please send me a message with your request and I will contact you as soon as possible.
        </Typography>
        <form onSubmit={handleSubmit} className={classes.form}>
          <TextField
            type="text"
            name="name"
            placeholder="Name"
            onChange={updateInput}
            fullWidth
            value={formData.name || ''}
            required
            margin="normal"
          />
          <TextField
            type="email"
            name="email"
            placeholder="Email"
            onChange={updateInput}
            fullWidth
            value={formData.email || ''}
            required
            margin="normal"
          />
          <TextField
            type="text"
            name="message"
            placeholder="Enter your information request here, e.g. the art work you are interested in"
            onChange={updateInput}
            fullWidth
            value={formData.message || ''}
            multiline
            required
            margin="normal"
            rows="7"
            className={classes.inputMessage}
          />
          <Button
            className={classes.button}
            color="secondary"
            variant="contained"
            type="submit"
          >
            Submit
          </Button>
        </form>
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left"
          }}
          open={openSnackbar}
          autoHideDuration={3000}
          onClose={handleSnackbarClose}
          id="openSnackbar"
          name="openSnackbar"
        >
          <SnackbarContentWrapper
            onClose={handleSnackbarClose}
            variant="success"
            message="Your message has been sent"
          />
        </Snackbar>
      </Paper>

    </div>
  )
}

export default Contact;