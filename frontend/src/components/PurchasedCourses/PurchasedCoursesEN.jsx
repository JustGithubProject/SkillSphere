import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import { EditOutlined } from '@ant-design/icons';
import { Avatar, Card, Row, Col, Switch, Spin } from 'antd';

import './PurchasedCourses.css';

const PurchasedCoursesEN = () => {
    const [isAuthorized, setIsAuthorized] = useState(false);
    const [purchasedCourses, setPurchasedCourses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            const accessToken = Cookies.get("access_token");
            if (accessToken) {
                setIsAuthorized(true);
                try {
                    const response = await axios.get(
                        "http://127.0.0.1:8000/api/v1/jwt/users/joined/courses",
                        {
                            headers: {
                                'Authorization': `Bearer ${accessToken}`
                            }
                        }
                    );
                    setPurchasedCourses(response.data);
                } catch (error) {
                    console.error("Failed to get purchased courses:", error);
                }
            }
        };

        fetchData();
    }, []);


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

export default PurchasedCoursesEN;
