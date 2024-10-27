import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Col, Row, Card, Typography, Spin } from 'antd';
import axios from 'axios';

import HeaderEN from '../components/CoursesPageComponents/Header/HeaderEN';
import HeaderUA from '../components/CoursesPageComponents/Header/HeaderUA';

const { Title, Paragraph } = Typography;

const CourseCategoryCoursesPage = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
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

    return (
        <div style={{ padding: '20px' }}>
            {currentLanguage == 'en' ? <HeaderEN isCoursesPage={true} isHomePage={false} isPurchasedCoursesPage={false}/> : <HeaderUA isCoursesPage={true} isHomePage={false} isPurchasedCoursesPage={false}/>}
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
                            </Card>
                        </Col>
                    ))}
                </Row>
            )}
        </div>
    );
};

export default CourseCategoryCoursesPage;
