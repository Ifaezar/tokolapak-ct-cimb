import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons/";
import { connect } from 'react-redux'
import { faUser } from "@fortawesome/free-regular-svg-icons";
import Cookie from 'universal-cookie'
import "./Navbar.css";
import {
  Dropdown,
  DropdownItem,
  DropdownToggle,
  DropdownMenu,
} from "reactstrap";

import { Link } from "react-router-dom";
import ButtonUI from "../Button/Button.tsx";
import { logOutHandler,searchProduct } from "../../../redux/actions"

const cookieObject = new Cookie();

const CircleBg = ({ children }) => {
  return <div className="circle-bg">{children}</div>;
};

class Navbar extends React.Component {
  state = {
    searchBarIsFocused: false,
    searcBarInput: "",
    dropdownOpen: false,
  };

  logOut = () => {
    cookieObject.remove("authData")
    this.props.logOutHandler()
  }

  onFocus = () => {
    this.setState({ searchBarIsFocused: true });
  };

  onBlur = () => {
    this.setState({ searchBarIsFocused: false });
  };

  toggleDropdown = () => {
    this.setState({ dropdownOpen: !this.state.dropdownOpen });
  };
  
  render() {
    return (
      <div className="d-flex flex-row justify-content-between align-items-center py-4 navbar-container">
        <div className="logo-text">
          <Link style={{ textDecoration: "none", color: "inherit" }} to="/">
            LOGO
          </Link>
        </div>
        <div style={{ flex: 1 }} className="px-5">
          <input
            onFocus={this.onFocus}
            onBlur={this.onBlur}
            onChange={(e)=>{this.props.onsearchProduct(e.target.value)}}
            className={`search-bar ${
              this.state.searchBarIsFocused ? "active" : null
              }`}
            type="text"
            placeholder="Cari produk impianmu disini"
          />
        </div>
        <div className="d-flex flex-row align-items-center">
          {
            this.props.user.id ? (
              <>
               <Dropdown
                toggle={this.toggleDropdown}
                isOpen={this.state.dropdownOpen}
              >
                <DropdownToggle tag="div" className="d-flex">
                  <FontAwesomeIcon icon={faUser} style={{ fontSize: 24 }} />
                  <p className="small ml-3 mr-4">{this.props.user.username}</p>
                </DropdownToggle>
                <DropdownMenu className="mt-2">
                  <DropdownItem>
                    <Link
                      style={{ color: "inherit", textDecoration: "none" }}
                      to="/dashboard"
                    >
                      Dashboard
                    </Link>
                  </DropdownItem>
                  <DropdownItem>Members</DropdownItem>
                  <DropdownItem>Payments</DropdownItem>
                </DropdownMenu>
              </Dropdown>
              <Link
                className="d-flex flex-row"
                to="/cart"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                  <FontAwesomeIcon
                    className="mr-2"
                    icon={faShoppingCart}
                    style={{ fontSize: 24 }}
                  />
                  <CircleBg>
                    <small style={{ color: "#3C64B1", fontWeight: "bold" }}>4</small>
                  </CircleBg>
                </Link>
                <Link style={{ textDecoration: "none", color: "inherit" }}
                  to="/auth">
                  <ButtonUI
                    type="contained"
                    onClick={this.logOut}>
                    Log Out
                </ButtonUI>
                </Link>
              </>
            ) :
              <>
                <ButtonUI className="mr-3" type="textual">
                  <Link to="/auth">
                    Sign in
            </Link>
                </ButtonUI>
                <ButtonUI type="contained">
                  <Link
                    style={{ textDecoration: "none", color: "white" }}
                    to="/auth"
                  >
                    Sign up
            </Link></ButtonUI>

              </>
          }


        </div>
      </div>
    );
  }
}

const mapsStateToProps = (state) => {
  return {
    user: state.user
  }
}
const mapsDispatchToProps = {
  logOutHandler,
  onsearchProduct: searchProduct
}

export default connect(mapsStateToProps, mapsDispatchToProps)(Navbar);
