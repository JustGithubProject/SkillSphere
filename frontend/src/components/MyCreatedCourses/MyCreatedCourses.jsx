import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';


const MyCreatedCourses = () => {
    const [isAuthorized, setIsAuthorized] = useState(false);
    const [myCreatedCourses, setMyCreatedCourses] = useState([]);
    const [isModuleFormOpened, setIsModuleFormOpened] = useState(false);

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const handleAddModule = () => {
        if (isModuleFormOpened) {
            setIsModuleFormOpened(false);
        } else {
            setIsModuleFormOpened(true);
        }
    }

    const handleAddModuleForm = async (event, course_id) => {
        event.preventDefault();
        const accessToken = Cookies.get("access_token");
        const response = await axios.post(
            'http://127.0.0.1:8000/api/v1/module/',
            {
                title: title,
                description: description,
                course_id: course_id
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                }
            }
        )
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

    return (
        <div className="purchased-courses">
            <h1>My Created Courses</h1>
            {isAuthorized ? (
                <div className="course-list">
                    {myCreatedCourses.map(course => (
                        <div key={course.id} className="course-card">
                            <h2>{course.title}</h2>
                            <p>
                                {course.description.length > 30 
                                    ? `${course.description.substring(0, 30)}...` 
                                    : course.description}
                            </p>
                            <span className="course-price">{course.price}$</span>
                            <button onClick={() => handleAddModule()}>Add Module</button>
                            {isModuleFormOpened ? (
                                <>
                                <form onSubmit={(event) => handleAddModuleForm(event, course.id)}>
                                    <label>
                                        Title:
                                        <input
                                            type="text"
                                            value={title}
                                            onChange={(e) => setTitle(e.target.value)}
                                            placeholder="Enter module title"
                                        />
                                    </label>
                                    <label>
                                        Description:
                                        <input
                                            type="text"
                                            value={description}
                                            onChange={(e) => setDescription(e.target.value)}
                                            placeholder="Enter module description"
                                        />
                                    </label>
                                    <input type="submit" value="Create Module" />
                                </form>
                            </>
                            ) : null}
                        </div>
                    ))}
                </div>
            ) : (
                <p>Пожалуйста, войдите в систему для просмотра ваших курсов.</p>
            )}
        </div>
    );
};

export default MyCreatedCourses;
