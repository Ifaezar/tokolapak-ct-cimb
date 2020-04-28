import React from "react";
import { Route, Switch, withRouter } from "react-router-dom";

import "./App.css";
import "bootstrap/dist/css/bootstrap.css";

import Cookie from 'universal-cookie'
import { connect } from 'react-redux'
import Home from "./views/screens/Home/Home";
import Navbar from "./views/components/Navbar/Navbar";
import Authscreen from "./views/screens/auth/Authscreen"
import { userKeepLogin } from "./redux/actions"

const cookieObject = new Cookie()

class App extends React.Component {
  componentDidMount() {
    let cookieResult = cookieObject.get("authData")
    if (cookieResult) {
      this.props.userKeepLogin(cookieResult)
    }
  }
  render() {
    return (
      <>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/auth" component={Authscreen} />
        </Switch>
        <div style={{ height: "120px" }} />
      </>
    );
  }
}
const mapsStateToProps = (state) => {
  return {
    user: state.user
  }
}
const mapsDispatchToProps = {
  userKeepLogin
}
export default connect(mapsStateToProps,mapsDispatchToProps)(withRouter(App));
