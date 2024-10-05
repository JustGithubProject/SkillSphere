import React from 'react';

const courses = [
  { id: 1, title: 'Веб-дизайн', image: 'img/cat-1.jpg', coursesCount: 100 },
  { id: 2, title: 'Розробка', image: 'img/cat-2.jpg', coursesCount: 100 },
  { id: 3, title: 'Дизайн ігор', image: 'img/cat-3.jpg', coursesCount: 100 },
  { id: 4, title: 'Дизайн додатків', image: 'img/cat-4.jpg', coursesCount: 100 },
  { id: 5, title: 'Маркетинг', image: 'img/cat-5.jpg', coursesCount: 100 },
  { id: 6, title: 'Дослідження', image: 'img/cat-6.jpg', coursesCount: 100 },
  { id: 7, title: 'Написання контенту', image: 'img/cat-7.jpg', coursesCount: 100 },
  { id: 8, title: 'SEO', image: 'img/cat-8.jpg', coursesCount: 100 }
];

const CoursesCategoryUA = () => {
  return (
    <div className="container-fluid py-5">
      <div className="container pt-5 pb-3">
        <div className="text-center mb-5">
          <h5 className="text-primary text-uppercase mb-3" style={{ letterSpacing: '5px' }}>Предмети</h5>
          <h1>Досліджуйте Топові Предмети</h1>
        </div>
        <div className="row">
          {courses.map(course => (
            <div key={course.id} className="col-lg-3 col-md-6 mb-4">
              <div className="cat-item position-relative overflow-hidden rounded mb-2">
                <img className="img-fluid" src={course.image} alt={course.title} />
                <a className="cat-overlay text-white text-decoration-none" href="#">
                  <h4 className="text-white font-weight-medium">{course.title}</h4>
                  <span>{course.coursesCount} Курсів</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CoursesCategoryUA;
