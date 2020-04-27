import React from "react";
import { Route, Switch, withRouter } from "react-router-dom";

import "./App.css";
import "bootstrap/dist/css/bootstrap.css";

import Home from "./views/screens/Home/Home";
import Navbar from "./views/components/Navbar/Navbar";
import Authscreen from "./views/screens/auth/Authscreen"


  class App extends React.Component {
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

export default withRouter(App);
