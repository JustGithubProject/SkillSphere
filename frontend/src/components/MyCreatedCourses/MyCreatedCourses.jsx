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
            fontFamily: 'Arial, sans-serif',
            maxWidth: '900px',
            margin: '0 auto',
            backgroundColor: '#f3f4f6',
            borderRadius: '12px',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
        },
        header: {
            textAlign: 'center',
            marginBottom: '25px',
            fontSize: '2em',
            color: '#333',
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
            transition: 'transform 0.2s, box-shadow 0.2s',
            cursor: 'pointer',
            position: 'relative',
            overflow: 'hidden',
        },
        courseCardHover: {
            transform: 'scale(1.05)',
            boxShadow: '0 8px 20px rgba(0, 0, 0, 0.15)',
        },
        title: {
            fontSize: '1.5em',
            marginBottom: '10px',
            color: '#FF6600',  
        },
        description: {
            color: '#555',
            marginBottom: '10px',
            fontSize: '1em',
        },
        price: {
            fontWeight: 'bold',
            color: '#28a745',
            fontSize: '1.2em',
            marginBottom: '10px',
        },
        button: {
            padding: '12px 20px',
            backgroundColor: '#FF6600',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            transition: 'background-color 0.3s, transform 0.3s',
            fontSize: '1em',
        },
        buttonHover: {
            backgroundColor: '#FF6600',
            transform: 'scale(1.05)',
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
                        >
                            <h2 style={styles.title}>{course.title}</h2>
                            <p style={styles.description}>
                                {course.description.length > 30 
                                    ? `${course.description.substring(0, 30)}...` 
                                    : course.description}
                            </p>
                            <button 
                                style={styles.button} 
                                onMouseOver={e => e.currentTarget.style.backgroundColor = styles.buttonHover.backgroundColor}
                                onMouseOut={e => e.currentTarget.style.backgroundColor = styles.button.backgroundColor}
                                onClick={() => handleEditCourse(course.id)}
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
