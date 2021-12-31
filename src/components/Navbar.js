import React from "react";
import { Link } from "react-router-dom";
import "../styles/Fonts.css";

const Navbar = (props) => {
  let menu;

  if (!props.state) {
    menu = (
      <div class="navbar-nav ms-auto">
        <Link class="nav-item nav-link mx-3" to="/">
          Home
        </Link>
        <Link to="/services" class="nav-item nav-link mx-3">
          Services
        </Link>
        <Link to="/log-in" class="nav-item nav-link mx-3">
          Log In
        </Link>
        <Link to="/sign-up" class="nav-item nav-link mx-3">
          Sign Up
        </Link>
      </div>
    );
  } else if (props.role === "admin") {
    menu = (
      <div class="navbar-nav ms-auto">
        <Link
          class="nav-item nav-link active mx-3"
          to={`/unilib/user/${props.name}`}
        >
          Admin
        </Link>
        <Link to="/unilib/admin/library" class="nav-item nav-link mx-3">
          Library
        </Link>
        <Link to="/logout" class="nav-item nav-link mx-3">
          Log out
        </Link>
      </div>
    );
  } else {
    menu = (
      <div class="navbar-nav ms-auto">
        {/* wrong link for profile */}
        <Link class="nav-item nav-link mx-3" to={`/unilib/user/${props.name}`}>
          Profile
        </Link>
        <Link to="/forum" class="nav-item nav-link mx-3">
          Forum
        </Link>
        <Link to="/unilib/library" class="nav-item nav-link mx-3">
          Library
        </Link>
        <Link to="/logout" class="nav-item nav-link mx-3">
          Log out
        </Link>
      </div>
    );
  }

  return (
    <nav class="navbar navbar-expand-lg fixed-top navbar-dark bg-success">
      <div class="container-fluid">
        <div class="navbar-brand">
          {/* unilib redirection cancelled */}
          <div>
            UNILIB <i className="fab fa-typo3" />
          </div>
        </div>
        <button
          type="button"
          class="navbar-toggler"
          data-bs-toggle="collapse"
          data-bs-target="#navbarCollapse2"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarCollapse2">
          {menu}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
