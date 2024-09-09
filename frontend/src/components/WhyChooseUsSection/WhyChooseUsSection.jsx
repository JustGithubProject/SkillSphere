import React from 'react';

const WhyChooseUsSection = () => {
  return (
    <div className="site-section pb-0">
      <div className="future-blobs">
        <div className="blob_2">
          <img src="images/blob_2.svg" alt="Image" />
        </div>
        <div className="blob_1">
          <img src="images/blob_1.svg" alt="Image" />
        </div>
      </div>
      <div className="container">
        <div
          className="row mb-5 justify-content-center"
          data-aos="fade-up"
          data-aos-delay=""
        >
          <div className="col-lg-7 text-center">
            <h2 className="section-title">Why Choose Us</h2>
          </div>
        </div>
        <div className="row">
          <div
            className="col-lg-4 ml-auto align-self-start"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            <div className="p-4 rounded bg-white why-choose-us-box">
              <div className="d-flex align-items-center custom-icon-wrap custom-icon-light mb-3">
                <div className="mr-3">
                  <span className="custom-icon-inner">
                    <span className="icon icon-graduation-cap"></span>
                  </span>
                </div>
                <div>
                  <h3 className="m-0">22,931 Yearly Graduates</h3>
                </div>
              </div>
              <div className="d-flex align-items-center custom-icon-wrap custom-icon-light mb-3">
                <div className="mr-3">
                  <span className="custom-icon-inner">
                    <span className="icon icon-university"></span>
                  </span>
                </div>
                <div>
                  <h3 className="m-0">150 Universities Worldwide</h3>
                </div>
              </div>
              <div className="d-flex align-items-center custom-icon-wrap custom-icon-light mb-3">
                <div className="mr-3">
                  <span className="custom-icon-inner">
                    <span className="icon icon-graduation-cap"></span>
                  </span>
                </div>
                <div>
                  <h3 className="m-0">Top Professionals in The World</h3>
                </div>
              </div>
              <div className="d-flex align-items-center custom-icon-wrap custom-icon-light mb-3">
                <div className="mr-3">
                  <span className="custom-icon-inner">
                    <span className="icon icon-university"></span>
                  </span>
                </div>
                <div>
                  <h3 className="m-0">Expand Your Knowledge</h3>
                </div>
              </div>
              <div className="d-flex align-items-center custom-icon-wrap custom-icon-light mb-3">
                <div className="mr-3">
                  <span className="custom-icon-inner">
                    <span className="icon icon-graduation-cap"></span>
                  </span>
                </div>
                <div>
                  <h3 className="m-0">Best Online Teaching Assistant Courses</h3>
                </div>
              </div>
              <div className="d-flex align-items-center custom-icon-wrap custom-icon-light">
                <div className="mr-3">
                  <span className="custom-icon-inner">
                    <span className="icon icon-university"></span>
                  </span>
                </div>
                <div>
                  <h3 className="m-0">Best Teachers</h3>
                </div>
              </div>
            </div>
          </div>
          <div
            className="col-lg-7 align-self-end"
            data-aos="fade-left"
            data-aos-delay="200"
          >
            <img
              src="images/person_transparent.png"
              alt="Image"
              className="img-fluid"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhyChooseUsSection;
