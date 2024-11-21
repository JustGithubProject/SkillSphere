import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import './PurchasedCourses.css';

import { EllipsisOutlined } from '@ant-design/icons';
import { Avatar, Card, Row, Col, Switch, Spin } from 'antd';

const PurchasedCoursesUA = () => {
    const [isAuthorized, setIsAuthorized] = useState(false);
    const [purchasedCourses, setPurchasedCourses] = useState([]);
    const [loading, setLoading] = useState(true);

    const BASE_URL = process.env.REACT_APP_API_URL;
    console.log("BASE_URL: ", BASE_URL);

    useEffect(() => {
        const fetchData = async () => {
            const accessToken = Cookies.get("access_token");
            if (accessToken) {
                setIsAuthorized(true);
                try {
                    const response = await axios.get(
                        `${BASE_URL}/api/v1/jwt/users/joined/courses`,
                        {
                            headers: {
                                'Authorization': `Bearer ${accessToken}`
                            }
                        }
                    );
                    setPurchasedCourses(response.data);
                } catch (error) {
                    console.error("Не вдалося отримати куплені курси:", error);
                }
            }
        };

        fetchData();
    }, []);

    const handleViewCourse = (course_id) => {
        window.location.href = `/full-course/${course_id}`
    }

    return (
        <div style={{ padding: '20px' }}>
            <Switch checked={!loading} onChange={(checked) => setLoading(!checked)} />
            {loading ? (
                <Spin size="large" tip="Loading courses..." />
            ) : (
                <Row gutter={[16, 16]} justify="center">
                    {purchasedCourses.map(course => (
                        <Col key={course.id} xs={24} sm={12} md={8} lg={6}>
                            <Card
                                loading={false}
                                actions={[
                                    <EllipsisOutlined key="edit" onClick={() => handleViewCourse(course.id)}>View</EllipsisOutlined>
                                ]}
                                style={{
                                    minWidth: 300,
                                }}
                            >
                                <Card.Meta
                                    avatar={<Avatar src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${course.id}`} />}
                                    title={course.title} 
                                    description={
                                        <>
                                            <p>{course.description.length > 50 ? course.description.substring(0, 50) : course.description}...</p> 
                                        </>
                                    }
                                />
                            </Card>
                        </Col>
                    ))}
                </Row>
            )}
        </div>
    );
};

export default PurchasedCoursesUA;
