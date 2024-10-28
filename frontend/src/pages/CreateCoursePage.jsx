import React, { useState, useEffect } from 'react';

import Header from '../components/CoursesPageComponents/Header/Header';
import CreateCourseSectionEN from '../components/CreateCourseSection/CreateCourseSectionEN';
import CreateCourseSectionUA from '../components/CreateCourseSection/CreateCourseSectionUA';
import Footer from '../components/CoursesPageComponents/Footer/Footer';

const CreateCoursePage = () => {
    const [currentLanguage, setCurrentLanguage] = useState('en');

    useEffect(() => {
        const currentLang = localStorage.getItem("language_key");
        setCurrentLanguage(currentLang);
    }, []); 
    return (
        <>
            {currentLanguage === 'en' ? (
                <>
                    <Header isCoursesPage={false} isHomePage={true} isPurchasedCoursesPage={false} />
                    <CreateCourseSectionEN/>
                    <Footer/>
                </>
                
            ) : (
                <>
                    <Header isCoursesPage={false} isHomePage={true} isPurchasedCoursesPage={false} />
                    <CreateCourseSectionUA/>
                    <Footer/>
                </>
            )}

        </>
    );   
}

export default CreateCoursePage;