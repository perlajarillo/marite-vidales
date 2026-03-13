import React, { useContext } from "react";
import { styled } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import AuthUserContext from "../Session/context";
import { auth } from "../../firebase";
import { Author } from "../../constants";

const Root = styled("div")({
  flexGrow: 1,
  display: "flex",
  color: "#424242",
  backgroundColor: "#fafafa",
});

const StyledLink = styled(Link)({
  textDecoration: "none",
  color: "#424242",
  fontSize: "1.7rem",
});

const StyledLinkAuth = styled(Link)({
  textDecoration: "none",
  color: "#fafafa",
  fontSize: "1.7rem",
});

const BrandTypography = styled(Typography)(({ theme }) => ({
  paddingTop: "1rem",
  flex: 1,
  [theme.breakpoints.down("xs")]: {
    fontSize: "1.1rem",
  },
}));

const NavButton = styled(Button)(({ theme }) => ({
  letterSpacing: "1px",
  fontWeight: "500",
  fontSize: "1rem",
  marginLeft: 50,
  [theme.breakpoints.down("xs")]: {
    marginLeft: 5,
  },
}));

const LinkContainer = styled("div")({
  width: "100%",
  textAlign: "center",
});

const NavNoAuth = () => (
  <Root>
    <AppBar position="static" color="transparent">
      <BrandTypography variant="h5" align="center">
        <StyledLink to="/">{Author}</StyledLink>
      </BrandTypography>
      <Toolbar>
        <LinkContainer>
          <NavButton color="inherit" component={Link} to="/series">
            Artwork
          </NavButton>
          <NavButton color="inherit" component={Link} to="/exhibitions">
            Exhibits
          </NavButton>
          <NavButton color="inherit" component={Link} to="/biography">
            Biography
          </NavButton>
          <NavButton color="inherit" component={Link} to="/reviews">
            Reviews
          </NavButton>
          <NavButton color="inherit" component={Link} to="/contact">
            Contact
          </NavButton>
        </LinkContainer>
      </Toolbar>
    </AppBar>
  </Root>
);

const NavAuth = () => (
  <Root>
    <AppBar position="static">
      <Toolbar>
        <BrandTypography variant="h5">
          <StyledLinkAuth to="/" >
            {Author}
          </StyledLinkAuth>
        </BrandTypography>
        <div>
          <NavButton color="inherit" component={Link} to="/myseries">
            My Series
          </NavButton>
          <NavButton color="inherit" component={Link} to="/setbiography">
            Biography
          </NavButton>
          <NavButton color="inherit" component={Link} to="/setexhibitions">
            Exhibits
          </NavButton>

          <NavButton
            color="inherit"
            component={Link}
            onClick={auth.onLogOut}
            to="/"
          >
            Log out
          </NavButton>
        </div>
      </Toolbar>
    </AppBar>
  </Root>
);

const Header = () => {
  const authUser = useContext(AuthUserContext);

  return authUser ? <NavAuth /> : <NavNoAuth />;
};

export default Header;
