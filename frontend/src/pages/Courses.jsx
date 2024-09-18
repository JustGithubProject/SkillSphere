import React from 'react';

import Header from '../components/CoursesPageComponents/Header/Header';
import CoursesCategory from '../components/CoursesPageComponents/CoursesCategory/CoursesCategory';
import SetCourses from '../components/CoursesPageComponents/SetCourses/SetCourses';
import Footer from '../components/CoursesPageComponents/Footer/Footer';

const Courses = () => {
    return (
        <>
            <Header/>
            <CoursesCategory/>
            <SetCourses/>
            <Footer/>
        </>
    )
}

export default Courses;

