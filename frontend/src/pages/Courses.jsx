import React, { useState, useEffect } from 'react';

import Header from '../components/CoursesPageComponents/Header/Header';
import BookImageContainer from '../components/CoursesPageComponents/BookImageContainer/BookImageContainer';
import CoursesCategory from '../components/CoursesPageComponents/CoursesCategory/CoursesCategory';
import SetCourses from '../components/CoursesPageComponents/SetCourses/SetCourses';
import Footer from '../components/CoursesPageComponents/Footer/Footer';


const Courses = () => {
    return (
        <>
            <Header isCoursesPage={true} isHomePage={false} isPurchasedCoursesPage={false} />
            <BookImageContainer/>
            <CoursesCategory/>
            <SetCourses/>
            <Footer/>

        </>
    )
}

export default Courses;

