import React from 'react';

import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';

import IntroSection from '../components/IntroSection/IntroSection';
import CoursesSection from '../components/CoursesSection/CoursesSection';
import ProgramsSection from '../components/ProgramsSection/ProgramsSection';
import TeachersSection from '../components/TeachersSection/TeachersSection';


const Home = () => {
    return (
        <div>
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
