import React, { useState, useEffect } from 'react';
import Navbar from '../components/EditCourseComponents/Navbar';
import Sidebar from '../components/EditCourseComponents/Sidebar';
import styles from '../components/EditCourseComponents/Sidebar.module.css';

import { useParams } from 'react-router-dom';

const EditCoursePage = () => {
    const [steps, setSteps] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        const storedSteps = JSON.parse(localStorage.getItem("steps_of_lesson"));
        setSteps(storedSteps);
    })

    return (
        <div className={styles.container}>
            {/* <div className={styles.navbar}>
                <Navbar course_id={id}/>
            </div> */}
            <div className={styles.mainContent}>
                <Sidebar course_id={id} />
                <main className={styles.content}>
                    <h1>Steps</h1>
                    {steps ? (
                        <>
                            {steps.map((step, index) => (
                                <>
                                    <p>{step.text}</p>
                                    <video className="video-fluid rounded w-100 mb-4" width="800" controls>
                                        <source src={`http://127.0.0.1:8080${step.video_path}`} type="video/mp4" />
                                        Your browser does not support the video tag.
                                    </video>
                                </>
                            ))}
                        </>
                    ) : <p>Empty</p>} 
 
                </main>
            </div>
        </div>
    );
}

export default EditCoursePage;
