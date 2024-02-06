import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";

function Header() {
  return (
    <header className="landing-header">
      <a href="/" className="header-logo-link">
        <img
          src="../../.././assets/react.svg"
          alt="Logo"
          className="header-logo"
        />
      </a>
      <nav className="landing-nav">
        <li className="nav-link">
          <a href="/code-assistant">CODE ASSISTANT</a>
        </li>
        <li className="nav-link">
          <a href="/registration">REGISTRATION</a>
        </li>
        <li className="nav-link">
          <a href="/arc-wiki">ARC Wiki</a>
        </li>
      </nav>
    </header>
  );
}

export default Header;
