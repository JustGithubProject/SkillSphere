import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Col, Row, Card, Typography, Spin, Button } from 'antd';
import Cookies from 'js-cookie';

import Header from '../components/CoursesPageComponents/Header/Header';
import PayPalForm from '../components/Paypal/PaypalForm';

import axios from 'axios';

import '../components/CoursesPageComponents/SetCourses/SetCoursesEN.css';

const { Title, Paragraph } = Typography;

const CourseCategoryCoursesPage = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isAuthorized, setIsAuthorized] = useState();
    const [selectedCourse, setSelectedCourse] = useState(null);

    const { categoryName } = useParams();

    const [currentLanguage, setCurrentLanguage] = useState('en');

    useEffect(() => {
        const currentLang = localStorage.getItem("language_key");
        setCurrentLanguage(currentLang);
    }, []); 

    useEffect(() => {
        const fetchCoursesByCategory = async () => {
            setLoading(true);
            try {
                const response = await axios.get(
                    `http://127.0.0.1:8000/api/v1/course/no-auth/category/${categoryName}`
                );
                setCourses(response.data);
            } catch (error) {
                console.error("Error fetching courses:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchCoursesByCategory();
    }, [categoryName]);

    useEffect(() => {
        const accessToken = Cookies.get("access_token");
        if (accessToken) {
          setIsAuthorized(true);
        }
    }, []); 

    const handleBuyCourse = (course) => {
        setSelectedCourse(course);
    };
    
      const handleCloseModal = () => {
        setSelectedCourse(null);
    };

    const handleViewCourse = (course_id, video_url) => {
        window.location.href = `/course-single/${course_id}?watch=${video_url}`;
    };

    return (
        <div style={{ padding: '20px' }}>
            <Header isCoursesPage={true} isHomePage={false} isPurchasedCoursesPage={false}/>
            <Title level={2} style={{ textAlign: 'center', marginBottom: '20px', color: '#FF6600'}}>
                "{categoryName}" 
            </Title>

            {loading ? (
                <Spin size="large" style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }} />
            ) : (
                <Row gutter={[16, 16]}>
                    {courses.map(course => (
                        <Col xs={24} sm={12} md={8} lg={6} key={course.id}>
                            <Card
                                hoverable
                                title={course.title}
                                style={{ height: '100%' }}
                            >
                                <Paragraph ellipsis={{ rows: 2 }}>
                                    {course.description || 'No description available.'}
                                </Paragraph>
                                <Title level={5}>Price: ${course.price}</Title>
                                {isAuthorized ? (
                                    <Button 
                                            type="primary" 
                                            className="w-100 mb-2" 
                                            onClick={() => handleBuyCourse(course)}
                                            style={{ backgroundColor: 'rgb(255, 102, 0)', borderColor: 'rgb(255, 102, 0)' }}
                                    >
                                            Buy Course
                                    </Button>
                                ) : null}
                                    <Button 
                                        type="default" 
                                        className="w-100" 
                                        onClick={() => handleViewCourse(course.id, course.video_url)}
                                    >
                                        View Course
                                    </Button>
                            </Card>
                        </Col>
                    ))}
                </Row>
            )}
        {selectedCourse && (
            <div className="modal show" style={{ display: 'block' }}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Payment Details</h5>
                            <button type="button" className="close" onClick={handleCloseModal}>
                            <span>&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <h5>{selectedCourse.title}</h5>
                            <p>Price: {selectedCourse.price}</p>
                            <PayPalForm price={`$${selectedCourse.price}`} course_id={selectedCourse.id} />
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>Close</button>
                        </div>
                    </div>
                </div>
            </div>
      )}
        </div>
    );
};

export default CourseCategoryCoursesPage;
