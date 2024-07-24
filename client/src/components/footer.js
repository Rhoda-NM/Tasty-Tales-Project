import React, { useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';
import './footer.css';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = async (e) => {
      e.preventDefault();
      
      try {
          // Here you can send the email to your backend if needed
          // await axios.post('/api/subscribe', { email });

          // Simulate a successful subscription
          setIsSubscribed(true);
      } catch (error) {
          console.error('Error subscribing:', error);
      }
  };


  return (
    <footer className="footer" >
      <div className="footer-container" >
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
            <li><a href="#" >Contact us</a></li>
            <li><a href="#" >FAQs</a></li>
            <li><a href="#" >Advertise</a></li>
          </ul>
        </div>
        <div className="footer-column">
          <h4>Follow us</h4>
          <ul className="social-links">
          <li><a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faFacebook} /> Facebook</a></li>
            <li><a href="https://x.com"  target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faTwitter} /> Twitter</a></li>
            <li><a href="https://www.instagram.com"  target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faInstagram} /> Instagram</a></li>
          </ul>
        </div>
        <div className="footer-column">
                <h4>Subscribe</h4>
                <p>Get the latest recipes and tips delivered to your inbox.</p>
                {isSubscribed ? (
                    <p>Thank you for subscribing!</p>
                ) : (
                    <form className="subscribe-form" onSubmit={handleSubscribe}>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <button type="submit">Subscribe</button>
                    </form>
                )}
            </div>

      </div>
      <div className="footer-bottom" >
        <p>&copy; 2024 Tasty Tales Recipes. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
