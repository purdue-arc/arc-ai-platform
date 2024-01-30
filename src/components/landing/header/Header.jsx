import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="landing-header">
      <nav className="landing-nav">
        <ul>
          <a href="/" className="header-logo-link">
            <img
              src="../../.././assets/react.svg"
              alt="Logo"
              className="header-logo"
            />
          </a>
          <li className="nav-link">
            <a href="/about">ABOUT</a>
          </li>
          <li className="nav-link">
            <a href="/registration">REGISTRATION</a>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
