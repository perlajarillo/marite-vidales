import { Typography } from "@material-ui/core";
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { ActionIcons } from "../SetExhibitions/ActionIcons";

const styles = makeStyles((theme) => ({

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
}));


export function Exhibits(props) {
  const exhibitsObject = props.exhibitsObject;
  const classes = styles();
  return (Object.entries(exhibitsObject).sort((a, b) => b[0] - a[0]).map(entry => {
    const year = entry[0];
    const exhibits = entry[1];
    return (
      <Grid container wrap="nowrap" spacing={7} key={year}>
        <Grid item xs={1}>
          <Typography className={classes.text}>{year}</Typography>
        </Grid>
        <Grid item xs={8}>
          {exhibits.map((exhibit, idx) =>
            <Typography className={classes.text} key={idx} gutterBottom>
              <i>{exhibit.name + '. '}</i>
              {exhibit.place + ". "}
              {exhibit.dates + ". "}
            </Typography>
          )}
        </Grid>
        {props.isAuth &&
          <Grid item xs={4}>
            <ActionIcons />
          </Grid>}
      </Grid>
    )
  }))
};