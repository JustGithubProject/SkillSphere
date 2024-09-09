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
                                &ldquo; Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum rem soluta sit eius necessitatibus voluptate excepturi beatae ad eveniet sapiente impedit quae modi quo provident odit molestias! Rem reprehenderit assumenda &rdquo;
                            </p>
                        </blockquote>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BeforeWhyChooseUsSection;
