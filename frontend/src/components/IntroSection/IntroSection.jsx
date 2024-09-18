import React, { useState, useEffect } from 'react';
import SignUpForm from '../SignUpForm/SignUpForm';
import LoginForm from '../LoginForm/LoginForm';

import Cookies from 'js-cookie';

const IntroSection = () => {
  const [isSignUp, setIsSignUp] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const accessToken = Cookies.get("access_token");
    if (accessToken && accessToken.length > 10) {
      setIsAuthorized(true);
    }
  }, []);

  const toggleForm = () => {
    setIsSignUp(prevState => !prevState);
  };

  return (
    <div className="intro-section" id="home-section">
      <div className="slide-1" style={{ backgroundImage: "url('images/hero_1.jpg')" }} data-stellar-background-ratio="0.5">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-12">
              <div className="row align-items-center">
                <div className="col-lg-6 mb-4">
                  <h1 data-aos="fade-up" data-aos-delay="100">Learn From The Expert</h1>
                  <p className="mb-4" data-aos="fade-up" data-aos-delay="200">Welcome to our comprehensive learning platform, where you can elevate your skills and knowledge through expertly crafted courses.</p>
                </div>
                {!isAuthorized &&
                  <div className="col-lg-5 ml-auto" data-aos="fade-up" data-aos-delay="500">
                    <button onClick={toggleForm} className="btn btn-secondary">
                      {isSignUp ? 'Switch to Login' : 'Switch to Sign Up'}
                    </button>
                    {isSignUp ? <SignUpForm /> : <LoginForm />}
                  </div>
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IntroSection;
