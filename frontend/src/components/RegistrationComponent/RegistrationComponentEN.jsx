import React from 'react';

import SignUpFormEN from '../SignUpForm/SignUpFormEN';

const RegistrationComponentEN = () => {
    return (
        <div className="container-fluid bg-registration py-5" style={{ margin: '90px 0' }}>
            <div className="container py-5">
                <div className="row align-items-center">
                    <div className="col-lg-7 mb-5 mb-lg-0">
                        <div className="mb-4">
                            <h5 className="text-primary text-uppercase mb-3" style={{ letterSpacing: '5px' }}>
                                Need Any Courses
                            </h5>
                            <h1 className="text-white">30% Off For New Students</h1>
                        </div>
                        <p className="text-white">
                            We are dedicated to providing high-quality educational content
                            that caters to the needs of modern learners.
                            Our platform offers a wide variety of courses across different fields,
                            ensuring that you can find what suits you best. Join us to embark on a transformative
                            learning journey that empowers you with the skills needed to excel in today's
                            competitive environment.
                        </p>
                        <ul className="list-inline text-white m-0">
                            <li className="py-2"><i className="fa fa-check text-primary mr-3"></i>Experienced instructors guiding your learning journey</li>
                            <li className="py-2"><i className="fa fa-check text-primary mr-3"></i>Comprehensive resources and support available</li>
                            <li className="py-2"><i className="fa fa-check text-primary mr-3"></i>Flexible learning schedules to fit your lifestyle</li>
                        </ul>
                    </div>
                    <div className="col-lg-5">
                        <div className="card border-0">
                            <div className="card-header bg-light text-center p-4">
                                <h1 className="m-0">Sign Up Now</h1>
                            </div>
                            <div className="card-body rounded-bottom bg-primary p-5">
                                <SignUpFormEN/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegistrationComponentEN;
