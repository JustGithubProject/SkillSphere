import React, { useState, useEffect } from 'react';

import HeaderEN from '../components/CoursesPageComponents/Header/HeaderEN';
import HeaderUA from '../components/CoursesPageComponents/Header/HeaderUA';
import CourseSingleComponent from '../components/CourseSingle/CourseSingle';
import FooterEN from '../components/CoursesPageComponents/Footer/FooterEN';
import FooterUA from '../components/CoursesPageComponents/Footer/FooterUA';


import { useParams } from 'react-router-dom';


const CourseSingle = () => {
    const { id } = useParams();
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
                    <CourseSingleComponent course_id={id}/>
                    <FooterEN/>
                </>
            ) : (
                <>
                    <HeaderUA isCoursesPage={false} isHomePage={true} isPurchasedCoursesPage={false} />
                    <CourseSingleComponent course_id={id}/>
                    <FooterUA/>
                </>
            )}

        </>
    );
};

export default CourseSingle;
