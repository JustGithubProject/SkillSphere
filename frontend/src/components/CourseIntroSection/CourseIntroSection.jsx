import React from 'react';

const CourseIntroSection = () => {
    return (
        <div className="intro-section single-cover" id="home-section">
            <div className="slide-1" style={{ backgroundImage: "url('images/img_2.jpg')", backgroundAttachment: "fixed" }}>
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-12">
                            <div className="row justify-content-center align-items-center text-center">
                                <div className="col-lg-6">
                                    <h1 data-aos="fade-up" data-aos-delay="0">Logo Design Course</h1>
                                    <p data-aos="fade-up" data-aos-delay="100">
                                        4 Lessons / 12 Week &bullet; 2,193 students &bullet; <a href="#" className="text-white">6 comments</a>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CourseIntroSection;
