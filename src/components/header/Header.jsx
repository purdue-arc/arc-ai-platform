import React, { useContext, useEffect, useState, useRef } from "react";
import ScrollContext from "../../ScrollContext.js";
import arcLogo from "../../assets/logo.png";
import "./Header.css";

function Header() {
  const { scrollY } = useContext(ScrollContext);
  const [isCompact, setIsCompact] = useState(false);
  const headerRef = useRef(null);

  useEffect(() => {
    // Adjust the spacer's height based on the header's height
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

    // Cleanup
    return () => {
      window.removeEventListener("resize", setInitialSpacerHeight);
    };
  }, []);

  useEffect(() => {
    // Use the scrollY value from context to toggle compact mode
    setIsCompact(scrollY > 100);
  }, [scrollY]);

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
