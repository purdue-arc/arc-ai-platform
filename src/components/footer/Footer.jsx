import React, { useEffect, useState } from 'react';
import "./Footer.css";

function Footer() {
  // State to store subtitle padding
  const [subtitlePadding, setSubtitlePadding] = useState({});

  // Effect to calculate and set subtitle padding on mount
  useEffect(() => {
    // Get all footer subtitles
    const footerSubtitles = document.querySelectorAll('.footer-subtitle');
    // Calculate and set padding for each subtitle
    footerSubtitles.forEach(subtitle => {
      const textLength = subtitle.textContent.length;
      const padding = `${textLength * 1}px`; // Adjust padding as needed
      setSubtitlePadding(prevState => ({
        ...prevState,
        [subtitle.textContent]: padding // Store padding based on subtitle text content
      }));
    });
  }, []); // Run effect only once on mount

  return (
    <div className="landing-footer">
      <div className="footer-content">
        <div className="footer-section">
          <div className="footer-subtitle" style={{padding: subtitlePadding['Connect With Us']}}>Connect With Us</div>
          <div className="social-media">
            <a href="https://twitter.com" rel="noopener noreferrer">
              <i className="fa fa-twitter"></i> Twitter
            </a>
            <a href="https://linkedinr.com" rel="noopener noreferrer">
              <i className="fa fa-linkedin"></i> LinkedIn
            </a>
            <a href="https://facebook.com" rel="noopener noreferrer">
              <i className="fa fa-facebook"></i> Facebook
            </a>
          </div>
        </div>
        <div className="footer-section">
          <div className="footer-subtitle" style={{padding: subtitlePadding['Contact Us']}}>Contact Us</div>
          <p>
            <a href="mailto:info@purduearc.com">info@purduearc.com</a>
            <br />
            (765) 494-6543
            <br />
            123 West Lafayette Street, West Lafayette, IN 47907
          </p>
        </div>
        <div className="footer-section">
          <div className="footer-subtitle" style={{padding: subtitlePadding['Resources']}}>Resources</div>
          <div className="resources">
            <a href="/publications">Research Publications</a>
            <a href="/case-studies">Case Studies</a>
            <a href="/blog">Blog</a>
          </div>
        </div>
        <div className="footer-section">
          <div className="footer-subtitle" style={{padding: subtitlePadding['Stay Informed']}}>Stay Informed</div>
          <div className="newsletter">
            <form>
              <input type="email" placeholder="Your email address" />
              <button type="submit">Subscribe</button>
            </form>
          </div>
        </div>
      </div>
      <p className="copyright">&copy; 2024 Purdue ARC. All rights reserved.</p>
      <ul className="legal">
        <li>
          <a href="/privacy">Privacy Policy</a>
        </li>
        <li>
          <a href="/terms">Terms of Service</a>
        </li>
      </ul>
    </div>
  );
}

export default Footer;
