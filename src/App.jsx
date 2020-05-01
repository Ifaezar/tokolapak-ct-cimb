import React from "react";
import { Route, Switch, withRouter } from "react-router-dom";

import "./App.css";
import "bootstrap/dist/css/bootstrap.css";

import Cookie from 'universal-cookie'
import { connect } from 'react-redux'
import Home from "./views/screens/Home/Home";
import Navbar from "./views/components/Navbar/Navbar";
import Authscreen from "./views/screens/auth/Authscreen"
import { userKeepLogin,cookieChecker } from "./redux/actions"
import ProductDetail from "./views/screens/ProductDetail/ProductDetail";
import AdminDashboard from './views/screens/admin/AdminDashboard'
import Cart from './views/screens/cart/Cart'


const cookieObject = new Cookie()

class App extends React.Component {
  componentDidMount() {
    let cookieResult = cookieObject.get("authData")
    if (cookieResult) {
      this.props.userKeepLogin(cookieResult)
    }else {
      this.props.cookieChecker();
    }
  }
  
  renderAdminRoute = () =>{
    if(this.props.user.role === "admin"){
     return <Route exact path="/dashboard" component={AdminDashboard} />
    }
  }

  render() {
    if(this.props.user.cookieCheck){
      return (
        <>
          <Navbar />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/auth" component={Authscreen} />
            <Route exact path="/product/:id" component={ProductDetail} />
            <Route exact path="/cart" component={Cart} />
           {this.renderAdminRoute()}
          </Switch>
          <div style={{ height: "120px" }} />
        </>
      );
    }
    else{
      return <div>Loading.....</div>
    }
  }
}
const mapsStateToProps = (state) => {
  return {
    user: state.user
  }
}
const mapsDispatchToProps = {
  userKeepLogin,
  cookieChecker
}
export default connect(mapsStateToProps,mapsDispatchToProps)(withRouter(App));
