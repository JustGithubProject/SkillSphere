import React from 'react';

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="row">
          <div className="col-md-3">
            <h3>About</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempora, neque!</p>
          </div>
          <div className="col-md-3">
            <h3>Links</h3>
            <ul>
              <li><a href="#">Home</a></li>
              <li><a href="#">Courses</a></li>
              <li><a href="#">Programs</a></li>
              <li><a href="#">Teachers</a></li>
              <li><a href="#">Contact</a></li>
            </ul>
          </div>
          <div className="col-md-3">
            <h3>Contact</h3>
            <p>123 Street Name, City, Country</p>
            <p>Email: example@example.com</p>
            <p>Phone: (123) 456-7890</p>
          </div>
          <div className="col-md-3">
            <h3>Follow Us</h3>
            <ul className="social">
              <li><a href="#"><span className="icon-facebook"></span></a></li>
              <li><a href="#"><span className="icon-twitter"></span></a></li>
              <li><a href="#"><span className="icon-linkedin"></span></a></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
