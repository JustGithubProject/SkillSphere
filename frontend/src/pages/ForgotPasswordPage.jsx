import React, { useState, useEffect } from 'react';

import ForgotPasswordFormEN from '../components/ForgotPasswordForm/ForgotPasswordFormEN';
import ForgotPasswordFormUA from '../components/ForgotPasswordForm/ForgotPasswordFormUA';

const ForgotPasswordPage = () => {
    const [currentLanguage, setCurrentLanguage] = useState('en');

    useEffect(() => {
        const currentLang = localStorage.getItem("language_key");
        setCurrentLanguage(currentLang);
    }, []);
    
    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            {currentLanguage ===  'en' ? <ForgotPasswordFormEN/> : <ForgotPasswordFormUA/>};
        </div>
    )
};

export default ForgotPasswordPage;
