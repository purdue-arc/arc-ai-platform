import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="landing-header">
      <Link to="/">
        <div>link</div>
      </Link>
      <nav className="landing-header-nav">
        <Link to="/about">About</Link>
        <Link to="/features">Features</Link>
        <Link to="/contact">Contact</Link>
      </nav>
    </header>
  );
}

export default Header;
