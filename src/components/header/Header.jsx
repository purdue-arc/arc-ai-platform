import React, { useState, useEffect, useRef } from "react";
import arcLogo from "../../assets/logo.png";
import "./Header.css";

function Header() {
  const [isCompact, setIsCompact] = useState(false); // State to track compact mode
  const headerRef = useRef(null); // Reference to the header element

  useEffect(() => {
    // Function to adjust the spacer's height only once
    const setInitialSpacerHeight = () => {
      const headerHeight = headerRef.current.offsetHeight + "px"; // Get the initial header height
      document.documentElement.style.setProperty(
        "--header-height",
        headerHeight,
      );
    };

    // Set the spacer height on initial render
    setInitialSpacerHeight();

    // Adjust spacer height on resize
    window.addEventListener("resize", setInitialSpacerHeight);

    // Scroll listener to toggle compact header class
    const handleScroll = () => {
      setIsCompact(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("resize", setInitialSpacerHeight);
      window.removeEventListener("scroll", handleScroll);
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
        <a href="/" className="header-logo-link">
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
