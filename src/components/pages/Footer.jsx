import React from 'react';
import '../styles/footer.scss';
import { BsInstagram } from "react-icons/bs";
import { FaLinkedin } from "react-icons/fa6";
import { FaXTwitter } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa";
import logo from '../img/logo-black.png';
import { Link } from 'react-router-dom';

const Footer = () => {
  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    const email = e.currentTarget.elements.namedItem('email').value;
    alert(`Thank you for singing up!\n You will recive our news on this email: ${email}`);
  };

  return (
    <footer className="footer">
      <div className="footer-container">

      <div className="newsletter">
          <h4>Subscribe to our newsletter to stay up to date!</h4>
          <form onSubmit={handleNewsletterSubmit} className="newsletter-form">
            <input type="email" name="email" placeholder="Your email address" required />
            <button type="submit">Sign Up</button>
          </form>
        </div>


        <div className="social-media">
          <a href="https://x.com/lucasanniaxx" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="social-icon">
            <FaXTwitter className='social' id='tw' />
          </a>
          <a href="https://www.instagram.com/lucasanniaa/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="social-icon">
            <BsInstagram className='social' id='insta' />
          </a>
          <a href="https://www.linkedin.com/in/luca-sannia-376871309/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="social-icon">
            <FaLinkedin className='social' id='linkedin' />
          </a>
          <a href="https://www.linkedin.com/in/luca-sannia-376871309/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="social-icon">
            <FaGithub className='social' id='github' />
          </a>
        </div>





        {/* Nuova sezione per informazioni personali */}
        <div className="personal-info">
          <div className="info-left">
            <img src={logo} alt="Logo" className="footer-logo" />
          </div>
          <div className="info-right">
            <h5>Luca Sannia</h5>
            <p>luca.sannia@lucasannia.it</p>
            <p>12 Corso Genova, Rome, Italy</p>
          </div>
        </div>


        <div>
          <Link to="/contact">
          <button className='contact-button'>
            Contact Us
          </button>
          </Link>
        </div>

        

        <div className="footer-bottom">
          <p className='copy'>&copy; 2024 ScienceLens. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
