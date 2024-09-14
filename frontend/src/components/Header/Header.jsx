import React, { useState, useEffect } from 'react';

import * as jwtDecodeModule from 'jwt-decode';
import Cookies from 'js-cookie';

import './Header.css';

const Header = () => {
    const [username, setUsername] = useState('');
    const [isAuthorized, setIsAuthorized] = useState(false);

    useEffect(() => {
      const accessToken = Cookies.get("access_token");
      if (accessToken) {
        setIsAuthorized(true);
        try {
          const decodedToken = jwtDecodeModule.jwtDecode(accessToken);
          if (decodedToken && decodedToken.username) {
            setUsername(decodedToken.username);
          }
        } catch (error) {
          console.error("Invalid token:", error);
        }
      }
    })

    const handleLogOutClick = () => {
        Cookies.remove("access_token");
        setIsAuthorized(false);
        setUsername('');
        window.location.href = '/';
    }


    return (
      <header className="site-navbar py-4 js-sticky-header site-navbar-target" role="banner">
        <div className="container-fluid">
          <div className="d-flex align-items-center">
            <div className="site-logo mr-auto w-25"><a href="/">SkillSphere</a></div>
  
            <div className="mx-auto text-center">
              <nav className="site-navigation position-relative text-right" role="navigation">
                <ul className="site-menu main-menu js-clone-nav mx-auto d-none d-lg-block m-0 p-0">
                  <li><a href="#home-section" className="nav-link">Home</a></li>
                  <li><a href="#courses-section" className="nav-link">Courses</a></li>
                  <li><a href="#programs-section" className="nav-link">Programs</a></li>
                  {isAuthorized ? (
                     <li><a href="#teachers-section" className="nav-link">Create Course</a></li>
                  ) : <li><a href="#teachers-section" className="nav-link">Teachers Section</a></li>}
                  
                 
                </ul>
              </nav>
            </div>
  
            <div className="ml-auto w-25">
              <nav className="site-navigation position-relative text-right" role="navigation">
                <ul className="site-menu main-menu site-menu-dark js-clone-nav mr-auto d-none d-lg-block m-0 p-0">
                  {isAuthorized ? (
                    <li className="username-li-style"><span>{username}</span></li>
                  ) : null}
                  {isAuthorized ? (
                      <button  onClick={handleLogOutClick} className="btn btn-secondary">
                        Log out
                      </button>
                  ) : null}
                   {/* <li className="cta"><a href="/contact-us" className="nav-link"><span>Contact Us</span></a></li> */}
                </ul>
              </nav>
              <a href="#" className="d-inline-block d-lg-none site-menu-toggle js-menu-toggle text-black float-right"><span className="icon-menu h3"></span></a>
            </div>
          </div>
        </div>
      </header>
    );
  };

export default Header;