import React from 'react';

const ProgramsSection = () => {
  return (
    <div className="site-section" id="programs-section">
      <div className="container">
        <div className="row mb-5 justify-content-center">
          <div className="col-lg-7 text-center" data-aos="fade-up">
            <h2 className="section-title">Our Programs</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magnam repellat aut neque! Doloribus sunt non aut reiciendis, vel recusandae obcaecati hic dicta repudiandae in quas quibusdam ullam, illum sed veniam!</p>
          </div>
        </div>
        <div className="row mb-5 align-items-center">
          <div className="col-lg-7 mb-5" data-aos="fade-up" data-aos-delay="100">
            <img src="images/undraw_youtube_tutorial.svg" alt="Image" className="img-fluid" />
          </div>
          <div className="col-lg-4 ml-auto" data-aos="fade-up" data-aos-delay="200">
            <h2 className="text-black mb-4">We Are Excellent In Education</h2>
            <p className="mb-4">Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem maxime nam porro possimus fugiat quo molestiae illo.</p>

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
