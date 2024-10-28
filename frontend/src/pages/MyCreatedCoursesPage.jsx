import React, { useState, useEffect } from 'react';
import Header from '../components/CoursesPageComponents/Header/Header';
import MyCreatedCourses from '../components/MyCreatedCourses/MyCreatedCourses';
import MyCreatedCoursesV2 from '../components/MyCreatedCourses/MyCreatedCoursesV2';

const MyCreatedCoursesPage = () => {
    const [currentLanguage, setCurrentLanguage] = useState('en');
    useEffect(() => {
        const currentLang = localStorage.getItem("language_key");
        setCurrentLanguage(currentLang);
    }, []); 
    return (
        <>
        {currentLanguage === 'en' ? (
            <Header isCoursesPage={false} isHomePage={true} isPurchasedCoursesPage={false} />
        ) : (
            <Header isCoursesPage={false} isHomePage={true} isPurchasedCoursesPage={false} />
        )}
        {/* <MyCreatedCourses/> */}
        <MyCreatedCoursesV2/>
        </>
    )
}

export default MyCreatedCoursesPage;