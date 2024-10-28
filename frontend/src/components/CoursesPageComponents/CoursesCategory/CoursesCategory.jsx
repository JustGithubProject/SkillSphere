import React from 'react';
import { useTranslation } from 'react-i18next';

const courses = [
  { id: 1, title: 'Web Design', image: 'img/cat-1.jpg', coursesCount: 100, link: '/courses/web-design'},
  { id: 2, title: 'Development', image: 'img/cat-2.jpg', coursesCount: 100, link: '/courses/development'},
  { id: 3, title: 'Game Design', image: 'img/cat-3.jpg', coursesCount: 100, link: '/courses/game-design'},
  { id: 4, title: 'Apps Design', image: 'img/cat-4.jpg', coursesCount: 100, link: '/courses/apps-design'},
  { id: 5, title: 'Marketing', image: 'img/cat-5.jpg', coursesCount: 100, link: '/courses/marketing'},
  { id: 6, title: 'Research', image: 'img/cat-6.jpg', coursesCount: 100, link: '/courses/research'},
  { id: 7, title: 'Content Writing', image: 'img/cat-7.jpg', coursesCount: 100, link: '/courses/content-writing'},
  { id: 8, title: 'SEO', image: 'img/cat-8.jpg', coursesCount: 100, link: '/courses/seo'}
];

const CoursesCategory = () => {
  const { t } = useTranslation(); 

  return (
    <div className="container-fluid py-5">
      <div className="container pt-5 pb-3">
        <div className="text-center mb-5">
          <h5 className="text-primary text-uppercase mb-3" style={{ letterSpacing: '5px' }}>{t('Subjects')}</h5>
          <h1>{t('Explore Top Subjects')}</h1>
        </div>
        <div className="row">
          {courses.map(course => (
            <div key={course.id} className="col-lg-3 col-md-6 mb-4">
              <div className="cat-item position-relative overflow-hidden rounded mb-2">
                <img className="img-fluid" src={course.image} alt={course.title} />
                <a className="cat-overlay text-white text-decoration-none" href={course.link}>
                  <h4 className="text-white font-weight-medium">{t(course.title)}</h4>
                  <span>{course.coursesCount} {t('Courses')}</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CoursesCategory;
