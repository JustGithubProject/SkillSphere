import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PayPalForm from '../../Paypal/PaypalForm';
import Cookies from 'js-cookie';
import { useTranslation } from 'react-i18next';
import './SetCourses.css'; 

const SetCourses = () => {
  const { t } = useTranslation(); 
  const [courses, setCourses] = useState([]);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);

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
        setCourses(fetchedCourses.slice(0, 3));
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

  const handleBuyCourse = (course) => {
    setSelectedCourse(course);
  };

  const handleCloseModal = () => {
    setSelectedCourse(null);
  };

  return (
    <div className="container-fluid py-5">
      <div className="container py-5">
        <div className="text-center mb-5">
          <h5 className="text-primary text-uppercase mb-3" style={{ letterSpacing: '5px' }}>{t('Courses')}</h5>
          <h1>{t('Our Popular Courses')}</h1>
        </div>
        <div className="row">
          {courses.map(course => (
            <div key={course.id} className="col-lg-4 col-md-6 mb-4 d-flex">
              <div className="card course-card">
                <img
                  className="card-img-top"
                  src={`http://127.0.0.1:8080${course.image}`}
                  alt={course.title}
                />
                <div className="card-body d-flex flex-column">
                  <div className="mb-3 flex-grow-1">
                    <div className="d-flex justify-content-between mb-2">
                      <small className="text-muted"><i className="fa fa-users text-primary mr-2"></i>{course.students} {t('Students')}</small>
                      <small className="text-muted"><i className="far fa-clock text-primary mr-2"></i>{course.duration}</small>
                    </div>
                    <h5 className="card-title">{course.title}</h5>
                  </div>
                  <div className="mt-auto">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <h6 className="mb-0"><i className="fa fa-star text-primary mr-2"></i>{course.rating} <small>({course.reviews})</small></h6>
                      <h5 className="mb-0">{course.price}</h5>
                    </div>
                    {isAuthorized ? (
                      <button className="btn btn-success w-100 mb-2" onClick={() => handleBuyCourse(course)}>{t('Buy Course')}</button>
                    ) : null}
                    <button className="btn btn-primary w-100" onClick={() => handleViewCourse(course.id, course.video_url)}>{t('View Course')}</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedCourse && (
        <div className="modal show" style={{ display: 'block' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{t('Payment Details')}</h5>
                <button type="button" className="close" onClick={handleCloseModal}>
                  <span>&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <h5>{selectedCourse.title}</h5>
                <p>{t('Price')}: {selectedCourse.price}</p>
                <PayPalForm price={selectedCourse.price} course_id={selectedCourse.id} />
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>{t('Close')}</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SetCourses;
