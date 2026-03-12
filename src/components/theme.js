import { createTheme } from "@mui/material/styles";

//TODO: update theme. After updating material ui to v5, the colors seem odd. We should also consider using a custom color palette instead of the default one. The typography also needs to be updated, as the font size is too small and the font family is not consistent with the design. We should also consider adding more spacing between elements, as the current spacing is too tight. Finally, we should consider adding more breakpoints for responsive design, as the current breakpoints are not sufficient for all screen sizes.
export default createTheme({
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
    fontFamily: '"Open Sans", sans-serif',
    fontStyle: "normal"
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
