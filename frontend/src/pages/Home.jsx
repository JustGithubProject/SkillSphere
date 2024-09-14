import React, { useState, useEffect } from 'react';

import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';

import IntroSection from '../components/IntroSection/IntroSection';
import CoursesSection from '../components/CoursesSection/CoursesSection';
import ProgramsSection from '../components/ProgramsSection/ProgramsSection';
import CreateCourseSection from '../components/CreateCourseSection/CreateCourseSection';
import TeachersSection from '../components/TeachersSection/TeachersSection';
import BeforeWhyChooseUsSection from '../components/BeforeWhyChooseUsSection/BeforeWhyChooseUsSection';
import WhyChooseUsSection from '../components/WhyChooseUsSection/WhyChooseUsSection';


import Cookies from 'js-cookie';

const Home = () => {
    const [isAuthorized, setIsAuthorized] = useState(false);

    useEffect(() => {
      const accessToken = Cookies.get("access_token");
      if (accessToken) {
        setIsAuthorized(true);
      }
    })
    return (
        <div className="site-wrap">
            <div className="site-mobile-menu site-navbar-target">
                <div className="site-mobile-menu-header">
                    <div className="site-mobile-menu-close mt-3">
                    <span className="icon-close2 js-menu-toggle"></span>
                </div>
            </div>
        <div className="site-mobile-menu-body"></div>
        </div>
            <Header/>
            <IntroSection/>
            <CoursesSection/>
            <ProgramsSection/>
            {isAuthorized ? (<CreateCourseSection/>
            ) : <TeachersSection/>}
            
            <BeforeWhyChooseUsSection/>
            <WhyChooseUsSection/>
            <Footer/>
        </div>
    );
};

export default Home;
