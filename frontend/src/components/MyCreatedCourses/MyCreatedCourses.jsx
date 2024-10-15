import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';

const MyCreatedCourses = () => {
    const [isAuthorized, setIsAuthorized] = useState(false);
    const [myCreatedCourses, setMyCreatedCourses] = useState([]);

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
                        "http://127.0.0.1:8000/api/v1/course/my/created/courses/",
                        {
                            headers: {
                                'Authorization': `Bearer ${accessToken}`
                            }
                        }
                    );
                    setMyCreatedCourses(response.data);
                } catch (error) {
                    console.error("Failed to get purchased courses:", error);
                }
            }
        };

        fetchData();
    }, []);

    const styles = {
        container: {
            padding: '30px',
            fontFamily: "'Roboto', sans-serif",
            maxWidth: '1200px',
            margin: '0 auto',
            backgroundColor: '#f9fafb',
            borderRadius: '12px',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
        },
        header: {
            textAlign: 'center',
            marginBottom: '30px',
            fontSize: '2.5em',
            color: '#333',
            fontWeight: 'bold',
        },
        courseList: {
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '20px',
        },
        courseCard: {
            padding: '20px',
            backgroundColor: '#fff',
            border: '1px solid #e0e0e0',
            borderRadius: '10px',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            cursor: 'pointer',
            position: 'relative',
            overflow: 'hidden',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        },
        courseCardHover: {
            transform: 'translateY(-10px)',
            boxShadow: '0 12px 24px rgba(0, 0, 0, 0.15)',
        },
        title: {
            fontSize: '1.5em',
            marginBottom: '10px',
            color: '#FF6600',  
            fontWeight: 'bold',
        },
        description: {
            color: '#555',
            marginBottom: '20px',
            fontSize: '1em',
            lineHeight: '1.4',
        },
        price: {
            fontWeight: 'bold',
            color: '#28a745',
            fontSize: '1.2em',
            marginBottom: '20px',
        },
        button: {
            padding: '12px 20px',
            backgroundColor: '#FF6600',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            transition: 'background-color 0.3s ease, transform 0.3s ease',
            fontSize: '1em',
        },
        buttonHover: {
            backgroundColor: '#e05d00',
            transform: 'translateY(-2px)',
        },
        message: {
            textAlign: 'center',
            color: '#777',
            fontSize: '1.2em',
        },
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.header}>My Created Courses</h1>
            {isAuthorized ? (
                <div style={styles.courseList}>
                    {myCreatedCourses.map(course => (
                        <div 
                            key={course.id} 
                            style={styles.courseCard} 
                            onMouseEnter={e => e.currentTarget.style.transform = styles.courseCardHover.transform}
                            onMouseLeave={e => e.currentTarget.style.transform = 'none'}
                            onClick={() => handleEditCourse(course.id)}
                        >
                            <h2 style={styles.title}>{course.title}</h2>
                            <p style={styles.description}>
                                {course.description.length > 60 
                                    ? `${course.description.substring(0, 60)}...` 
                                    : course.description}
                            </p>
                            <button 
                                style={styles.button} 
                                onMouseOver={e => e.currentTarget.style.backgroundColor = styles.buttonHover.backgroundColor}
                                onMouseOut={e => e.currentTarget.style.backgroundColor = styles.button.backgroundColor}
                            >
                                Edit Course
                            </button>
                        </div>
                    ))}
                </div>
            ) : (
                <p style={styles.message}>Пожалуйста, войдите в систему для просмотра ваших курсов.</p>
            )}
        </div>
    );
};

export default MyCreatedCourses;
