import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Col, Row, Card, Typography, Spin, Button, Pagination } from 'antd';
import Cookies from 'js-cookie';
import axios from 'axios';
import { useTranslation } from 'react-i18next';

import Header from '../components/CoursesPageComponents/Header/Header';
import PayPalForm from '../components/Paypal/PaypalForm';

import '../components/CoursesPageComponents/SetCourses/SetCourses.css';

const { Title, Paragraph } = Typography;

const CourseCategoryCoursesPage = () => {
    const { t } = useTranslation();
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isAuthorized, setIsAuthorized] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState(null);
    
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(8); 

    const { categoryName } = useParams();
    

    const BASE_URL = process.env.REACT_APP_API_URL;
    console.log("BASE_URL: ", BASE_URL);

    // Fetch courses by category
    useEffect(() => {
        const fetchCoursesByCategory = async () => {
            setLoading(true);
            try {
                const response = await axios.get(
                    `${BASE_URL}/api/v1/course/no-auth/category/${categoryName}`
                );
                setCourses(response.data);
            } catch (error) {
                console.error(t("Error fetching courses:"), error);
            } finally {
                setLoading(false);
            }
        };
        fetchCoursesByCategory();
    }, [categoryName, t]);

    // Check user authorization status
    useEffect(() => {
        const accessToken = Cookies.get("access_token");
        setIsAuthorized(Boolean(accessToken));
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

    const handlePageChange = (page, pageSize) => {
        setCurrentPage(page);
        setPageSize(pageSize);
    };

    // Paginate the courses array
    const paginatedCourses = courses.slice((currentPage - 1) * pageSize, currentPage * pageSize);

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            minHeight: '100vh',
            padding: '20px',
            textAlign: 'center',
            position: 'relative',
        }}>
            <Header isCoursesPage={true} isHomePage={false} isPurchasedCoursesPage={false} />
            
            {/* Category Title with Elegant Styling */}
            <div style={{
                width: '100%',
                padding: '80px 0',
                background: 'rgba(0, 0, 0, 0.3)',  // Subtle background overlay
                textAlign: 'center',
                backdropFilter: 'blur(10px)', // Soft blur effect
                marginBottom: '30px',
            }}>
                <Title 
                    level={2} 
                    style={{
                        color: '#fff',
                        fontWeight: 'bold',
                        fontSize: '42px',
                        letterSpacing: '1px',
                        textTransform: 'uppercase',
                        textShadow: '2px 2px 5px rgba(0, 0, 0, 0.4)', // Soft shadow for better contrast
                        marginBottom: '10px',
                    }}
                >
                    {categoryName === 'web-design' ? t('Web Design') : null}
                    {categoryName === 'development' ? t('Development') : null}
                    {categoryName === 'game-design' ? t('Game Design') : null}
                    {categoryName === 'apps-design' ? t('Apps Design') : null}
                    {categoryName === 'marketing' ? t('Marketing') : null}
                    {categoryName === 'research' ? t('Research') : null}
                    {categoryName === "content-writing" ? t('Content Writing') : null}
                    {categoryName === "seo" ? t('SEO') : null}
                </Title>
                <div style={{
                    width: '60px',
                    height: '4px',
                    backgroundColor: '#FF6600',
                    margin: '10px auto',
                }}></div> {/* Underline with color accent */}
            </div>

            {loading ? (
                <Spin size="large" style={{ marginTop: '50px' }} />
            ) : (
                <>
                    {courses.length > 0 ? (
                        <>
                            <Row gutter={[16, 16]} style={{ width: '100%', maxWidth: '1200px' }}>
                                {paginatedCourses.map(course => (
                                    <Col xs={24} sm={12} md={8} lg={6} key={course.id}>
                                        <Card
                                            hoverable
                                            title={course.title}
                                            style={{ height: '100%' }}
                                        >
                                            <Paragraph ellipsis={{ rows: 2 }}>
                                                {course.description || t('No description available.')}
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
                                    </Col>
                                ))}
                            </Row>
                            
                            {/* Pagination Component */}
                            <Pagination
                                current={currentPage}
                                pageSize={pageSize}
                                total={courses.length}
                                onChange={handlePageChange}
                                style={{ marginTop: '20px' }}
                            />
                        </>
                    ) : (
                        <div style={{
                            marginTop: '50px',
                            color: '#999',
                            fontSize: '18px',
                            textAlign: 'center',
                        }}>
                            {t('Unfortunately, there are no available courses in this category.')}
                        </div>
                    )}
                </>
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
                                <p>{t('Price')}: ${selectedCourse.price}</p>
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

export default CourseCategoryCoursesPage;
