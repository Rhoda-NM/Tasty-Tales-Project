import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';

const footerStyle = {
  backgroundImage: `url('https://images.pexels.com/photos/22941058/pexels-photo-22941058/free-photo-of-cherry-blossom-up-close.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  color: 'blue', // Text color set to blue
};

const Footer = () => {
  return (
    <footer style={footerStyle} className="py-5">
      <div className="container">
        <div className="row">
          <div className="col-md-3">
            <h4>About Us</h4>
            <ul className="list-unstyled">
              <li>Our team</li>
              <li>Privacy policy</li>
            </ul>
          </div>
          <div className="col-md-3">
            <h4>Support</h4>
            <ul className="list-unstyled">
              <li><a href="#">Contact us</a></li>
              <li><a href="#">FAQs</a></li>
              <li><a href="#">Advertise</a></li>
            </ul>
          </div>
          <div className="col-md-3">
            <h4>Follow us</h4>
            <ul className="list-unstyled">
              <li><a href="#"><FontAwesomeIcon icon={faFacebook} /> Facebook</a></li>
              <li><a href="#"><FontAwesomeIcon icon={faTwitter} /> Twitter</a></li>
              <li><a href="#"><FontAwesomeIcon icon={faInstagram} /> Instagram</a></li>
            </ul>
          </div>
          <div className="col-md-3">
            <h4>Subscribe</h4>
            <p>Get the latest recipes and tips delivered to your inbox.</p>
            <form className="row g-2 align-items-center">
              <div className="col-auto">
                <input type="email" className="form-control" id="email" placeholder="Enter your email" />
              </div>
              <div className="col-auto">
                <button type="submit" className="btn btn-warning">Subscribe</button>
              </div>
            </form>
          </div>
        </div>
        <hr className="my-4" />
        <p className="text-center" style={{ color: 'blue' }}>&copy; 2024 Tasty Tales Recipes. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
