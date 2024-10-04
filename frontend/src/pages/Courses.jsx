import React, { useState, useEffect } from 'react';

import HeaderEN from '../components/CoursesPageComponents/Header/HeaderEN';
import HeaderUA from '../components/CoursesPageComponents/Header/HeaderUA';
import BookImageContainer from '../components/CoursesPageComponents/BookImageContainer/BookImageContainer';
import CoursesCategory from '../components/CoursesPageComponents/CoursesCategory/CoursesCategory';
import SetCourses from '../components/CoursesPageComponents/SetCourses/SetCourses';
import FooterEN from '../components/CoursesPageComponents/Footer/FooterEN';
import FooterUA from '../components/CoursesPageComponents/Footer/FooterUA';

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
                    <HeaderEN isCoursesPage={false} isHomePage={true} isPurchasedCoursesPage={false} />
                    <BookImageContainer/>
                    <CoursesCategory/>
                    <SetCourses/>
                    <FooterEN/>
                </>
            ) : (
                <>
                    <HeaderUA isCoursesPage={false} isHomePage={true} isPurchasedCoursesPage={false} />
                    <BookImageContainer/>
                    <CoursesCategory/>
                    <SetCourses/>
                    <FooterUA/>
                </>
            )}

        </>
    )
}

export default Courses;

