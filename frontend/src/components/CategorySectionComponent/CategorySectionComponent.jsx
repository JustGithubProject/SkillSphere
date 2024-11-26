import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';

const CategorySectionComponent = () => {
  const { t } = useTranslation(); 
  const BASE_URL = process.env.REACT_APP_API_URL;
  console.log("BASE_URL: ", BASE_URL);

  const [courses, setCourses] = useState([
    { id: 1, title: t('Web Design'), image: 'img/cat-1.jpg', coursesCount: 0, link: '/courses/web-design', category: 'web-design'},
    { id: 2, title: t('Development'), image: 'img/cat-2.jpg', coursesCount: 0, link: '/courses/development', category: 'development'},
    { id: 3, title: t('Game Design'), image: 'img/cat-3.jpg', coursesCount: 0, link: '/courses/game-design', category: 'game-design'},
    { id: 4, title: t('Apps Design'), image: 'img/cat-4.jpg', coursesCount: 0, link: '/courses/apps-design', category: 'apps-design'},
    { id: 5, title: t('Marketing'), image: 'img/cat-5.jpg', coursesCount: 0, link: '/courses/marketing', category: 'marketing'},
    { id: 6, title: t('Research'), image: 'img/cat-6.jpg', coursesCount: 0, link: '/courses/research', category: 'research'},
    { id: 7, title: t('Content Writing'), image: 'img/cat-7.jpg', coursesCount: 0, link: '/courses/content-writing', category: 'content-writing'},
    { id: 8, title: t('SEO'), image: 'img/cat-8.jpg', coursesCount: 0, link: '/courses/seo', category: 'seo'}
  ]);

  useEffect(() => {
    const fetchCoursesCounts = async () => {
      const updatedCourses = await Promise.all(
        courses.map(async (course) => {
          const coursesCount = await fetchAmountOfCoursesByCategory(course.category);
          return { ...course, coursesCount };
        })
      );
      setCourses(updatedCourses);
    };

    fetchCoursesCounts();
  }, []);

  const fetchAmountOfCoursesByCategory = async (categoryName) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/api/v1/course/no-auth/category/${categoryName}`
      );
      return response.data.length;
    } catch(error) {
      console.log("Failed to fetch courses by category", error);
      return 0;
    }
  }

  return (
    <div className="container-fluid py-5">
      <div className="container pt-5 pb-3">
        <div className="text-center mb-5">
          <h5 className="text-primary text-uppercase mb-3" style={{ letterSpacing: '5px' }}>
            {t('Subjects')}
          </h5>
          <h1>{t('Explore Top Subjects')}</h1>
        </div>
        <div className="row">
          {courses.map(course => (
            <div className="col-lg-3 col-md-6 mb-4" key={course.id}>
              <div className="cat-item position-relative overflow-hidden rounded mb-2">
                <img className="img-fluid" src={course.image} alt={course.title} />
                <a className="cat-overlay text-white text-decoration-none" href={course.link}>
                  <h4 className="text-white font-weight-medium">{course.title}</h4>
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

export default CategorySectionComponent;
