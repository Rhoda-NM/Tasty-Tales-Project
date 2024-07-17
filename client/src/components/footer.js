import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';
import './footer.css';

const Footer = () => {
  return (
    <footer className="footer" style={{background: "#eeeeea"}}>
      <div className="footer-container">
        <div className="footer-column">
          <h4>About Us</h4>
          <ul>
            <li>Our team</li>
            <li>Privacy policy</li>
          </ul>
        </div>
        <div className="footer-column">
          <h4>Support</h4>
          <ul>
            <li><a href="#">Contact us</a></li>
            <li><a href="#">FAQs</a></li>
            <li><a href="#">Advertise</a></li>
          </ul>
        </div>
        <div className="footer-column">
          <h4>Follow us</h4>
          <ul className="social-links">
            <li><a href="#"><FontAwesomeIcon icon={faFacebook} /> Facebook</a></li>
            <li><a href="#"><FontAwesomeIcon icon={faTwitter} /> Twitter</a></li>
            <li><a href="#"><FontAwesomeIcon icon={faInstagram} /> Instagram</a></li>
          </ul>
        </div>
        <div className="footer-column">
          <h4>Subscribe</h4>
          <p>Get the latest recipes and tips delivered to your inbox.</p>
          <form className="subscribe-form">
            <input type="email" placeholder="Enter your email" />
            <button type="submit">Subscribe</button>
          </form>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024 Tasty Tales Recipes. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
