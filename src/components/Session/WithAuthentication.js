import React from "react";
import { firebase } from "../../firebase";
import AuthUserContext from "./context";

const withAuthentication = Component => {
  class WithAuthentication extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        authUser: null
      };
    }

    componentDidMount() {
      this.unregisterObserver = firebase.auth.onAuthStateChanged(authUser => {
        authUser
          ? this.setState({
              authUser: authUser
            })
          : this.setState({ authUser: null });
      });
    }
    componentWillUnmount() {
      this.unregisterObserver = null;
    }
    render() {
      const { authUser } = this.state;
      return (
        <AuthUserContext.Provider value={authUser}>
          <Component />
        </AuthUserContext.Provider>
      );
    }
  }
  return WithAuthentication;
};

export default withAuthentication;
