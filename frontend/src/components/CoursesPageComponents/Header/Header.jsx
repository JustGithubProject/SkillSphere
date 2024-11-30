import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import * as jwtDecodeModule from 'jwt-decode';
import Cookies from 'js-cookie';

import { useTranslation } from 'react-i18next';

import { Input, Space, Button } from 'antd';

const { Search } = Input;

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

    const handleSearch = (value) => {
        window.location.href = `/courses/search/?q=${value}&is_free=false`
    }

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
                                <h6 className="font-weight-semi-bold mb-1">{t('Country')}</h6>
                                <small>{t('Ukraine')}</small>
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
                                <a href="/courses/web-design" className="nav-link">{t('Web Design')}</a>
                                <a href="/courses/apps-design" className="nav-item nav-link">{t('Apps Design')}</a>
                                <a href="/courses/marketing" className="nav-item nav-link">{t('Marketing')}</a>
                                <a href="/courses/research" className="nav-item nav-link">{t('Research')}</a>
                                <a href="/courses/seo" className="nav-item nav-link">SEO</a>
                                <a href="/courses/development" className="nav-item nav-link">{t('Development')}</a>
                                <a href="/courses/game-design" className="nav-item nav-link">{t('Game Design')}</a>
                                <a href="/courses/content-writing" className="nav-item nav-link">{t('Content Writing')}</a>
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
                                    <Button onClick={switchToEnglish} size="small" style={{ marginRight: '8px' }}>EN</Button>
                                    <Button onClick={switchToUkrainian} size="small">UA</Button>
                                    <Search
                                        placeholder={t('Search course...')}
                                        onSearch={handleSearch}
                                        style={{
                                            width: 200,
                                            marginTop: '20px',
                                            marginLeft: '500px'
                                        }}
                                    />
                                </div>
                                {isAuthorized ? (
                                    <div className="dropdown ml-auto d-none d-lg-block">
                                        <Button type="primary" onClick={toggleDropdown}>
                                            {username} <i className={`fa ${isDropdownOpen ? 'fa-angle-up' : 'fa-angle-down'}`}></i>
                                        </Button>
                                        {isDropdownOpen && (
                                            <div className="dropdown-menu show" aria-labelledby="userDropdown">
                                                <Button onClick={handleCreateCourseClick} className="dropdown-item">
                                                    {t('Create Course')}
                                                </Button>
                                                <Button onClick={handlePurchasedCoursesClick} className="dropdown-item">
                                                    {t('Purchases Courses')}
                                                </Button>
                                                <Button onClick={handleMyCreatedCoursesClick} className="dropdown-item">
                                                    {t('My created courses')}
                                                </Button>
                                                <Button onClick={handleLogOutClick} className="dropdown-item">
                                                    {t('Log out')}
                                                </Button>
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <div className="dropdown ml-auto d-none d-lg-block">
                                        <Button type="info" onClick={toggleDropdown}>
                                            {t('Login / Sign Up')} <i className={`fa ${isDropdownOpen ? 'fa-angle-up' : 'fa-angle-down'}`}></i>
                                        </Button>
                                        {isDropdownOpen && (
                                            <div className="dropdown-menu show" aria-labelledby="userDropdown">
                                                <Link to="/signup">
                                                    <Button className="dropdown-item">{t('Sign Up')}</Button>
                                                </Link>
                                                <Link to="/login">
                                                    <Button className="dropdown-item">{t('Log In')}</Button>
                                                </Link>
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
    )
}

export default Header;
