import React from 'react';

const CategorySectionComponent = () => {
  const categories = [
    { id: 1, name: 'Web Design', courses: 100, img: 'img/cat-1.jpg' },
    { id: 2, name: 'Development', courses: 100, img: 'img/cat-2.jpg' },
    { id: 3, name: 'Game Design', courses: 100, img: 'img/cat-3.jpg' },
    { id: 4, name: 'Apps Design', courses: 100, img: 'img/cat-4.jpg' },
    { id: 5, name: 'Marketing', courses: 100, img: 'img/cat-5.jpg' },
    { id: 6, name: 'Research', courses: 100, img: 'img/cat-6.jpg' },
    { id: 7, name: 'Content Writing', courses: 100, img: 'img/cat-7.jpg' },
    { id: 8, name: 'SEO', courses: 100, img: 'img/cat-8.jpg' },
  ];

  return (
    <div className="container-fluid py-5">
      <div className="container pt-5 pb-3">
        <div className="text-center mb-5">
          <h5 className="text-primary text-uppercase mb-3" style={{ letterSpacing: '5px' }}>
            Subjects
          </h5>
          <h1>Explore Top Subjects</h1>
        </div>
        <div className="row">
          {categories.map(category => (
            <div className="col-lg-3 col-md-6 mb-4" key={category.id}>
              <div className="cat-item position-relative overflow-hidden rounded mb-2">
                <img className="img-fluid" src={category.img} alt={category.name} />
                <a className="cat-overlay text-white text-decoration-none" href="#">
                  <h4 className="text-white font-weight-medium">{category.name}</h4>
                  <span>{category.courses} Courses</span>
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
