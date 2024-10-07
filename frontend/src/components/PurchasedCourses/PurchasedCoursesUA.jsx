import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import './PurchasedCourses.css';

const PurchasedCoursesUA = () => {
    const [isAuthorized, setIsAuthorized] = useState(false);
    const [purchasedCourses, setPurchasedCourses] = useState([]);
    
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
                    console.error("Не вдалося отримати куплені курси:", error);
                }
            }
        };

        fetchData();
    }, []);

    return (
        <div className="purchased-courses">
            <h1>Куплені курси</h1>
            {isAuthorized ? (
                <div className="course-list">
                    {purchasedCourses.map(course => (
                        <div key={course.id} className="course-card">
                            <h2>{course.title}</h2>
                            <p>
                                {course.description.length > 30 
                                    ? `${course.description.substring(0, 30)}...` 
                                    : course.description}
                            </p>
                            <span className="course-price">{course.price}$</span>
                        </div>
                    ))}
                </div>
            ) : (
                <p>Будь ласка, увійдіть в систему, щоб переглянути ваші курси.</p>
            )}
        </div>
    );
};

export default PurchasedCoursesUA;
