import React from "react";
import { Route, Switch } from "react-router-dom";
import { MuiThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import theme from "./theme";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import Home from "./Home/Home";
import Biography from "./Biography/Biography";
import Exhibitions from "./Exhibitions/Exhibitions";
import Series from "./Series/Series";
import SeriesPaintings from "./Series/SeriesPaintings";
import SetSeries from "./SetSeries";
import SetBiography from "./SetBiography";
import MySeries from "./MySeries";
import Login from "./Login/Login";
import { withAuthentication } from "./Session";

const App = () => (
  <div className="App">
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <Header />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/biography" component={Biography} />
        <Route path="/exhibitions" component={Exhibitions} />
        <Route path="/series" component={Series} />
        <Route path="/seriespaintings" component={SeriesPaintings} />
        <Route path="/myseries" component={MySeries} />
        <Route path="/setseries" component={SetSeries} />
        <Route path="/setbiography" component={SetBiography} />
        <Route path="/login" component={Login} />
      </Switch>
      <Footer />
    </MuiThemeProvider>
  </div>
);

export default withAuthentication(App);
