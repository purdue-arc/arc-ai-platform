function Footer() {
  return (
    <footer className="landing-footer">
      <div className="footer-content">
        <div className="social-media">
          <h2>Connect with Us</h2>
          <ul>
            <li>
              <a href="#">
                <i className="fa fa-twitter"></i> Twitter
              </a>
            </li>
            <li>
              <a href="#">
                <i className="fa fa-linkedin"></i> LinkedIn
              </a>
            </li>
            <li>
              <a href="#">
                <i className="fa fa-facebook"></i> Facebook
              </a>
            </li>
          </ul>
        </div>
        <div class="contact-info">
          <h2>Contact Us</h2>
          <p>
            <a href="mailto:info@purduearc.com">info@purduearc.com</a>
            <br />
            (765) 494-6543
            <br />
            123 West Lafayette Street, West Lafayette, IN 47907
          </p>
        </div>
        <div class="resources">
          <h2>Resources</h2>
          <ul>
            <li>
              <a href="/publications">Research Publications</a>
            </li>
            <li>
              <a href="/case-studies">Case Studies</a>
            </li>
            <li>
              <a href="/blog">Blog</a>
            </li>
          </ul>
        </div>
        <div class="newsletter">
          <h2>Stay Informed</h2>
          <form>
            <input type="email" placeholder="Your email address" />
            <button type="submit">Subscribe</button>
          </form>
        </div>
      </div>
      <p className="copyright">&copy; 2024 Purdue ARC. All rights reserved.</p>
      <ul class="legal">
        <li>
          <a href="/privacy">Privacy Policy</a>
        </li>
        <li>
          <a href="/terms">Terms of Service</a>
        </li>
      </ul>
    </footer>
  );
}
export default Footer;
