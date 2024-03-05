import React, { useContext, useEffect, useState, useRef } from "react";
import arcLogo from "../../assets/logo.png";
import "./Header.css";
import { useScrollContext } from "../../ScrollContext.jsx";

function Header() {
  const {
    scrollState: { isCompact },
  } = useScrollContext();
  const headerRef = useRef(null);

  useEffect(() => {
    const setInitialSpacerHeight = () => {
      if (headerRef.current) {
        const headerHeight = headerRef.current.offsetHeight + "px";
        document.documentElement.style.setProperty(
          "--header-height",
          headerHeight,
        );
      }
    };

    setInitialSpacerHeight();
    window.addEventListener("resize", setInitialSpacerHeight);

    return () => {
      window.removeEventListener("resize", setInitialSpacerHeight);
    };
  }, []);

  return (
    <>
      <div
        className="header-spacer"
        style={{ height: "var(--header-height)" }}
      ></div>
      <header
        className={`landing-header ${isCompact ? "compact" : ""}`}
        ref={headerRef}
      >
        <a
          href="/"
          className={`header-logo-link ${isCompact ? "compact-logo-link" : ""}`}
        >
          <img
            src={arcLogo}
            alt="Logo"
            className={`header-logo ${isCompact ? "compact-logo" : ""}`}
          />
        </a>
        <nav className="landing-nav">
          <li className="nav-link">
            <a href="/code-assistant">CODE ASSISTANT</a>
          </li>
          <li className="nav-link">
            <a href="/arc-wiki">ARC WIKI</a>
          </li>
        </nav>
      </header>
    </>
  );
}

export default Header;
