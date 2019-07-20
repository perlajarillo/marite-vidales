import React, { useEffect, useState, Component } from "react";
import { useDropzone } from "react-dropzone";
import { makeStyles } from "@material-ui/core/styles";
import { withStyles } from "@material-ui/core/styles";
import Dropzone from "react-dropzone";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import Typography from "@material-ui/core/Typography";
import { addNewSeries } from "../../firebase/transactions";

const styles = makeStyles(theme => ({
  masthead: {
    textAlign: "center",
    paddingTop: "150px",
    paddingBottom: "100px",
    paddingLeft: "50px",
    flexGrow: 1
  },
  button: {
    backgroundColor: "#00c853",
    color: theme.palette.secondary.contrastText,
    fontSize: "1.05rem",
    fontFamily: '"Montserrat"',
    "&:hover": { backgroundColor: "#ffc400" }
  },
  formControl: {
    display: "block",
    margin: "20px 0",
    [theme.breakpoints.up("xs")]: {
      margin: "5px 0"
    },
    [theme.breakpoints.up("sm")]: {
      margin: "15px 0"
    },
    [theme.breakpoints.up("md")]: {
      margin: "20px 0"
    },

    [theme.breakpoints.between("sm", "md")]: {
      margin: "10px 0"
    }
  },
  textField: {
    [theme.breakpoints.up("xs")]: {
      width: 200
    },
    [theme.breakpoints.up("sm")]: {
      width: 400
    },
    [theme.breakpoints.up("md")]: {
      width: 450
    },

    [theme.breakpoints.between("sm", "md")]: {
      width: 250
    },
    [theme.breakpoints.only("lg")]: {
      width: 400
    }
  }
}));

const thumbsContainer = {
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  marginTop: 16
};

const thumb = {
  display: "inline-flex",
  borderRadius: 2,
  border: "1px solid #eaeaea",
  marginBottom: 8,
  marginRight: 8,
  width: 100,
  height: 100,
  padding: 4,
  boxSizing: "border-box"
};

const thumbInner = {
  display: "flex",
  minWidth: 0,
  overflow: "hidden"
};

const img = {
  display: "block",
  width: "auto",
  height: "100%"
};

export default function Previews(props) {
  const classes = styles();
  const [series, setSeries] = useState({
    name: "",
    description: "",
    files: []
  });

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    onDrop: acceptedFiles => {
      setSeries({
        ...series,
        files: acceptedFiles.map(file =>
          Object.assign(file, {
            preview: URL.createObjectURL(file)
          })
        )
      });
    }
  });

  const thumbs = series.files.map(file => (
    <div style={thumb} key={file.name}>
      <div style={thumbInner}>
        <img src={file.preview} alt={file.name} style={img} />
      </div>
    </div>
  ));

  useEffect(
    () => () => {
      // Make sure to revoke the data uris to avoid memory leaks
      series.files.forEach(file => URL.revokeObjectURL(file.preview));
    },
    [series.files]
  );

  const handleChange = name => event => {
    setSeries({ ...series, [name]: event.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    addNewSeries(series)
      .then(() => {
        console.log("all good!");
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <div className={classes.masthead}>
      <Typography variant="h4" color="textSecondary">
        New series of paintings
      </Typography>
      <form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <FormControl required className={classes.formControl}>
          <TextField
            id="series_name"
            label="Series name"
            placeholder="Series name"
            className={classes.textField}
            margin="normal"
            value={series.name}
            onChange={handleChange("name")}
          />
        </FormControl>
        <FormControl required className={classes.formControl}>
          <TextField
            id="standard-textarea"
            label="Series description"
            placeholder="Series description"
            multiline
            className={classes.textField}
            margin="normal"
            value={series.description}
            onChange={handleChange("description")}
          />
          <section className="container">
            <div {...getRootProps({ className: "dropzone" })}>
              <input {...getInputProps()} />
              <p>Drag and drop some files here, or click to select files</p>
            </div>
            <aside style={thumbsContainer}>{thumbs}</aside>
          </section>
          <Button color="secondary" className={classes.button} type="submit">
            Save
          </Button>
        </FormControl>
      </form>
    </div>
  );
}

/* class NewSeries extends Component {
  constructor() {
    super();
    this.onDrop = files => {
      this.setState({
        files: files.map(file =>
          Object.assign(file, {
            preview: URL.createObjectURL(file)
          })
        )
      });
    };
    this.state = {
      files: []
    };
  }
  render() {
    const { classes } = this.props;
    const files = this.state.files.map(file => (
      <div style={thumb} key={file.name}>
        <div style={thumbInner}>
          <img src={file.preview} style={img} />
        </div>
      </div>
    ));
    return (
      <div className={classes.masthead}>
        <div>
          <Dropzone onDrop={this.onDrop}>
            {({ getRootProps, getInputProps }) => (
              <section className="container">
                <div {...getRootProps({ className: "dropzone" })}>
                  <input {...getInputProps()} />
                  <p>Drag 'n' drop some files here, or click to select files</p>
                </div>
                <aside>
                  <h4>Files</h4>
                  <ul>{files}</ul>
                </aside>
              </section>
            )}
          </Dropzone>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(NewSeries);
 */
