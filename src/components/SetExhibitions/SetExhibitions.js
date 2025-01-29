import React, { useState, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import picture1 from "../../images/one.jpg";
import picture2 from "../../images/two.jpg";
import picture3 from "../../images/three.jpg";
import picture4 from "../../images/four.jpg";
import picture5 from "../../images/five.JPG";
import picture7 from "../../images/seven.JPG";
import picture8 from "../../images/eight.jpg";
import picture9 from "../../images/nine.jpg";
import picture10 from "../../images/ten.jpg";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Carousel from 'react-material-ui-carousel';
import Grid from '@material-ui/core/Grid';
import { getExhibitions } from "../../firebase/transactions";
import { groupByYear } from "../Exhibitions/utilities";
import { Exhibits } from "../Exhibitions/Exhibits";
import { Item } from "../Exhibitions/Item";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import SnackbarContentWrapper from "../SnackbarContentComponent/SnackbarContentComponent";
import BookIcon from "@material-ui/icons/Book";
import { ActionIcons } from "./ActionIcons";
import GalleryDialog from "./galleryDialog";
import GrantAwardDialog from "./grantAwardDialog";
import ExhibitionDialog from "./exhibitionDialog";
import { DeleteDialog, EntryType } from "./deleteDialog";

const styles = makeStyles((theme) => ({
  root: {
    maxWidth: "100%",
  },
  media: {
    height: 0,
    paddingTop: '70%',
  },

  carouselContainer: {
    textAlign: "center",
    width: "45%",
    margin: "auto",
    paddingBottom: "2em",
    [theme.breakpoints.down("md")]: {
      width: "100%",
    },

  },
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
  },

  contentBlock: { paddingTop: theme.spacing(2) },
  text: {
    textAlign: "justify",
    fontSize: "0.95rem",
    paddingLeft: theme.spacing(30),
    paddingRight: theme.spacing(30),
    [theme.breakpoints.down("sm")]: {
      paddingLeft: theme.spacing(1),
      paddingRight: theme.spacing(1),
    },
  },
  legend: {
    fontSize: "0.85rem",
    color: "#fff",

  },
  cardContent: {
    backgroundColor: "black",
    opacity: .4,
    '&:hover': {
      opacity: .6
    }

  },
  btn: {
    marginLeft: 10,
    marginRight: 0,
    [theme.breakpoints.down("sm")]: {
      marginTop: theme.spacing(1)
    }
  },
  actions: {
    display: "flex",
  },

  actionDelete: {
    margin: theme.spacing(1),
    backgroundColor: "#c62828",
    color: theme.palette.secondary.contrastText
  },
  fab: {
    margin: theme.spacing(1),
    paddingTop: 0,
  },

}));

