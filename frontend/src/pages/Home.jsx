import React, { useState, useEffect } from 'react';
import HeaderEN from '../components/CoursesPageComponents/Header/HeaderEN';
import HeaderUA from '../components/CoursesPageComponents/Header/HeaderUA';
import CarouselComponentEN from '../components/CarouselComponent/CarouselComponentEN';
import CarouselComponentUA from '../components/CarouselComponent/CarouselComponentUA';
import AboutUsComponentEN from '../components/AboutUsComponent/AboutUsComponentEN';
import AboutUsComponentUA from '../components/AboutUsComponent/AboutUsComponentUA';
import CategorySectionComponentEN from '../components/CategorySectionComponent/CategorySectionComponentEN';
import CategorySectionComponentUA from '../components/CategorySectionComponent/CategorySectionComponentUA';
import RegistrationComponentEN from '../components/RegistrationComponent/RegistrationComponentEN';
import RegistrationComponentUA from '../components/RegistrationComponent/RegistrationComponentUA';
import FooterEN from '../components/CoursesPageComponents/Footer/FooterEN';
import FooterUA from '../components/CoursesPageComponents/Footer/FooterUA';
import Cookies from 'js-cookie';

import axios from 'axios';



const HomeV2Page = () => {
    const [isAuthorized, setIsAuthorized] = useState(false);
    const [currentLanguage, setCurrentLanguage] = useState('en');
    useEffect(() => {
        const currentLang = localStorage.getItem("language_key");
        setCurrentLanguage(currentLang);

        const accessToken = Cookies.get("access_token");
        if (accessToken) {
            setIsAuthorized(true);
        }

        const checkUrlParams = async () => {
            const urlParams = new URLSearchParams(window.location.search);
            const tokenParam = urlParams.get('token');
            const payerIDParam = urlParams.get('PayerID');
            const courseID = localStorage.getItem("course_id");
            localStorage.removeItem("course_id");

            if (tokenParam && payerIDParam) {
                // TODO: logic to handle token and payerID
                await axios.post(
                    "http://127.0.0.1:8000/paypal/check/payment",
                    {
                        token: tokenParam,
                        payer_id: payerIDParam,
                        course_id: courseID
                    },
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${accessToken}`,
                        }
                    }
                );
                
                console.log("Student has been addedd");
                console.log(courseID);
                window.location.href = "/";

            }
        };

        checkUrlParams();

        const intervalId = setInterval(checkUrlParams, 3000);

        return () => clearInterval(intervalId);
    }, []); 

    return (
        <>
            {currentLanguage === 'en' ? (
                <>
                    <HeaderEN isCoursesPage={false} isHomePage={true} isPurchasedCoursesPage={false} />
                    <CarouselComponentEN />
                    <AboutUsComponentEN/>
                    <CategorySectionComponentEN/>
                    <RegistrationComponentEN/>
                    <FooterEN/>
                </>
            ) : (
                <>
                    <HeaderUA isCoursesPage={false} isHomePage={true} isPurchasedCoursesPage={false} />
                    <CarouselComponentUA />
                    <AboutUsComponentUA/>
                    <CategorySectionComponentUA/>
                    <RegistrationComponentUA/>
                    <FooterUA/>
                </>
            )}
        </>
    );
};

export default HomeV2Page;
