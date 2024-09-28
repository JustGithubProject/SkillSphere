import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import './PurchasedCourses.css';

const PurchasedCourses = () => {
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
                    console.error("Failed to get purchased courses:", error);
                }
            }
        };

        fetchData();
    }, []);

    return (
        <div className="purchased-courses">
            <h1>Купленные курсы</h1>
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
                <p>Пожалуйста, войдите в систему для просмотра ваших курсов.</p>
            )}
        </div>
    );
};

export default PurchasedCourses;
