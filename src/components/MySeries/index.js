import React from "react";
import MySeries from "./MySeries";
import AuthUserContext from "../Session/context";

const MySeriesWithContext = props => (
  <AuthUserContext.Consumer>
    {authUser => <MySeries {...props} authUser={authUser} />}
  </AuthUserContext.Consumer>
);

export default MySeriesWithContext;
