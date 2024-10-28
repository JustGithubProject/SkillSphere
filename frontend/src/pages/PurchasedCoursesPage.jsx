import React, { useState, useEffect } from 'react';
import Header from '../components/CoursesPageComponents/Header/Header';
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
                <Header isCoursesPage={false} isHomePage={false} isPurchasedCoursesPage={false} />
                <PurchasedCoursesEN/>
            </>
        ) : (
            <>
                <Header isCoursesPage={false} isHomePage={false} isPurchasedCoursesPage={false} />
                <PurchasedCoursesUA/>
            </>
        )}
        
        </>
    )
}

export default PurchasedCoursesPage;