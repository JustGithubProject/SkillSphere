import React, { useState, useEffect } from 'react';

import Header from '../components/CoursesPageComponents/Header/Header';
import CourseSingleComponent from '../components/CourseSingle/CourseSingle';
import Footer from '../components/CoursesPageComponents/Footer/Footer';


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
                    <Header isCoursesPage={false} isHomePage={true} isPurchasedCoursesPage={false} />
                    <CourseSingleComponent course_id={id}/>
                    <Footer/>
                </>
            ) : (
                <>
                    <Header isCoursesPage={false} isHomePage={true} isPurchasedCoursesPage={false} />
                    <CourseSingleComponent course_id={id}/>
                    <Footer/>
                </>
            )}

        </>
    );
};

export default CourseSingle;
