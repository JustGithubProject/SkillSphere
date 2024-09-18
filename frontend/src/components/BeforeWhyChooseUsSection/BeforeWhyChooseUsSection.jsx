import React from 'react';

const BeforeWhyChooseUsSection = () => {
    return (
        <div
            className="site-section bg-image overlay"
            style={{ backgroundImage: "url('images/hero_1.jpg')" }}
        >
            <div className="container">
                <div className="row justify-content-center align-items-center">
                    <div className="col-md-8 text-center testimony">
                        <img
                            src="images/person_4.jpg"
                            alt="Image"
                            className="img-fluid w-25 mb-4 rounded-circle"
                        />
                        <h3 className="mb-4">Jerome Jensen</h3>
                        <blockquote>
                            <p>
                                &ldquo; Explore our expertly designed courses crafted to elevate your skills and knowledge. Discover a world of learning with our tailored programs that meet your needs and exceed expectations. Join us to unlock new opportunities and achieve your goals with confidence!&rdquo;
                            </p>
                        </blockquote>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BeforeWhyChooseUsSection;
