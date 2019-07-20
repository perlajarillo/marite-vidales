import React from "react";
import { Route, Switch } from "react-router-dom";
import { MuiThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import theme from "./theme";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import Home from "./Home/Home";
import Biography from "./Biography/Biography";
import Series from "./Series/Series";
import SeriesPaintings from "./Series/SeriesPaintings";
import NewSeries from "./Artist/NewSeries";

const App = () => (
  <div className="App">
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <Header />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/biography" component={Biography} />
        <Route exact path="/series" component={Series} />
        <Route exact path="/seriespaintings" component={SeriesPaintings} />
        <Route exact path="/newseries" component={NewSeries} />
      </Switch>
      <Footer />
    </MuiThemeProvider>
  </div>
);

export default App;
