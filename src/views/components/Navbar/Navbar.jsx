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
import { logOutHandler, searchProduct } from "../../../redux/actions"
import Axios from "axios";
import { API_URL } from "../../../redux/API";

const cookieObject = new Cookie();

const CircleBg = ({ children }) => {
  return <div className="circle-bg">{children}</div>;
};

class Navbar extends React.Component {
  state = {
    searchBarIsFocused: false,
    searcBarInput: "",
    dropdownOpen: false,
    keranjang: 0
  };

  logOut = () => {
    cookieObject.remove("authData")
    this.props.logOutHandler()
  }

  componentDidMount() {
    this.keranjangHandler()
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

  keranjangHandler = () => {
    Axios.get(`${API_URL}/cart`, {
      params: {
        userId: this.props.user.id
      }
    })
      .then(res => {
        this.setState({ keranjang: res.data.length })
        // this.keranjangHandler()
      })
      .catch(err => {
        console.log(err)
      })
  }

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
            onChange={(e) => { this.props.onsearchProduct(e.target.value) }}
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
                  {
                    this.props.user.role == "admin" ? (
                      <DropdownMenu className="mt-2">
                        <DropdownItem>
                          <Link
                            style={{ color: "inherit", textDecoration: "none" }}
                            to="/admin/dashboard"
                          >
                            Dashboard
                    </Link>
                        </DropdownItem>
                        <DropdownItem><Link
                          style={{ color: "inherit", textDecoration: "none" }}
                          to="/admin/member"
                        >
                          Members
                    </Link>
                        </DropdownItem>
                        <DropdownItem>
                          <Link
                            style={{ color: "inherit", textDecoration: "none" }}
                            to="/admin/payment"
                          >
                            Payments
                          </Link>
                        </DropdownItem>
                        <DropdownItem>
                          <Link
                            style={{ color: "inherit", textDecoration: "none" }}
                            to="/admin/pageReport"
                          >
                            Page Report
                          </Link>
                        </DropdownItem>
                      </DropdownMenu>
                    ) : <DropdownMenu className="mt-2">

                        <DropdownItem>
                          <Link
                            style={{ color: "inherit", textDecoration: "none" }}
                            to="/user/wishlist"
                          >
                            Wishlist
                    </Link>
                        </DropdownItem>
                        <DropdownItem>
                        <Link
                            style={{ color: "inherit", textDecoration: "none" }}
                            to="/user/history"
                          >
                            History
                    </Link>
                        </DropdownItem>

                      </DropdownMenu>
                  }
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
                    <small style={{ color: "#3C64B1", fontWeight: "bold" }}>{this.state.keranjang}</small>
                  </CircleBg>
                </Link>

                <ButtonUI
                  type="contained"
                  onClick={this.logOut}>
                  <Link style={{ textDecoration: "none", color: "inherit" }}
                    to="/"></Link>
                  Log Out
                </ButtonUI>

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
