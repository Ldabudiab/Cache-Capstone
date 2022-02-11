import React from "react";
import { Link } from "react-router-dom";
import "./Styling/nav.css"
import { logout } from "../modules/authManager";
import logo from "../pics/logo.png"

const Header = () => {
  return (
    <nav className="navbar-styling navbar-expand ">
      <Link to="/" className="navbar-logo">
      <img src={logo} alt="cache-logo" className="app-logo" />
      </Link>
      <ul className="navbar-nav mr-auto">
        <li className="nav-items">
          <Link to="/" className="nav-link">
            Feed
          </Link>
        </li>
        <li className="nav-items">
          <Link to="/videoform" className="nav-link">
            New Video
          </Link>
        </li>
        <li className="nav-items">
          <Link to="/taglist" className="nav-link">
            Tags
          </Link>
        </li>
        
      </ul>
      <button className="logout" onClick={logout}>Logout</button>
    </nav>
  );
};

export default Header;