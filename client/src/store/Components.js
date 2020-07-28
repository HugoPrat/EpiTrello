import React from "react";
import logo from '../logo.svg';
import { Link } from 'react-router-dom';
import { logOut } from "../store/AccountActions"
import Cookies from "universal-cookie"

import '../css/Component.css'

export default class AppBar extends React.Component {

  LoginOut = () => {
    logOut();
    const cookies = new Cookies();
    cookies.remove('uid', { path: '/' });
  }

  render() {
    let data, {location} = this.props

    if (location.pathname !== "/" && location.pathname !== "/sign-in" && location.pathname !== "/sign-up") {
      data = 
        <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link className="nav-link" onClick={this.LoginOut.bind(this)} to={"/"}>Log-Out</Link>
            </li>
          </ul>
        </div>
    } else {
      data =
        <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
          <ul className="navbar-nav ml-auto">
          <li className="nav-item">
              <Link className="nav-link" to={"/sign-in"}>Login</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to={"/sign-up"}>Sign up</Link>
            </li>
          </ul>
        </div>
    }
    return (
    <nav className="navbar navbar-expand-lg navbar-light fixed-top">
      <div className="container">
        <img src={logo} className="App-logo" alt="logo" />
        <Link className="navbar-brand" to={"/sign-in"}>EpiTrello</Link>
            {data}
      </div>
    </nav>
    )}
}