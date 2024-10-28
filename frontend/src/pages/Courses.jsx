import React, { useState, useEffect } from 'react';

import Header from '../components/CoursesPageComponents/Header/Header';
import BookImageContainerEN from '../components/CoursesPageComponents/BookImageContainer/BookImageContainerEN';
import BookImageContainerUA from '../components/CoursesPageComponents/BookImageContainer/BookImageContainerUA';
import CoursesCategoryEN from '../components/CoursesPageComponents/CoursesCategory/CoursesCategoryEN';
import CoursesCategoryUA from '../components/CoursesPageComponents/CoursesCategory/CoursesCategoryUA';
import SetCoursesEN from '../components/CoursesPageComponents/SetCourses/SetCoursesEN';
import SetCoursesUA from '../components/CoursesPageComponents/SetCourses/SetCoursesUA';
import Footer from '../components/CoursesPageComponents/Footer/Footer';


const Courses = () => {
    const [currentLanguage, setCurrentLanguage] = useState('en');

    useEffect(() => {
        const currentLang = localStorage.getItem("language_key");
        setCurrentLanguage(currentLang);
    }, []); 
    return (
        <>
            {currentLanguage === 'en' ? (
                <>
                    <Header isCoursesPage={true} isHomePage={false} isPurchasedCoursesPage={false} />
                    <BookImageContainerEN/>
                    <CoursesCategoryEN/>
                    <SetCoursesEN/>
                    <Footer/>
                </>
            ) : (
                <>
                    <Header isCoursesPage={true} isHomePage={false} isPurchasedCoursesPage={false} />
                    <BookImageContainerUA/>
                    <CoursesCategoryUA/>
                    <SetCoursesUA/>
                    <Footer/>
                </>
            )}

        </>
    )
}

export default Courses;

