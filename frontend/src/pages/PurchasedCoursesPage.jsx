import React, { useState, useEffect } from 'react';
import HeaderEN from '../components/CoursesPageComponents/Header/HeaderEN';
import HeaderUA from '../components/CoursesPageComponents/Header/HeaderUA';
import PurchasedCourses from '../components/PurchasedCourses/PurchasedCourses';

const PurchasedCoursesPage = () => {
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
        <PurchasedCourses/>
        </>
    )
}

export default PurchasedCoursesPage;