const SetExhibitions = (props) => {
  const [grantsAndAwards, setGrantsAndAwards] = useState({});
  const [selectedByYear, setSelectedByYear] = useState({});
  const [soloByYear, setSoloByYear] = useState({});
  const [juriedByYear, setJuriedByYear] = useState({});
  const [galleries, setGalleries] = useState({});
  const [openGalleries, setOpenGalleries] = useState(false);
  const [openGrantsAndAwards, setOpenGrantsAndAwards] = useState(false);
  const [openExhibitions, setOpenExhibitions] = useState(false);
  const [addingSolo, setAddingSolo] = useState(false);
  const [addingJuried, setAddingJuried] = useState(false);
  const [addingGroup, setAddingGroup] = useState(false);
  const [selectedItem, setSelectedItem] = useState(undefined);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState(undefined);
  const [typeOfMessage, setTypeOfMessage] = useState("success");
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [entryType, setEntryType] = useState(undefined);

  const classes = styles();
  const carouselItems = [
    {
      image: picture1,
      legend: "Fondo de Cultura Economica FCE, Lima, Peru"
    },
    {
      image: picture2,
      legend: "Galeria de Arte Ryoichi Jinnai, Centro Cultural Peruano Japones, Lima Peru"
    },
    {
      image: picture3,
      legend: "Fruits of Nature. Universidad Femenina del Sagrado Corazón (UNIFE), Lima, Peru."
    },
    {
      image: picture4,
      legend: "Montpelier Arts Center, Laurel, Montpelier Juried Art Exhibit"
    },
    {
      image: picture5,
      legend: ""
    },
    {
      image: picture7,
      legend: "Timeless Huacas"
    },
    {
      image: picture8,
      legend: "Torpedo Factory Art Center"
    },
    {
      image: picture9,
      legend: "Hill Center"
    },
    {
      image: picture10,
      legend: "In the studio"
    }

  ];

  const getExhibitsData = () => {
    getExhibitions().then(snapshot => {
      const solo = snapshot.val().solo;
      const selected = snapshot.val().selected;
      const juried = snapshot.val().juried;
      setGalleries(snapshot.val().galleries);
      setGrantsAndAwards(snapshot.val().grantsAndAwards);
      setSelectedByYear(selected && groupByYear(selected));
      setSoloByYear(solo && groupByYear(solo));
      setJuriedByYear(juried && groupByYear(juried));
      setSelectedItem(undefined);
    });

  }

  useEffect(() => {
    if (props.authUser) {
      getExhibitsData()
    }
  }, [props]);

  useEffect(() => {
    if (snackbarMessage) {
      setOpenSnackbar(true);
    }
  }, [snackbarMessage]);

  const toggleOpenGalleries = (item) => {
    setSelectedItem(item);
    setOpenGalleries(!openGalleries);
  };

  const toggleOpenGrantsAndAwards = (item) => {
    setSelectedItem(item);
    setOpenGrantsAndAwards(!openGrantsAndAwards)
  };

  const toggleOpenExhibitions = () => {
    setOpenExhibitions(!openExhibitions)
    setAddingSolo(false);
    setAddingJuried(false);
    setAddingGroup(false);
  };

  const handleOpenSolo = (item) => {
    setSelectedItem(item);
    setOpenExhibitions(true);
    setAddingSolo(true);
  };

  const handleOpenJuried = (item) => {
    setSelectedItem(item);
    setOpenExhibitions(true);
    setAddingJuried(true);
  };

  const handleOpenGroup = (item) => {
    setSelectedItem(item);
    setOpenExhibitions(true);
    setAddingGroup(true);
  };

  const handleOpenDeleteDialog = (item, entryType) => {
    setOpenDeleteDialog(true);
    setEntryType(entryType);
    setSelectedItem(item);
  }

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarMessage(undefined);
    setOpenSnackbar(false);
  };

  const handleCloseDeleteDialog = (entryWasRemoved, isError) => {
    setOpenDeleteDialog(false);
    setEntryType(undefined);
    entryWasRemoved && !isError && getExhibitsData();
    if (entryWasRemoved || isError) {
      setTypeOfMessage("error");
      setSnackbarMessage(isError
        ? "Something went wrong, entry has NOT been removed"
        : "Entry has been removed");
    }
    setSelectedItem(undefined);
  }

  const exhibitionType = addingSolo
    ? "Selected Solo"
    : addingJuried
      ? "Selected Juried"
      : addingGroup
        ? "Selected Group"
        : undefined;
  const grantsAndAwardsArray = Object.keys(grantsAndAwards).slice(0).reverse();
  const galleriesArray = Object.keys(galleries).slice(0).reverse();

  return (
    <div className={classes.masthead}>
      <Typography variant="h4" color="secondary" gutterBottom>
        Exhibits
      </Typography>
      <br></br>
      <Paper className={classes.paper}>
        <Carousel
          autoPlay={true}
          className={classes.carouselContainer}
          fullHeightHover={false}
        >
          {carouselItems.map((i, idx) => <Item image={i.image} legend={i.legend} key={idx} />)}

        </Carousel>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => toggleOpenGalleries(undefined)}
          className={classes.btn}
        >
          Add gallery <BookIcon className={classes.icon} />
        </Button>
        <Typography variant="h6">Galleries </Typography>
        {galleries
          ? galleriesArray.map((i) => (
            <Grid container wrap="nowrap" spacing={7} key={i}>
              <Grid item xs={9}>
                <div className={classes.contentBlock} key={i}>
                  <Typography className={classes.text}>
                    {galleries[i].gallery + ". "}
                    {galleries[i].address + ". "}
                  </Typography>
                </div></Grid>
              <Grid item xs={4}>
                <ActionIcons
                  openEditDialog={toggleOpenGalleries}
                  selectedItem={{ key: i, ...galleries[i] }}
                  handleOpenDeleteDialog={handleOpenDeleteDialog}
                  entryType={EntryType.Gallery}
                />
              </Grid>
            </Grid>
          ))
          : "No galleries have been added yet!"}
        <br></br>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => toggleOpenGrantsAndAwards(undefined)}
          className={classes.btn}
        >
          Add grant/award <BookIcon className={classes.icon} />
        </Button>
        <Typography variant="h6">Grants and Awards </Typography>
        {grantsAndAwards
          ? grantsAndAwardsArray.map((i) => (
            <Grid container wrap="nowrap" spacing={7} key={i}>
              <Grid item xs={9}>
                <div className={classes.contentBlock} key={i}>
                  <Typography className={classes.text}>
                    {grantsAndAwards[i]}
                  </Typography>
                </div>
              </Grid>
              <Grid item xs={4}>
                <ActionIcons
                  openEditDialog={toggleOpenGrantsAndAwards}
                  selectedItem={{ key: i, grantAward: grantsAndAwards[i] }}
                  handleOpenDeleteDialog={handleOpenDeleteDialog}
                  entryType={EntryType.GrantAward}
                />
              </Grid>
            </Grid>
          ))
          : "No grants and awards have been added yet!"}
        <br></br>
        <br></br>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => handleOpenSolo(undefined)}
          className={classes.btn}
        >
          Add solo exhibition <BookIcon className={classes.icon} />
        </Button>
        <Typography variant="h6" gutterBottom>Selected Solo Exhibitions </Typography>
        {soloByYear
          ? <Exhibits
            exhibitsObject={soloByYear}
            isAuth={props.authUser}
            openEditDialog={handleOpenSolo}
            entryType={EntryType.Solo}
            handleOpenDeleteDialog={handleOpenDeleteDialog}
          />
          : "No solo exhibitions have been added yet!"}
      </Paper>
      <Paper className={classes.paper}>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => handleOpenJuried(undefined)}
          className={classes.btn}
        >
          Add selected juried exhibition <BookIcon className={classes.icon} />
        </Button>
        <Typography variant="h6" gutterBottom>Selected Juried Exhibitions</Typography>
        {juriedByYear
          ? <Exhibits
            exhibitsObject={juriedByYear}
            isAuth={props.authUser}
            openEditDialog={handleOpenJuried}
            entryType={EntryType.Juried}
            handleOpenDeleteDialog={handleOpenDeleteDialog}
          />
          : "No juried exhibitions been added yet!"}
      </Paper>
      <Paper className={classes.paper}>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => handleOpenGroup(undefined)}
          className={classes.btn}
        >
          Add selected group exhibition <BookIcon className={classes.icon} />
        </Button>
        <Typography variant="h6" gutterBottom>Selected Group Exhibitions</Typography>
        {selectedByYear
          ? <Exhibits
            exhibitsObject={selectedByYear}
            isAuth={props.authUser}
            openEditDialog={handleOpenGroup}
            entryType={EntryType.Group}
            handleOpenDeleteDialog={handleOpenDeleteDialog}
          />
          : "No selected exhibitions been added yet!"}
      </Paper>
      <GalleryDialog
        openGalleries={openGalleries}
        toggleOpenGalleries={toggleOpenGalleries}
        getExhibitsData={getExhibitsData}
        selectedItem={selectedItem}
        setSnackbarMessage={setSnackbarMessage}
      />
      <GrantAwardDialog
        openGrantsAndAwards={openGrantsAndAwards}
        toggleOpenGrantsAndAwards={toggleOpenGrantsAndAwards}
        getExhibitsData={getExhibitsData}
        selectedItem={selectedItem}
        setSnackbarMessage={setSnackbarMessage}
      />
      <ExhibitionDialog
        openExhibitions={openExhibitions}
        toggleOpenExhibitions={toggleOpenExhibitions}
        exhibitionType={exhibitionType}
        getExhibitsData={getExhibitsData}
        selectedItem={selectedItem}
        setSnackbarMessage={setSnackbarMessage}
      />
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left"
        }}
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        id="openSnackbarError"
        name="openSnackbarError"
      >
        <SnackbarContentWrapper
          onClose={handleSnackbarClose}
          variant={typeOfMessage}
          message={snackbarMessage}
        />
      </Snackbar>
      <DeleteDialog
        openDeleteDialog={openDeleteDialog}
        handleCloseDeleteDialog={handleCloseDeleteDialog}
        entryType={entryType}
        selectedItem={selectedItem}
      />
    </div >
  );
}

export default SetExhibitions;

