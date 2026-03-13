import React from "react";
import { styled } from "@mui/material/styles";
import { Paper, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import mail from "../../images/icon_mail.svg";
import facebook from "../../images/icon_facebook.svg";
import instagram from "../../images/icon_instagram.svg";


const StyledTypography = styled(Typography) ({
  variant: "caption",
  fontSize: "0.85rem",
  color: "#424242"
});

const StyledFooter = styled("footer") ({
  position: "fixed",
  width: "100%",
  bottom: 0,
  backgroundColor: "#fafafa",
  boxShadow:
      "0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)"
});

const StyledPaper = styled(Paper) (({ theme }) => ({
  padding: theme.spacing(2, 1),
  backgroundColor: "transparent",
  textAlign: "center",
  borderRadius: 0
}));

const StyledArtistContainer = styled("div")(({ theme }) => ({
    marginLeft: theme.spacing(6),
    marginTop: theme.spacing(1),
    textAlign: "Left"
}));

const StyledIconsContainer = styled("div")(({ theme }) => ({
  marginRight: theme.spacing(6),
  textAlign: "right"
}));

const StyledIcons = styled("img")(({ theme }) => ({
  marginRight: theme.spacing(5),
  width: "1.5em"
}));


const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <StyledFooter>
        <StyledPaper>
          <Grid container>
            <Grid item xs={12} sm={6} md={6} lg={6}>
              <StyledArtistContainer>
                <StyledTypography>
                  Copyright &copy; {year} Paintings of Marité Vidales, {"  "}
                  Washington, D.C.
                </StyledTypography>
              </StyledArtistContainer>
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={6}>
              <StyledIconsContainer>
                <a
                  href={"mailto:paulzye@aol.com"}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {" "}
                  <StyledIcons src={mail}
                    alt="send me an email">
                  </StyledIcons>
                </a>
                <a
                  href="https://www.facebook.com/marite.vidales"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <StyledIcons
                    src={facebook}
                    alt="visit my facebook page"
                  />
                </a>
                <a
                  href="https://www.instagram.com/vidalesmarite/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <StyledIcons
                    src={instagram}
                    alt="follow me in instagram"
                  />
                  
                </a>
              </StyledIconsContainer>
            </Grid>
          </Grid>
        </StyledPaper>
      </StyledFooter>
    );
  }


export default Footer;
