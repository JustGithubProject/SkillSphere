import React from 'react';

const teachers = [
  {
    name: 'John Doe',
    image: 'images/person_1.jpg',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora, neque!',
    facebook: '#',
    twitter: '#',
    linkedin: '#'
  },
];

const TeachersSection = () => {
  return (
    <div className="site-section bg-light" id="teachers-section">
      <div className="container">
        <div className="row mb-5 justify-content-center">
          <div className="col-lg-7 text-center" data-aos="fade-up">
            <h2 className="section-title">Meet Our Teachers</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magnam repellat aut neque! Doloribus sunt non aut reiciendis, vel recusandae obcaecati hic dicta repudiandae in quas quibusdam ullam, illum sed veniam!</p>
          </div>
        </div>
        <div className="row">
          {teachers.map((teacher, index) => (
            <div className="col-lg-4 mb-4" data-aos="fade-up" data-aos-delay="100" key={index}>
              <div className="teacher text-center">
                <img src={teacher.image} alt="Image" className="img-fluid rounded-circle mb-4" />
                <h3 className="mb-3">{teacher.name}</h3>
                <p>{teacher.description}</p>
                <div className="social">
                  <a href={teacher.facebook}><span className="icon-facebook"></span></a>
                  <a href={teacher.twitter}><span className="icon-twitter"></span></a>
                  <a href={teacher.linkedin}><span className="icon-linkedin"></span></a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeachersSection;
