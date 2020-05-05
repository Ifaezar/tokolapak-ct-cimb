import React from "react";
import { Route, Switch, withRouter } from "react-router-dom";

import "./App.css";
import "bootstrap/dist/css/bootstrap.css";

import Cookie from 'universal-cookie'
import { connect } from 'react-redux'
import Home from "./views/screens/Home/Home";
import Navbar from "./views/components/Navbar/Navbar";
import Authscreen from "./views/screens/auth/Authscreen"
import { userKeepLogin, cookieChecker } from "./redux/actions"
import ProductDetail from "./views/screens/ProductDetail/ProductDetail";
import AdminDashboard from './views/screens/admin/AdminDashboard'
import AdminMembers from './views/screens/admin/adminMembers'
import Wishlist from './views/screens/user/wishlist'
import Cart from './views/screens/cart/Cart'
import PageNotFound from './views/screens/pageNotFound/PageNotFound'
import AdminPayment from './views/screens/admin/adminPayments'
import History from './views/screens/user/history'
import AdminPageReport from './views/screens/admin/adminPageReport'


const cookieObject = new Cookie()

class App extends React.Component {
  componentDidMount() {
    let cookieResult = cookieObject.get("authData", { path: "/" })
    if (cookieResult) {
      this.props.userKeepLogin(cookieResult)
    } else {
      this.props.cookieChecker();
    }
  }

  renderAdminRoute = () => {
    if (this.props.user.role === "admin") {
      return <Route exact path="/admin/dashboard" component={AdminDashboard} />
    }else{
      return  <Route exact path="*" component={PageNotFound} />
    }
  }

  render() {
    if (this.props.user.cookieCheck) {
      return (
        <>
          <Navbar />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/auth" component={Authscreen} />
            <Route exact path="/product/:id" component={ProductDetail} />
            <Route exact path="/cart" component={Cart} />
            <Route exact path="/user/wishlist" component={Wishlist} />
            <Route exact path="/user/history" component={History} />
            {this.renderAdminRoute()}
            <Route exact path="/admin/member" component={AdminMembers} />
            <Route exact path="/admin/dashboard" component={AdminDashboard} />
            <Route exact path="/admin/payment" component={AdminPayment} />
            <Route exact path="/admin/pageReport" component={AdminPageReport} />
            <Route exact path="*" component={PageNotFound} />
          </Switch>
          <div style={{ height: "120px" }} />
        </>
      );
    }
    else {
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
export default connect(mapsStateToProps, mapsDispatchToProps)(withRouter(App));

/** 
*pr  TRANSACTIONS
 * userId
 * total belanja
 * status -> "pending"
 * tanggal belanja
 * tanggal selesai -> ""
 * 
 * TRANSACTION_DETAILS
 * transactionId
 * productId
 * price
 * quantity
 * totalPrice (price * quantity)
*
*/