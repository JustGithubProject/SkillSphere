import React from 'react';

const ProgramsSection = () => {
  return (
    <div className="site-section" id="programs-section">
      <div className="container">
        <div className="row mb-5 justify-content-center">
          <div className="col-lg-7 text-center" data-aos="fade-up">
            <h2 className="section-title">Our Programs</h2>
            <p>
              Our programs are designed to offer comprehensive learning experiences tailored to meet your needs.
              From foundational courses to advanced training, we provide a range of options to help you achieve your goals.
              Our curriculum is crafted by experts and continuously updated to reflect the latest industry trends.
              Whether you're looking to start a new career or enhance your skills, our programs are here to support your journey.
            </p>
          </div>
        </div>
        <div className="row mb-5 align-items-center">
          <div className="col-lg-7 mb-5" data-aos="fade-up" data-aos-delay="100">
            <img src="images/undraw_youtube_tutorial.svg" alt="Image" className="img-fluid" />
          </div>
          <div className="col-lg-4 ml-auto" data-aos="fade-up" data-aos-delay="200">
            <h2 className="text-black mb-4">We Are Excellent In Education</h2>
            <p className="mb-4">
              Our commitment to education excellence sets us apart.
              We strive to deliver exceptional learning experiences through innovative teaching
              methods and a deep understanding of educational principles. 
              Our dedicated team of educators is focused on providing high-quality
              instruction that meets the highest standards, ensuring that every student
              receives the support and knowledge they need to excel.
            </p>
            <div className="d-flex align-items-center custom-icon-wrap mb-3">
              <span className="custom-icon-inner mr-3"><span className="icon icon-graduation-cap"></span></span>
              <div><h3 className="m-0">22,931 Yearly Graduates</h3></div>
            </div>

            <div className="d-flex align-items-center custom-icon-wrap mb-3">
              <span className="custom-icon-inner mr-3"><span className="icon icon-heart"></span></span>
              <div><h3 className="m-0">1,439 Happy Students</h3></div>
            </div>

            <div className="d-flex align-items-center custom-icon-wrap">
              <span className="custom-icon-inner mr-3"><span className="icon icon-lightbulb"></span></span>
              <div><h3 className="m-0">3,982 Professional Trainers</h3></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgramsSection;
