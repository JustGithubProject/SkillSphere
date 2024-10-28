import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import * as jwtDecodeModule from 'jwt-decode';
import Cookies from 'js-cookie';

import { FaLanguage } from 'react-icons/fa';
import { BiWorld } from 'react-icons/bi';

import { useTranslation } from 'react-i18next';



const Header = ({isCoursesPage, isPurchasedCoursesPage, isHomePage}) => {
    const [username, setUsername] = useState('');
    const [isAuthorized, setIsAuthorized] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const { t, i18n } = useTranslation();

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
    }, []); 

    const handleLogOutClick = () => {
        Cookies.remove("access_token");
        setIsAuthorized(false);
        setUsername('');
        window.location.href = '/';
    }

    const handlePurchasedCoursesClick = () => {
        window.location.href = '/purchased-courses'
    }

    const handleCreateCourseClick = () => {
        window.location.href = "/create-course"
    }

    const handleMyCreatedCoursesClick = () => {
        window.location.href = "/my-created-courses"
    }

    const toggleDropdown = () => {
        setIsDropdownOpen(prev => !prev); 
    };

    const switchToUkrainian = () => {
        i18n.changeLanguage('uk'); 
    };
    
    const switchToEnglish = () => {
        i18n.changeLanguage('en');
    };

    return (
        <>
            {/* Topbar Start */}
            <div className="container-fluid d-none d-lg-block">
                <div className="row align-items-center py-4 px-xl-5">
                    <div className="col-lg-3">
                        <Link to="/" className="text-decoration-none">
                            <h1 className="m-0"><span className="text-primary"></span>SkillSphere</h1>
                        </Link>
                    </div>
                    <div className="col-lg-3 text-right">
                        <div className="d-inline-flex align-items-center">
                            <i className="fa fa-2x fa-map-marker-alt text-primary mr-3"></i>
                            <div className="text-left">
                                <h6 className="font-weight-semi-bold mb-1">{t('Our Office')}</h6>
                                <small>{t('123 Street, New York, USA')}</small>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 text-right">
                        <div className="d-inline-flex align-items-center">
                            <i className="fa fa-2x fa-envelope text-primary mr-3"></i>
                            <div className="text-left">
                                <h6 className="font-weight-semi-bold mb-1">{t('Email Us')}</h6>
                                <small>info@example.com</small>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 text-right">
                        <div className="d-inline-flex align-items-center">
                            <i className="fa fa-2x fa-phone text-primary mr-3"></i>
                            <div className="text-left">
                                <h6 className="font-weight-semi-bold mb-1">{t('Call Us')}</h6>
                                <small>+012 345 6789</small>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Topbar End */}

            {/* Navbar Start */}
            <div className="container-fluid">
                <div className="row border-top px-xl-5">
                    <div className="col-lg-3 d-none d-lg-block">
                        <a className="d-flex align-items-center justify-content-between bg-secondary w-100 text-decoration-none" data-toggle="collapse" href="#navbar-vertical" style={{ height: '67px', padding: '0 30px' }}>
                            <h5 className="text-primary m-0"><i className="fa fa-book-open mr-2"></i>{t('Subjects')}</h5>
                            <i className="fa fa-angle-down text-primary"></i>
                        </a>
                        <nav className="collapse position-absolute navbar navbar-vertical navbar-light align-items-start p-0 border border-top-0 border-bottom-0 bg-light" id="navbar-vertical" style={{ width: 'calc(100% - 30px)', zIndex: 9 }}>
                            <div className="navbar-nav w-100">
                                <div className="nav-item dropdown">
                                    <a href="#" className="nav-link" data-toggle="dropdown">{t('Web Design')}<i className="fa fa-angle-down float-right mt-1"></i></a>
                                    <div className="dropdown-menu position-absolute bg-secondary border-0 rounded-0 w-100 m-0">
                                        <a href="" className="dropdown-item">HTML</a>
                                        <a href="" className="dropdown-item">CSS</a>
                                        <a href="" className="dropdown-item">jQuery</a>
                                    </div>
                                </div>
                                <a href="" className="nav-item nav-link">{t('Apps Design')}</a>
                                <a href="" className="nav-item nav-link">{t('Marketing')}</a>
                                <a href="" className="nav-item nav-link">{t('Research')}</a>
                                <a href="" className="nav-item nav-link">SEO</a>
                            </div>
                        </nav>
                    </div>
                    <div className="col-lg-9">
                        <nav className="navbar navbar-expand-lg bg-light navbar-light py-3 py-lg-0 px-0">
                            <Link to="/" className="text-decoration-none d-block d-lg-none">
                                <h1 className="m-0"><span className="text-primary">E</span>COURSES</h1>
                            </Link>
                            <button type="button" className="navbar-toggler" data-toggle="collapse" data-target="#navbarCollapse">
                                <span className="navbar-toggler-icon"></span>
                            </button>
                            <div className="collapse navbar-collapse justify-content-between" id="navbarCollapse">
                                <div className="navbar-nav py-0">
                                    <Link to="/" className={`nav-item nav-link ${isHomePage ? 'active' : ''}`}>{t('Home')}</Link>
                                    <Link to="/courses" className={`nav-item nav-link ${isCoursesPage ? 'active' : ''}`}>{t('Courses')}</Link>
                                
                                    <Link to="/contact-us" className="nav-item nav-link">{t('Contact')}</Link>
                                    <button
                                        onClick={switchToEnglish}
                                        className="btn btn-outline-primary btn-sm mx-2"
                                        title="English"
                                    >
                                        EN
                                    </button>
                                    <button
                                        onClick={switchToUkrainian}
                                        className="btn btn-outline-primary btn-sm mx-2"
                                        title="Українська"
                                    >
                                        UA
                                    </button>
                                </div>
                                {isAuthorized ? (
                                    <div className="dropdown ml-auto d-none d-lg-block">
                                        <button className="btn btn-primary" type="button" onClick={toggleDropdown}>
                                            {username} <i className={`fa ${isDropdownOpen ? 'fa-angle-up' : 'fa-angle-down'}`}></i>
                                        </button>
                                        {isDropdownOpen && (
                                            <div className="dropdown-menu show" aria-labelledby="userDropdown">
                                                <button onClick={handleCreateCourseClick} className="dropdown-item">
                                                    {t('Create Course')}
                                                </button>
                                                <button onClick={handlePurchasedCoursesClick} className="dropdown-item">
                                                    {t('Purchases Courses')}
                                                </button>
                                                <button onClick={handleMyCreatedCoursesClick} className="dropdown-item">
                                                    {t('My created courses')}
                                                </button>
                                                <button onClick={handleLogOutClick} className="dropdown-item">
                                                    {t('Log out')}
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <div className="dropdown ml-auto d-none d-lg-block">
                                        <button className="btn btn-info" type="button" onClick={toggleDropdown}>
                                            {t('Login / Sign Up')} <i className={`fa ${isDropdownOpen ? 'fa-angle-up' : 'fa-angle-down'}`}></i>
                                        </button>
                                        {isDropdownOpen && (
                                            <div className="dropdown-menu show" aria-labelledby="authDropdown">
                                                <Link to="/login" className="dropdown-item">{t('Login')}</Link>
                                                <Link to="/signup" className="dropdown-item">{t('Sign Up')}</Link>
                                            </div>
                                        )}
                                    </div>
                                )}
                                
                            </div>
                        </nav>
                    </div>
                </div>
            </div>
            {/* Navbar End */}

        </>
    );
};

export default Header;
