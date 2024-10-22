import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import styles from './StepFormUpdate.module.css'; 

const StepFormUpdate = ({ step_id }) => {
    const [stepText, setStepText] = useState('');
    const [stepVideoPath, setStepVideoPath] = useState('');

    const URL_BASE = "http://127.0.0.1:8000";

    const handleFormToUpdateStep = async (e) => {
        e.preventDefault();

        const accessToken = Cookies.get("access_token");

        try {
            await axios.patch(
                `${URL_BASE}/api/v1/step/${step_id}`,
                {
                    text: stepText,
                    video_path: stepVideoPath
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${accessToken}`
                    }
                }
            );
            alert('Step updated successfully!');
            window.location.reload();
        } catch (error) {
            console.error('Error updating step:', error);
            alert('Failed to update step.');
        }
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.heading}>Update Step</h1>
            <form onSubmit={handleFormToUpdateStep}>
                <div className={styles.formGroup}>
                    <label htmlFor="stepText" className={styles.label}>Step Text:</label>
                    <input
                        type="text"
                        id="stepText"
                        value={stepText}
                        onChange={(e) => setStepText(e.target.value)}
                        placeholder="Enter step text"
                        className={styles.input}
                    />
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="stepVideoPath" className={styles.label}>Step Video File:</label>
                    <input
                        type="file"
                        id="stepVideoPath"
                        onChange={(e) => setStepVideoPath(e.target.files[0])}
                        className={`${styles.input} ${styles.fileInput}`} 
                    />
                </div>

                <button
                    type="submit"
                    className={styles.submitButton}
                >
                    Update Step
                </button>
            </form>
        </div>
    );
};

export default StepFormUpdate;
