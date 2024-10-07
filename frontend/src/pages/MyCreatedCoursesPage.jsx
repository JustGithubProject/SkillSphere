import React, { useState, useEffect } from 'react';
import HeaderEN from '../components/CoursesPageComponents/Header/HeaderEN';
import HeaderUA from '../components/CoursesPageComponents/Header/HeaderUA';
import MyCreatedCourses from '../components/MyCreatedCourses/MyCreatedCourses';

const MyCreatedCoursesPage = () => {
    const [currentLanguage, setCurrentLanguage] = useState('en');
    useEffect(() => {
        const currentLang = localStorage.getItem("language_key");
        setCurrentLanguage(currentLang);
    }, []); 
    return (
        <>
        {currentLanguage === 'en' ? (
            <HeaderEN isCoursesPage={false} isHomePage={true} isPurchasedCoursesPage={false} />
        ) : (
            <HeaderUA isCoursesPage={false} isHomePage={true} isPurchasedCoursesPage={false} />
        )}
        <MyCreatedCourses/>
        </>
    )
}

export default MyCreatedCoursesPage;