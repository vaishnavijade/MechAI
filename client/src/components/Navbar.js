import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import { NavLink } from "react-router-dom";
import logo from "../images/logo.png";
import './Navbar.css';
const Navbar = () => {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <NavLink className="navbar-brand d-flex align-items-center" to="#">
          <img
            src={logo}
            alt="Logo"
            style={{
              width: "70px",
              height: "60px",
              marginLeft: "0.5mm",
              marginRight: "10px",
            }}
          />
          <span>Mechanic Ai</span> {/* Text beside the logo */}
        </NavLink>

        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item active">
              <NavLink className="nav-link" to="/">
                Home <span className="sr-only"></span>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/about">
                About
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink className="nav-link" to="/contact">
                Contact
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/login">
                Login
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/signup">
                Registration
              </NavLink>    
            </li>
          </ul>
          
        </div>
      </nav>
    </>
  );
};

export default Navbar;
