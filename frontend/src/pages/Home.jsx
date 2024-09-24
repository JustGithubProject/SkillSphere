import React, { useState, useEffect } from 'react';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import IntroSection from '../components/IntroSection/IntroSection';
import ProgramsSection from '../components/ProgramsSection/ProgramsSection';
import CreateCourseSection from '../components/CreateCourseSection/CreateCourseSection';
import BeforeWhyChooseUsSection from '../components/BeforeWhyChooseUsSection/BeforeWhyChooseUsSection';
import WhyChooseUsSection from '../components/WhyChooseUsSection/WhyChooseUsSection';
import Cookies from 'js-cookie';

import axios from 'axios';

const Home = () => {
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
        <div className="site-wrap">
            <div className="site-mobile-menu site-navbar-target">
                <div className="site-mobile-menu-header">
                    <div className="site-mobile-menu-close mt-3">
                        <span className="icon-close2 js-menu-toggle"></span>
                    </div>
                </div>
                <div className="site-mobile-menu-body"></div>
            </div>
            <Header />
            <div id="home-section">
                <IntroSection />
            </div>
            {/* <div id="courses-section">
                <CoursesSection/>
            </div> */}
            <div id="programs-section">
                <ProgramsSection />
            </div>
            {isAuthorized ? (
                <div id="create-course-section">
                    <CreateCourseSection />
                </div>
            ) : null}
            <BeforeWhyChooseUsSection />
            <div id="why-choose-us-section">
                <WhyChooseUsSection />
            </div>
            <Footer />
        </div>
    );
};

export default Home;
