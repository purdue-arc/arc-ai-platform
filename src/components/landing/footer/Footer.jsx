import "./Footer.css";
function Footer() {
  return (
    <div className="landing-footer">
      <div className="footer-content">
        <div className="social-media">
          <div className="footer-subtitle">Connect With Us</div>
          <a href="https://twitter.com">
            <i className="fa fa-twitter"></i> Twitter
          </a>
          <a href="https://linkedinr.com">
            <i className="fa fa-linkedin"></i> LinkedIn
          </a>
          <a href="https://facebook.com">
            <i className="fa fa-facebook"></i> Facebook
          </a>
        </div>
        <div className="contact-info">
          <div className="footer-subtitle">Contact Us</div>
          <p>
            <a href="mailto:info@purduearc.com">info@purduearc.com</a>
            <br />
            (765) 494-6543
            <br />
            123 West Lafayette Street, West Lafayette, IN 47907
          </p>
        </div>
        <div className="resources">
          <div className="footer-subtitle">Resources</div>
          <a href="/publications">Research Publications</a>
          <a href="/case-studies">Case Studies</a>
          <a href="/blog">Blog</a>
        </div>
        <div className="newsletter">
          <div className="footer-subtitle">Stay Informed</div>
          <form>
            <input type="email" placeholder="Your email address" />
            <button type="submit">Subscribe</button>
          </form>
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
