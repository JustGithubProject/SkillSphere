import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import { EditOutlined } from '@ant-design/icons';
import { Avatar, Card, Row, Col, Switch, Spin } from 'antd';

const MyCreatedCoursesV2 = () => {
    const [isAuthorized, setIsAuthorized] = useState(false);
    const [myCreatedCourses, setMyCreatedCourses] = useState([]);
    const [loading, setLoading] = useState(true);

    const BASE_URL = process.env.REACT_APP_API_URL;
    console.log("BASE_URL: ", BASE_URL);

    const handleEditCourse = (course_id) => {
        window.location.href = `/edit-course/${course_id}`;
    }

    useEffect(() => {
        const fetchData = async () => {
            const accessToken = Cookies.get("access_token");
            if (accessToken) {
                setIsAuthorized(true);
                try {
                    const response = await axios.get(
                        `${BASE_URL}/api/v1/course/my/created/courses/`,
                        {
                            headers: {
                                'Authorization': `Bearer ${accessToken}`
                            }
                        }
                    );
                    setMyCreatedCourses(response.data);
                } catch (error) {
                    console.error("Failed to get created courses:", error);
                } finally {
                    setLoading(false); 
                }
            } else {
                setLoading(false); 
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
                    {myCreatedCourses.map(course => (
                        <Col key={course.id} xs={24} sm={12} md={8} lg={6}>
                            <Card
                                loading={false}
                                actions={[
                                    <EditOutlined key="edit" onClick={() => handleEditCourse(course.id)}>Edit</EditOutlined>
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

export default MyCreatedCoursesV2;
