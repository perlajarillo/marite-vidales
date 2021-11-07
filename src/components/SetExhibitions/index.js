import React from "react";
import SetExhibitions from "./SetExhibitions";
import AuthUserContext from "../Session/context";

const SetSetExhibitionsWithContext = props => (
  <AuthUserContext.Consumer>
    {authUser => <SetExhibitions {...props} authUser={authUser} />}
  </AuthUserContext.Consumer>
);

export default SetSetExhibitionsWithContext;