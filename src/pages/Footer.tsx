import React from 'react';
import { FaFacebookF, FaLinkedinIn, FaInstagram } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { FaXTwitter } from "react-icons/fa6";
import '../components/styles/footer.scss'


const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-grid">

          <div className="footer-section">
            <h4 className="footer-title">Information</h4>
            <ul className="footer-list">
              <li><a href="#faq" className="footer-link">FAQ</a></li>
              <li><a href="#about-us" className="footer-link">About Us</a></li>
              <li><a href="#reviews" className="footer-link">Feedback</a></li>
            </ul>
          </div>


          <div className="footer-section">
            <h4 className="footer-title">Follow Us</h4>
            <div className="footer-social-links">
              <a href="https://www.facebook.com/profile.php?id=100074200375451&locale=it_IT" target="_blank" className="footer-social-link facebook">
                <FaFacebookF className="footer-social-icon" />
              </a>
              <a href="https://x.com/lucasanniaxx" target="_blank" className="footer-social-link x">
                <FaXTwitter className="footer-social-icon" />
              </a>
              <a href="https://www.linkedin.com/in/luca-sannia-376871309/" target="_blank" className="footer-social-link linkedin">
                <FaLinkedinIn className="footer-social-icon" />
              </a>
              <a href="https://www.instagram.com/lucasanniaa/" target="_blank" className="footer-social-link instagram">
                <FaInstagram className="footer-social-icon" />
              </a>
            </div>
          </div>


          <div className="footer-section">
            <h4 className="footer-title">Contact Us</h4>
            <p className="footer-description">Have any questions or need assistance? Click here to get in touch.</p>
            <Link to="/contact">
              <button className="footer-button">Contact us</button>
            </Link>
          </div>


          <div className="footer-rights">
            <p className="footer-rights-text">© 2024 Demetra. All right reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
