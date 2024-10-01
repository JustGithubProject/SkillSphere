import React, { useState, useEffect } from 'react';
import Header from '../components/CoursesPageComponents/Header/Header';
import CarouselComponent from '../components/CarouselComponent/CarouselComponent';
import AboutUsComponent from '../components/AboutUsComponent/AboutUsComponent';
import CategorySectionComponent from '../components/CategorySectionComponent/CategorySectionComponent';
import RegistrationComponent from '../components/RegistrationComponent/RegistrationComponent';
import Footer from '../components/CoursesPageComponents/Footer/Footer';
import Cookies from 'js-cookie';

import axios from 'axios';



const HomeV2Page = () => {
    const [isAuthorized, setIsAuthorized] = useState(false);

    useEffect(() => {
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
            <Header isCoursesPage={false} isHomePage={true} isPurchasedCoursesPage={false}/>
            <CarouselComponent/>
            <AboutUsComponent/>
            <CategorySectionComponent/>
            <RegistrationComponent/>
            <Footer />
        </>
    );
};

export default HomeV2Page;
