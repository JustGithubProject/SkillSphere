import React, { useState, useEffect } from 'react';
import SignUpFormEN from '../components/SignUpForm/SignUpFormEN';
import SignUpFormUA from '../components/SignUpForm/SignUpFormUA';

const SignUpPage = () => {
    const [currentLanguage, setCurrentLanguage] = useState('en');

    useEffect(() => {
        const currentLang = localStorage.getItem("language_key");
        setCurrentLanguage(currentLang);
    }, []);

    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            {currentLanguage === 'en' ? <SignUpFormEN /> : <SignUpFormUA/>}
        </div>
    );
}

export default SignUpPage;
