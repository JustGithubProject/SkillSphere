import React from 'react';

import Header from '../components/Header/Header';
import CourseIntroSection from '../components/CourseIntroSection/CourseIntroSection';
import CourseSiteSection from '../components/CourseSiteSection/CourseSiteSection';
import Footer from '../components/Footer/Footer';

const CourseSingle = () => {
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
            <CourseIntroSection/>
            <CourseSiteSection/>
            <Footer/>
        </div>
    );
};

export default CourseSingle;
