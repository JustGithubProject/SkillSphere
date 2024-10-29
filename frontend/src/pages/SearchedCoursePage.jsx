import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Card, Row, Col, Typography, Button, Spin } from 'antd';
import Cookies from 'js-cookie';
import axios from 'axios';
import Header from '../components/CoursesPageComponents/Header/Header';
import PayPalForm from '../components/Paypal/PaypalForm';
import { useTranslation } from 'react-i18next';

const { Meta } = Card;
const { Title } = Typography;

const SearchedCoursePage = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isAuthorized, setIsAuthorized] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState(null);
    const { t } = useTranslation(); 

    const [searchParams] = useSearchParams();
    const query = searchParams.get("q");

    const API_BASE = 'http://127.0.0.1:8000';

    useEffect(() => {
        const fetchCourses = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`${API_BASE}/api/v1/course?search=${query}`);
                setCourses(response.data);
            } catch (error) {
                console.error("Error fetching courses:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchCourses();
    }, [query]);

    useEffect(() => {
        const accessToken = Cookies.get("access_token");
        setIsAuthorized(Boolean(accessToken));
    }, []);

    const handleBuyCourse = (course) => setSelectedCourse(course);
    const handleCloseModal = () => setSelectedCourse(null);

    const handleViewCourse = (course_id, video_url) => {
        window.location.href = `/course-single/${course_id}?watch=${video_url}`;
    };

    return (
        <div style={{ minHeight: '100vh', padding: '20px' }}>
            <Header isCoursesPage={true} isHomePage={false} isPurchasedCoursesPage={false} />
            
            <Title level={2} style={{ color: '#FF6600', textAlign: 'center', marginBottom: '20px' }}>
                {`Search Results for "${query}"`}
            </Title>

            {loading ? (
                <Spin size="large" style={{ marginTop: '50px' }} />
            ) : (
                <Row gutter={[16, 16]} style={{ width: '100%', maxWidth: '1200px', margin: '0 auto' }}>
                    {courses.map((course) => (
                        <Col key={course.id} xs={24} sm={12} md={8} lg={6}>
                            <Card
                                hoverable
                                style={{ width: '100%', height: '100%' }}
                                bodyStyle={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}
                            >
                                <div style={{ flex: 1 }}>
                                    <Meta 
                                        title={course.title} 
                                        description={
                                            course.description.length > 100 ?
                                            course.description.slice(0, 100) + "..." :
                                            course.description || "No description available."
                                        }
                                    />
                                    <p>{t('Price')}: ${course.price}</p>
                                </div>
                                
                                <div style={{ marginTop: '16px' }}>
                                    {isAuthorized && (
                                        <Button
                                            type="primary"
                                            style={{ backgroundColor: 'rgb(255, 102, 0)', borderColor: 'rgb(255, 102, 0)', width: '100%', marginBottom: '8px' }}
                                            onClick={() => handleBuyCourse(course)}
                                        >
                                            {t('Buy Course')}
                                        </Button>
                                    )}
                                    <Button
                                        type="default"
                                        style={{ width: '100%' }}
                                        onClick={() => handleViewCourse(course.id, course.video_url)}
                                    >
                                        {t('View Course')}
                                    </Button>
                                </div>
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
                                <h5 className="modal-title">{t('Payment Details')}</h5>
                                <button type="button" className="close" onClick={handleCloseModal}>
                                    <span>&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <h5>{selectedCourse.title}</h5>
                                {selectedCourse && <p>{t('Price')}: ${selectedCourse.price}</p>}
                                <PayPalForm price={selectedCourse.price} course_id={selectedCourse.id} />
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>
                                    {t('Close')}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SearchedCoursePage;
