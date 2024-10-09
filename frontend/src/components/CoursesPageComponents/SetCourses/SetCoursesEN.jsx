import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PayPalForm from '../../Paypal/PaypalForm';
import Cookies from 'js-cookie';
import './SetCoursesEN.css';

const SetCoursesEN = () => {
  const [courses, setCourses] = useState([]);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [showPayPalForm, setShowPayPalForm] = useState({ visible: false, price: null, courseId: null });

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/v1/course/all/no-auth/')
      .then(response => {
        const fetchedCourses = response.data.map(course => ({
          id: course.id,
          title: course.title,
          image: course.photo_url,
          students: course.students.length,
          video_url: course.video_url,
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

  const handleViewCourse = (course_id, video_url) => {
    window.location.href = `/course-single/${course_id}?watch=${video_url}`;
  };

  const handleBuyCourse = (price, courseId) => {
    setShowPayPalForm({ visible: true, price, courseId });
  };

  const handleClosePayPalForm = () => {
    setShowPayPalForm({ visible: false, price: null, courseId: null });
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
              <div className="course-card rounded overflow-hidden mb-2">
                <img
                  className="img-fluid"
                  src={`http://127.0.0.1:8080${course.image}`}
                  alt={course.title}
                />
                <div className="bg-secondary p-4 d-flex flex-column justify-content-between">
                  <div>
                    <div className="d-flex justify-content-between mb-3">
                      <small className="m-0"><i className="fa fa-users text-primary mr-2"></i>{course.students} Students</small>
                      <small className="m-0"><i className="far fa-clock text-primary mr-2"></i>{course.duration}</small>
                    </div>
                    <a className="h5" href="#">{course.title}</a>
                  </div>
                  <div className="border-top mt-4 pt-4">
                    <div className="d-flex justify-content-between">
                      <h6 className="m-0"><i className="fa fa-star text-primary mr-2"></i>{course.rating} <small>({course.reviews})</small></h6>
                      <h5 className="m-0">{course.price}</h5>
                    </div>
                    {isAuthorized && (
                      <button
                        className="btn btn-success mt-3"
                        onClick={() => handleBuyCourse(course.price, course.id)}
                      >
                        Buy Course
                      </button>
                    )}
                    <button className="btn btn-primary mt-3" onClick={() => handleViewCourse(course.id, course.video_url)}>View Course</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {showPayPalForm.visible && (
        <div className="modal" style={{ display: 'block' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Payment Details</h5>
                <button type="button" className="close" onClick={handleClosePayPalForm}>&times;</button>
              </div>
              <div className="modal-body">
                <p>Total Price: {showPayPalForm.price}</p>
                <PayPalForm price={showPayPalForm.price} course_id={showPayPalForm.courseId} />
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={handleClosePayPalForm}>Close</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SetCoursesEN;
