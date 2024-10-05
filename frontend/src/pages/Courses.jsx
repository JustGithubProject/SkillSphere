import React, { useState, useEffect } from 'react';

import HeaderEN from '../components/CoursesPageComponents/Header/HeaderEN';
import HeaderUA from '../components/CoursesPageComponents/Header/HeaderUA';
import BookImageContainerEN from '../components/CoursesPageComponents/BookImageContainer/BookImageContainerEN';
import BookImageContainerUA from '../components/CoursesPageComponents/BookImageContainer/BookImageContainerUA';
import CoursesCategoryEN from '../components/CoursesPageComponents/CoursesCategory/CoursesCategoryEN';
import CoursesCategoryUA from '../components/CoursesPageComponents/CoursesCategory/CoursesCategoryUA';
import SetCoursesEN from '../components/CoursesPageComponents/SetCourses/SetCoursesEN';
import SetCoursesUA from '../components/CoursesPageComponents/SetCourses/SetCoursesUA';
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
                    <HeaderEN isCoursesPage={true} isHomePage={false} isPurchasedCoursesPage={false} />
                    <BookImageContainerEN/>
                    <CoursesCategoryEN/>
                    <SetCoursesEN/>
                    <FooterEN/>
                </>
            ) : (
                <>
                    <HeaderUA isCoursesPage={true} isHomePage={false} isPurchasedCoursesPage={false} />
                    <BookImageContainerUA/>
                    <CoursesCategoryUA/>
                    <SetCoursesUA/>
                    <FooterUA/>
                </>
            )}

        </>
    )
}

export default Courses;

