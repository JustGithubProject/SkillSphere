import React from 'react';
import './Footer.css'; 

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-row">
          <div className="footer-col">
            <h3 className="footer-title">About Us</h3>
            <p className="footer-text">
              We are committed to providing exceptional education and a supportive learning environment.
            </p>
          </div>
          <div className="footer-col">
            <h3 className="footer-title">Quick Links</h3>
            <ul className="footer-links">
              <li><a href="/" className="footer-link">Home</a></li>
              <li><a href="#" className="footer-link">Courses</a></li>
              <li><a href="#" className="footer-link">Programs</a></li>
              <li><a href="#" className="footer-link">Teachers</a></li>
              <li><a href="#" className="footer-link">Contact</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h3 className="footer-title">Contact Us</h3>
            <p className="footer-contact">
              <a href="/contact-us" className="footer-contact-link">Contact Us</a>
            </p>
            <p className="footer-address">123 Street Name, City, Country</p>
            <p className="footer-email">Email: example@example.com</p>
            <p className="footer-phone">Phone: (123) 456-7890</p>
          </div>
          <div className="footer-col">
            <h3 className="footer-title">Follow Us</h3>
            <ul className="footer-social">
              <li><a href="#" className="footer-social-link"><span className="icon-facebook"></span></a></li>
              <li><a href="#" className="footer-social-link"><span className="icon-telegram"></span></a></li>
              <li><a href="#" className="footer-social-link"><span className="icon-linkedin"></span></a></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
