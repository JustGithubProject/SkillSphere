import React, { useState, useEffect } from 'react';
import axios from 'axios';

import CourseCommentForm from '../CourseCommentForm/CourseCommentForm';
import Cookies from 'js-cookie';
import * as jwtDecodeModule from 'jwt-decode';

const CourseSiteSection = ({ courseID }) => {
    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isAuthorized, setIsAuthorized] = useState(false);
    const [userID, setUserID] = useState();

    useEffect(() => {
        const fetchCourseByID = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/v1/course/no-auth/${courseID}`);
                console.log("Course: ", response.data);
                setCourse(response.data);
                setLoading(false);
            } catch (error) {
                console.log("Failed to fetch course by id", error);
                setLoading(false);
            }
        };

        fetchCourseByID();
    }, [courseID]);


    useEffect(() => {
        const accessToken = Cookies.get("access_token");
        if (accessToken) {
            setIsAuthorized(true);
            try {
                const decodedToken = jwtDecodeModule.jwtDecode(accessToken);
                setUserID(decodedToken.id);
                
            } catch (error) {
                console.error("Invalid token:", error);
            }
          }
      }, []);


    if (loading) {
        return <p>Loading...</p>;
    }

    if (!course) {
        return <p>Course not found</p>;
    }

    return (
        <div className="site-section">
            <div className="container">
                <div className="row">
                    <div className="col-lg-8 mb-5">
                        <div className="mb-5">
                            <h3 className="text-black">{course ? course.title : "Title"}</h3>
                            <p className="mb-4">
                                <strong className="text-black mr-3">Schedule: </strong> MWF 9:30 - 11:00
                            </p>
                            <p>{course.description}</p>
                            <div className="row mb-4">
                                <div className="col-md-6">
                                    <img src={course.photo_url || "images/img_1.jpg"} alt="Image" className="img-fluid rounded" />
                                </div>
                                <div className="col-md-6">
                                    <img src="images/img_2.jpg" alt="Image" className="img-fluid rounded" />
                                </div>
                            </div>

                            <p className="mt-4"><a href="#" className="btn btn-primary">Admission</a></p>
                        </div>

                        <div className="pt-5">
                            <h3 className="mb-5">6 Comments</h3>
                            <ul className="comment-list">
                                {/* Здесь можно динамически отображать комментарии */}
                            </ul>
                            {isAuthorized ? (<CourseCommentForm userID={userID} courseID={course.id}/>) : null}
                        </div>
                    </div>
                    <div className="col-lg-4 pl-lg-5">
                        <div className="mb-5 text-center border rounded course-instructor">
                            <h3 className="mb-5 text-black text-uppercase h6 border-bottom pb-3">Course Instructor</h3>
                            <div className="mb-4 text-center">
                                <img src="images/person_2.jpg" alt="Image" className="w-25 rounded-circle mb-4" />
                                <h3 className="h5 text-black mb-4">{course.creator.first_name} {course.creator.last_name}</h3>
                                <p>{course.creator.email}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CourseSiteSection;
