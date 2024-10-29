import React, { useState, useEffect } from 'react';
import LoginFormEN from '../components/LoginForm/LoginFormEN';
import LoginFormUA from '../components/LoginForm/LoginFormUA';


const LoginPage = () => {
    const [currentLanguage, setCurrentLanguage] = useState('en');

    useEffect(() => {
        const currentLang = localStorage.getItem("i18nextLng");
        setCurrentLanguage(currentLang);
    }, []);
    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            {currentLanguage === 'en' ? <LoginFormEN/> : <LoginFormUA/>}
        </div>
    );
}

export default LoginPage;
