import React from 'react';

import PayPalForm from '../../Paypal/PaypalForm';

const courses = [
  { id: 1, title: 'Web design & development courses for beginner', image: 'img/course-1.jpg', students: 25, duration: '01h 30m', rating: 4.5, reviews: 250, price: '$99' },
  { id: 2, title: 'Web design & development courses for beginner', image: 'img/course-2.jpg', students: 25, duration: '01h 30m', rating: 4.5, reviews: 250, price: '$99' },
  { id: 3, title: 'Web design & development courses for beginner', image: 'img/course-3.jpg', students: 25, duration: '01h 30m', rating: 4.5, reviews: 250, price: '$99' },
  { id: 4, title: 'Web design & development courses for beginner', image: 'img/course-4.jpg', students: 25, duration: '01h 30m', rating: 4.5, reviews: 250, price: '$99' },
  { id: 5, title: 'Web design & development courses for beginner', image: 'img/course-5.jpg', students: 25, duration: '01h 30m', rating: 4.5, reviews: 250, price: '$99' },
  { id: 6, title: 'Web design & development courses for beginner', image: 'img/course-6.jpg', students: 25, duration: '01h 30m', rating: 4.5, reviews: 250, price: '$99' }
];

const SetCourses = () => {
  return (
    <div className="container-fluid py-5">
      <div className="container py-5">
        <div className="text-center mb-5">
          <h5 className="text-primary text-uppercase mb-3" style={{ letterSpacing: '5px' }}>Courses</h5>
          <h1>Our Popular Courses</h1>
        </div>
        <div className="row">
          {courses.map(course => (
            <div key={course.id} className="col-lg-4 col-md-6 mb-4">
              <div className="rounded overflow-hidden mb-2">
                <img className="img-fluid" src={course.image} alt={course.title} />
                <div className="bg-secondary p-4">
                  <div className="d-flex justify-content-between mb-3">
                    <small className="m-0"><i className="fa fa-users text-primary mr-2"></i>{course.students} Students</small>
                    <small className="m-0"><i className="far fa-clock text-primary mr-2"></i>{course.duration}</small>
                  </div>
                  <a className="h5" href="#">{course.title}</a>
                  <div className="border-top mt-4 pt-4">
                    <div className="d-flex justify-content-between">
                      <h6 className="m-0"><i className="fa fa-star text-primary mr-2"></i>{course.rating} <small>({course.reviews})</small></h6>
                      <h5 className="m-0">{course.price}</h5>
                    </div>
                    <div>
                      <PayPalForm price={course.price} course_id={course.id}/>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SetCourses;
