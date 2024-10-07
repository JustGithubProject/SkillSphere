import React, { useState, useEffect } from 'react';
import HeaderEN from '../components/CoursesPageComponents/Header/HeaderEN';
import HeaderUA from '../components/CoursesPageComponents/Header/HeaderUA';
import PurchasedCoursesEN from '../components/PurchasedCourses/PurchasedCoursesEN';
import PurchasedCoursesUA from '../components/PurchasedCourses/PurchasedCoursesUA';

const PurchasedCoursesPage = () => {
    const [currentLanguage, setCurrentLanguage] = useState('en');
    useEffect(() => {
        const currentLang = localStorage.getItem("language_key");
        setCurrentLanguage(currentLang);
    }, []); 
    return (
        <>
        {currentLanguage === 'en' ? (
            <>
                <HeaderEN isCoursesPage={false} isHomePage={false} isPurchasedCoursesPage={false} />
                <PurchasedCoursesEN/>
            </>
        ) : (
            <>
                <HeaderUA isCoursesPage={false} isHomePage={false} isPurchasedCoursesPage={false} />
                <PurchasedCoursesUA/>
            </>
        )}
        
        </>
    )
}

export default PurchasedCoursesPage;