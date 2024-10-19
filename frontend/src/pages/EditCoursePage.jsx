import React, { useState, useEffect } from 'react';
import Navbar from '../components/EditCourseComponents/Navbar';
import Sidebar from '../components/EditCourseComponents/Sidebar';
import styles from '../components/EditCourseComponents/Sidebar.module.css';
import { useParams } from 'react-router-dom';

const EditCoursePage = () => {
    const [steps, setSteps] = useState([]);
    const [currentStepIndex, setCurrentStepIndex] = useState(0); 
    const { id } = useParams();

    useEffect(() => {
        const storedSteps = JSON.parse(localStorage.getItem("steps_of_lesson"));
        setSteps(storedSteps || []); 
    }, []);

    // Handler for moving to the next step
    const handleNext = () => {
        if (currentStepIndex < steps.length - 1) {
            setCurrentStepIndex(currentStepIndex + 1);
        }
    };

    // Handler for moving to the previous step
    const handleBack = () => {
        if (currentStepIndex > 0) {
            setCurrentStepIndex(currentStepIndex - 1);
        }
    };

    const BASE_NGINX_URL = `http://127.0.0.1:8080`;

    return (
        <div className={styles.container}>
            {/* <div className={styles.navbar}>
                <Navbar course_id={id} />
            </div> */}
            <div className={styles.mainContent}>
                <Sidebar course_id={id} />
                <main className={styles.content}>
                    <h1>Steps</h1>
                    {steps.length > 0 ? (
                        <>
                            <div>
                                {steps[currentStepIndex].video_path ? (
                                    <div className={styles.videoContainer}>
                                        <video className={styles.videoFluid} controls>
                                            <source src={`${BASE_NGINX_URL}${steps[currentStepIndex].video_path}`} type="video/mp4" />
                                                Your browser does not support the video tag.
                                        </video>
                                        {steps[currentStepIndex].test ? (
                                            <>
                                                <p>Here will be test</p>
                                            </>
                                        ) : null}
                                    </div>
                                ) : null}
                                <p style={{color: 'black', textAlign: 'center'}}>{steps[currentStepIndex].text}</p>
                            </div>

                            <div className={styles.navigationButtons}>
                                <button onClick={handleBack} disabled={currentStepIndex === 0}>
                                    Back
                                </button>
                                <button onClick={handleNext} disabled={currentStepIndex === steps.length - 1}>
                                    Next
                                </button>
                            </div>

                            <div>
                                // TODO: here must be form to update text for step
                            </div>
                        </>
                    ) : (
                        <p>Empty</p>
                    )}
                </main>
            </div>
        </div>
    );
};

export default EditCoursePage;
