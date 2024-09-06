import React from 'react';

import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';

import IntroSection from '../components/IntroSection/IntroSection';
import CoursesSection from '../components/CoursesSection/CoursesSection';
import ProgramsSection from '../components/ProgramsSection/ProgramsSection';
import TeachersSection from '../components/TeachersSection/TeachersSection';


const Home = () => {
    return (
        <div class="site-wrap">
            <div class="site-mobile-menu site-navbar-target">
                <div class="site-mobile-menu-header">
                    <div class="site-mobile-menu-close mt-3">
                    <span class="icon-close2 js-menu-toggle"></span>
                </div>
            </div>
        <div class="site-mobile-menu-body"></div>
        </div>
            <Header/>
            <IntroSection/>
            <CoursesSection/>
            <ProgramsSection/>
            <TeachersSection/>
            <Footer/>
        </div>
    );
};

export default Home;
