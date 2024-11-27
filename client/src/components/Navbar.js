import React, { useContext } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { NavLink } from "react-router-dom";
import logo from "../images/LogoT.png";
import './Navbar.css';
import { UserContext } from '../App';

const Navbar = () => {
  const { state } = useContext(UserContext);

  const RenderMenu = () => (
    <>
      <li className="nav-item">
        <NavLink className="nav-link" to="/" activeclassname="active">Home</NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" to="/about" activeclassname="active">About</NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" to="/contact" activeclassname="active">Contact Us</NavLink>
      </li>
      {!state ? (
        <>
          <li className="nav-item">
            <NavLink className="nav-link" to="/login" activeclassname="active">Login</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/signup" activeclassname="active">Registration</NavLink>
          </li>
        </>
      ) : (
        <>
          <li className="nav-item">
            <NavLink className="nav-link" to="/logout" activeclassname="active">Logout</NavLink>
          </li>
        </>
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
            height: "47px",
            marginRight: "2px",
          }}
        />
        <span>Mech AI</span>
      </NavLink>
      
      {/* Add Profile link here */}
      {state && (
        <NavLink className="navbar-brand" to="/profile">
          Profile
        </NavLink>
      )}
      
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
