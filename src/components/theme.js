import { createMuiTheme } from "@material-ui/core/styles";

export default createMuiTheme({
  palette: {
    primary: {
      light: "#ffffff",
      main: "#fafafa",
      dark: "#c7c7c7",
      contrastText: "#424242"
    },
    secondary: {
      light: "#6d6d6d",
      main: "#424242",
      dark: "#1b1b1b",
      contrastText: "#F5F5F5"
    }
  },
  typography: {
    fontSize: 16,
    useNextVariants: true,
    fontFamily: '"Montserrat"'
  },
  sectionPadding: {
    padding: "3rem 0"
  },
  smallSection: {
    padding: "3rem 1.5rem"
  },
  mediumSection: {
    padding: "6rem 1.5rem"
  },
  bigSection: {
    padding: "9rem 1.5rem"
  },
  largeSection: {
    padding: "18rem 1.5rem"
  }
});
