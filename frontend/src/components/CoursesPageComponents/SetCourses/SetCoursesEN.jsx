import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PayPalForm from '../../Paypal/PaypalForm';

import Cookies from 'js-cookie';

const SetCoursesEN = () => {
  const [courses, setCourses] = useState([]);
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/v1/course/all/no-auth/')
      .then(response => {
        const fetchedCourses = response.data.map(course => ({
          id: course.id,
          title: course.title,
          image: course.photo_url,
          students: course.students.length,
          duration: '01h 30m', 
          rating: 4.5, 
          reviews: 250, 
          price: `$${course.price}`
        }));
        setCourses(fetchedCourses);
      })
      .catch(error => {
        console.error('Error fetching courses:', error);
      });
  }, []);

  useEffect(() => {
    const accessToken = Cookies.get("access_token");
    if (accessToken) {
      setIsAuthorized(true);
    }
  }, []); 

  const handleViewCourse = (course_id) => {
      window.location.href = `/course-single/${course_id}`
  };

  console.log(courses);

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
              <img
                className="img-fluid"
                src={`http://127.0.0.1:8080${course.image}`}
                alt={course.title}
              />
              
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
                    {isAuthorized ? (
                      <div>
                        <PayPalForm price={course.price} course_id={course.id}/>
                      </div>
                    ) : null}
                    <button className="btn btn-primary mt-3" onClick={() => handleViewCourse(course.id)}>View Course</button>
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

export default SetCoursesEN;
