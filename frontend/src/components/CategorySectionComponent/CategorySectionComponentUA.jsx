import React from 'react';

const CategorySectionComponentUA = () => {
  const courses = [
    { id: 1, title: 'Веб-дизайн', image: 'img/cat-1.jpg', coursesCount: 100, link: '/courses/web-design'},
    { id: 2, title: 'Розробка', image: 'img/cat-2.jpg', coursesCount: 100, link: '/courses/development'},
    { id: 3, title: 'Дизайн ігор', image: 'img/cat-3.jpg', coursesCount: 100, link: '/courses/game-design'},
    { id: 4, title: 'Дизайн додатків', image: 'img/cat-4.jpg', coursesCount: 100, link: '/courses/apps-design'},
    { id: 5, title: 'Маркетинг', image: 'img/cat-5.jpg', coursesCount: 100, link: '/courses/marketing'},
    { id: 6, title: 'Дослідження', image: 'img/cat-6.jpg', coursesCount: 100, link: '/courses/research'},
    { id: 7, title: 'Написання контенту', image: 'img/cat-7.jpg', coursesCount: 100, link: '/courses/content-writing'},
    { id: 8, title: 'SEO', image: 'img/cat-8.jpg', coursesCount: 100, link: '/courses/seo'}
  ];

  return (
    <div className="container-fluid py-5">
      <div className="container pt-5 pb-3">
        <div className="text-center mb-5">
          <h5 className="text-primary text-uppercase mb-3" style={{ letterSpacing: '5px' }}>
            Теми
          </h5>
          <h1>Досліджуйте найкращі теми</h1>
        </div>
        <div className="row">
          {courses.map(course => (
            <div className="col-lg-3 col-md-6 mb-4" key={course.id}>
              <div className="cat-item position-relative overflow-hidden rounded mb-2">
                <img className="img-fluid" src={course.image} alt={course.title} />
                <a className="cat-overlay text-white text-decoration-none" href={course.link}>
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

export default CategorySectionComponentUA;
