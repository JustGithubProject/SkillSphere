import React, { useState } from 'react';

import SignUpForm from '../SignUpForm/SignUpForm';
import LoginForm from '../LoginForm/LoginForm';

const IntroSection = () => {
  const [isSignUp, setIsSignUp] = useState(true);

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
                  <p className="mb-4" data-aos="fade-up" data-aos-delay="200">Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime ipsa nulla sed quis rerum amet natus quas necessitatibus.</p>
                  <p data-aos="fade-up" data-aos-delay="300"><a href="#" className="btn btn-primary py-3 px-5 btn-pill">Admission Now</a></p>
                </div>

                <div className="col-lg-5 ml-auto" data-aos="fade-up" data-aos-delay="500">
                  <button onClick={toggleForm} className="btn btn-secondary">
                    {isSignUp ? 'Switch to Login' : 'Switch to Sign Up'}
                  </button>
                  {isSignUp ? <SignUpForm /> : <LoginForm />}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IntroSection;
