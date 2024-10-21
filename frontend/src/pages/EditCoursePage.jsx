import React, { useState, useEffect } from 'react';
import Sidebar from '../components/EditCourseComponents/Sidebar';
import StepFormUpdate from '../components/EditCourseComponents/StepFormUpdate';
import StepFormCreate from '../components/EditCourseComponents/StepFormCreate';
import styles from '../components/EditCourseComponents/Sidebar.module.css';
import { useParams } from 'react-router-dom';

const EditCoursePage = () => {
    const [steps, setSteps] = useState([]);
    const [lessonID, setLessonID] = useState();
    const [currentStepIndex, setCurrentStepIndex] = useState(0); 
    const [showFormUpdate, setShowFormUpdate] = useState(true);
    const { id } = useParams();


    useEffect(() => {
        const storedSteps = JSON.parse(localStorage.getItem("steps_of_lesson"));
        setLessonID(localStorage.getItem("lesson_id"));
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

    const handleShowUpdateForm = () => {
        setShowFormUpdate(true);
    }

    const handleShowCreateForm = () => {
        setShowFormUpdate(false);
    }

    const BASE_NGINX_URL = `http://127.0.0.1:8080`;

    return (
        <div className={styles.container}>
            <div className={styles.mainContent}>
                <Sidebar course_id={id} />
                <main className={styles.content}>
                    <h1>Steps</h1>
                    {steps.length > 0 ? (
                        <>
                            <div>
                                {steps[currentStepIndex].video_path ? (
                                    <div className={styles.videoContainer}>
                                        <video key={steps[currentStepIndex].video_path} className={styles.videoFluid} controls>
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
                                <button 
                                    onClick={handleBack} 
                                    disabled={currentStepIndex === 0} 
                                    className={styles.navButton}
                                >
                                    Back
                                </button>
                                <button 
                                    onClick={handleNext} 
                                    disabled={currentStepIndex === steps.length - 1} 
                                    className={styles.navButton}
                                >
                                    Next
                                </button>
                            </div>

                            {/* Toggle between Update and Create forms */}
                            <div style={{ textAlign: 'center', margin: '20px 0' }}>
                                <button 
                                    onClick={handleShowUpdateForm}
                                    style={{
                                        padding: '10px 20px',
                                        marginRight: '10px',
                                        backgroundColor: showFormUpdate ? '#4CAF50' : '#f1f1f1',
                                        color: showFormUpdate ? '#fff' : '#000',
                                        border: 'none',
                                        borderRadius: '5px',
                                        cursor: 'pointer',
                                    }}
                                >
                                    Show Update Form
                                </button>
                                <button 
                                    onClick={handleShowCreateForm}
                                    style={{
                                        padding: '10px 20px',
                                        backgroundColor: !showFormUpdate ? '#4CAF50' : '#f1f1f1',
                                        color: !showFormUpdate ? '#fff' : '#000',
                                        border: 'none',
                                        borderRadius: '5px',
                                        cursor: 'pointer',
                                    }}
                                >
                                    Show Create Form
                                </button>
                            </div>

                            {/* Show either Update or Create form */}
                            <div style={{ display: 'flex', gap: '20px' }}>
                                {showFormUpdate ? (
                                    <StepFormUpdate step_id={steps[currentStepIndex].id} />
                                ) : (
                                    <StepFormCreate lesson_id={lessonID} />
                                )}
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
