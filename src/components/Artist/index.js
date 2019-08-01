import React from "react";
import MariteImages from "./MariteImages";
import AuthUserContext from "../Session/context";

const MariteImagesWithContext = props => (
  <AuthUserContext.Consumer>
    {authUser => <MariteImages {...props} authUser={authUser} />}
  </AuthUserContext.Consumer>
);

export default MariteImagesWithContext;
