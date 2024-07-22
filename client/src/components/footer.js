import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  const footerStyle = {
    backgroundImage: 'url("https://images.pexels.com/photos/2156881/pexels-photo-2156881.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    color: 'white',
    padding: '20px'
  };

  const footerContainerStyle = {
    display: 'flex',
    justifyContent: 'space-between'
  };

  const footerBottomStyle = {
    textAlign: 'center',
    padding: '10px',
    background: 'rgba(0, 0, 0, 0.5)',
    color: 'white'
  };

  const linkStyle = {
    color: 'white',
    textDecoration: 'none'
  };

  const linkHoverStyle = {
    textDecoration: 'underline'
  };

  return (
    <footer className="footer" style={footerStyle}>
      <div className="footer-container" style={footerContainerStyle}>
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
            <li><a href="#" style={linkStyle}>Contact us</a></li>
            <li><a href="#" style={linkStyle}>FAQs</a></li>
            <li><a href="#" style={linkStyle}>Advertise</a></li>
          </ul>
        </div>
        <div className="footer-column">
          <h4>Follow us</h4>
          <ul className="social-links">
            <li><a href="#" style={linkStyle}><FontAwesomeIcon icon={faFacebook} /> Facebook</a></li>
            <li><a href="#" style={linkStyle}><FontAwesomeIcon icon={faTwitter} /> Twitter</a></li>
            <li><a href="#" style={linkStyle}><FontAwesomeIcon icon={faInstagram} /> Instagram</a></li>
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
      <div className="footer-bottom" style={footerBottomStyle}>
        <p>&copy; 2024 Tasty Tales Recipes. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
