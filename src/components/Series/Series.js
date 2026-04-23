import React, { useState, useEffect } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import noPicture from "../../images/noPicture.png";
import { styled } from "@mui/material/styles";

import { db } from "../../firebase";


const StyledCard = styled(Card)(({ theme }) => 
  ({
    width: "calc(50% - 50px)",
    marginRight: "50px",
    marginBottom: "50px",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      marginLeft: "30px",
      marginRight: "30px",
      marginBottom: "30px",
    }})
  );

  const StyledCardMedia = styled(CardMedia) (({ theme }) => ({
    height: "350px",
    [theme.breakpoints.down("xs")]: {
      height: "250px"
    },
  })
);

const StyledCardContent = styled(CardContent) (({ theme }) => ({
    height: "130px",
    paddingBottom: 30,
    textAlign: "justify",
    [theme.breakpoints.down("xs")]: {
      height: 200
    }
})  
);

const StyledCards=styled("div")(({ theme }) => ({
  display: "flex",
  flexFlow: "row wrap", 
  padding: "3rem 0",
  [theme.breakpoints.up("sm")]: {
    padding: theme?.sectionPadding?.padding,
  }
}));

const StyledMasthead = styled("div")(({ theme }) => ({
  textAlign: "center",
  paddingTop: "50px",
  paddingBottom: "30px",
  paddingLeft: "50px",
  [theme.breakpoints.down("sm")]: {
    paddingLeft: "10px",
    paddingRight: "10px"
  },
}));

const StyledProgressDiv = styled("div")(({ theme }) => ({
  textAlign: "center",
  paddingTop: "150px",
  paddingBottom: "400px"
}));

const StyledTypography = styled(Typography)(({ theme }) => ({
  display: "-webkit-box",
  WebkitLineClamp: "3",
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
  color: theme.palette.text.secondary,
}) 
);

function Series() {
  const [allSeries, setAllSeries] = useState([]);

  useEffect(() => {
    getSeries();
  }, []);

  const getSeries = () => {
    db.getAllSeries().then(snapshot => {
      let series = [];
      Object.keys(snapshot.val()).forEach(serie => {
        if (snapshot.val()[serie].isInTopSeries) {
          let serieData = {
            name: snapshot.val()[serie].name,
            description: snapshot.val()[serie].description,
            shortDescription:
              snapshot.val()[serie].description,
            images_details:
              snapshot.val()[serie].images_details.length > 0 &&
              snapshot.val()[serie].images_details,
            cover: snapshot.val()[serie].cover,
            order: snapshot.val()[serie].order
          };
          series.push(serieData);
        }
      });
      series.sort((a, b) => a.order - b.order);
      setAllSeries(series);
    });
  };

  return allSeries && allSeries.length > 0 ? (
    <StyledMasthead>
      <Typography gutterBottom variant="h4" component="h2" color="secondary">
        Artwork series
      </Typography>
      <StyledCards>
        {allSeries.map((serie, i) => (
          <StyledCard key={i}>
            <CardActionArea
              component={Link}
              to={{
                pathname: "/seriespaintings",
                state: {
                  serie: serie
                }
              }}
            >
              <StyledCardMedia
                component="img"
                image={
                  serie.images_details.length > 0
                    ? serie.images_details[serie.cover].url
                    : noPicture
                }
                title={serie.name}
              />
              <StyledCardContent >
                <Typography gutterBottom variant="h5" component="h2">
                  {serie.name}
                </Typography>
                <StyledTypography variant="body2" component="p" color="textSecondary">
                  {serie.shortDescription}
                </StyledTypography>
              </StyledCardContent>
            </CardActionArea>
            <CardActions>
              <Button
                size="small"
                color="secondary"
                component={Link}
                to={{
                  pathname: "/seriespaintings",
                  state: {
                    serie: serie
                  }
                }}
              >
                View series
              </Button>
            </CardActions>
          </StyledCard>
        ))}
      </StyledCards>
    </StyledMasthead>
  ) : (
    <StyledProgressDiv>
      <CircularProgress color="secondary" />
    </StyledProgressDiv>
  );
}

export default Series;