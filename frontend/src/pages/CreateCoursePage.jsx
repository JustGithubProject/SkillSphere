import React, { useState, useEffect } from 'react';

import HeaderEN from '../components/CoursesPageComponents/Header/HeaderEN';
import HeaderUA from '../components/CoursesPageComponents/Header/HeaderUA';
import CreateCourseSectionEN from '../components/CreateCourseSection/CreateCourseSectionEN';
import CreateCourseSectionUA from '../components/CreateCourseSection/CreateCourseSectionUA';
import FooterEN from '../components/CoursesPageComponents/Footer/FooterEN';
import FooterUA from '../components/CoursesPageComponents/Footer/FooterUA';

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
                    <HeaderEN isCoursesPage={false} isHomePage={true} isPurchasedCoursesPage={false} />
                    <CreateCourseSectionEN/>
                    <FooterEN/>
                </>
                
            ) : (
                <>
                    <HeaderUA isCoursesPage={false} isHomePage={true} isPurchasedCoursesPage={false} />
                    <CreateCourseSectionUA/>
                    <FooterUA/>
                </>
            )}

        </>
    );   
}

export default CreateCoursePage;