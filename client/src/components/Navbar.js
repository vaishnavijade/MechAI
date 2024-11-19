
import React, { useContext } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { NavLink } from "react-router-dom";
import logo from "../images/bwlogo.png";
import './Navbar.css';
import { UserContext } from '../App';

const Navbar = () => {
  const { state } = useContext(UserContext);

  const RenderMenu = () => (
    <>
      <li className="nav-item">
        <NavLink className="nav-link" to="/">Home</NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" to="/about">About Us</NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" to="/contact">Contact</NavLink>
      </li>
      {!state ? (
        <>
          <li className="nav-item">
            <NavLink className="nav-link" to="/login">Login</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/signup">Registration</NavLink>
          </li>
        </>
      ) : (
        <li className="nav-item">
          <NavLink className="nav-link" to="/logout">Logout</NavLink>
        </li>
      )}
    </>
  );

  return (
    <nav className="navbar navbar-expand-lg navbar-dark">
      <NavLink className="navbar-brand" to="/">
        <img
          src={logo}
          alt="Logo"
          style={{
            width: "75px",
            height: "75px",
            marginRight: "2px",
          }}
        />
        <span>Mech AI</span>
      </NavLink>
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav ms-auto">
          <RenderMenu />
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
