import React from "react";
import SetBiography from "./SetBiography";
import AuthUserContext from "../Session/context";

const SetSetBiographyWithContext = props => (
  <AuthUserContext.Consumer>
    {authUser => <SetBiography {...props} authUser={authUser} />}
  </AuthUserContext.Consumer>
);

export default SetSetBiographyWithContext;
