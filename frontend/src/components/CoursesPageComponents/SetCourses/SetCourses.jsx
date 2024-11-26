import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PayPalForm from '../../Paypal/PaypalForm';
import Cookies from 'js-cookie';
import { useTranslation } from 'react-i18next';
import { Card, Button, Typography } from 'antd';
import './SetCourses.css';

const { Paragraph, Title } = Typography;

const SetCourses = () => {
  const { t } = useTranslation(); 
  const [courses, setCourses] = useState([]);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);

  const BASE_URL = process.env.REACT_APP_API_URL;
  console.log("BASE_URL: ", BASE_URL);

  useEffect(() => {
    axios.get(`${BASE_URL}/api/v1/course/all/no-auth/`)
      .then(response => {
        const fetchedCourses = response.data.map(course => ({
          id: course.id,
          title: course.title,
          description: course.description || t('No description available.'),
          students: course.students.length,
          video_url: course.video_url,
          duration: '01h 30m', 
          rating: 4.5, 
          reviews: 250, 
          price: course.price
        }));
        setCourses(fetchedCourses.slice(0, 3));
      })
      .catch(error => {
        console.error('Error fetching courses:', error);
      });
  }, [BASE_URL, t]);

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
              <Card
                hoverable
                title={course.title}
                style={{ height: '100%' }}
                className="flex-grow-1"
              >
                <Paragraph ellipsis={{ rows: 2 }}>
                  {course.description}
                </Paragraph>
                <Title level={5}>{t('Price')}: ${course.price}</Title>
                
                {isAuthorized && (
                  <Button
                    type="primary"
                    className="w-100 mb-2"
                    onClick={() => handleBuyCourse(course)}
                    style={{ backgroundColor: 'rgb(255, 102, 0)', borderColor: 'rgb(255, 102, 0)' }}
                  >
                    {t('Buy Course')}
                  </Button>
                )}
                
                <Button
                  type="default"
                  className="w-100"
                  onClick={() => handleViewCourse(course.id, course.video_url)}
                >
                  {t('View Course')}
                </Button>
              </Card>
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
                <p>{t('Price')}: ${selectedCourse.price}</p>
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
