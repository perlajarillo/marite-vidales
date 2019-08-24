import React from "react";
import SetSeries from "./SetSeries";
import AuthUserContext from "../Session/context";

const SetSeriesWithContext = props => (
  <AuthUserContext.Consumer>
    {authUser => <SetSeries {...props} authUser={authUser} />}
  </AuthUserContext.Consumer>
);

export default SetSeriesWithContext;
