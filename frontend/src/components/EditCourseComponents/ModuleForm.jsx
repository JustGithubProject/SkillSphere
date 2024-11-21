import React, { useState } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import styles from './ModuleForm.module.css'; 

const ModuleForm = ( { course_id }) => {
    const [title, setTitle] = useState('');

    const BASE_URL = process.env.REACT_APP_API_URL;
    console.log("BASE_URL: ", BASE_URL);


    const handleCreateModule = async (e) => {
        e.preventDefault();
        try {
            const accessToken = Cookies.get('access_token');
            const response = await axios.post(
                `${BASE_URL}/api/v1/module`,
                {
                    title: title,
                    description: "TEMP VALUE FOR A WHILE", 
                    course_id: course_id, 
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );

            if (response.status === 201) {
                setTitle('');
            }
        } catch (error) {
            console.log('Failed to create module:', error);
        }
    };

    return (
        <div className={styles.moduleFormContainerVeryUniqueClassThatWasCreatedByMe}>
            <form onSubmit={handleCreateModule} className={styles.moduleForm}>
                <div className={styles.formGroup}>
                    <label htmlFor="title">Module Title</label>
                    <input
                        className={styles.classForInputCreatedByMe}
                        type="text"
                        id="title"
                        placeholder="Enter Module Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className={styles.submitButton}>Create Module</button>
            </form>
        </div>
    );
};

export default ModuleForm;
