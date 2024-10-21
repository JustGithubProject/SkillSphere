import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

const StepFormCreate = ({ lesson_id }) => {
    const [stepText, setStepText] = useState('');
    const [stepVideoPath, setStepVideoPath] = useState('');

    const URL_BASE = "http://127.0.0.1:8000";

    const handleFormToCreateStep = async (e) => {
        e.preventDefault();

        const accessToken = Cookies.get("access_token");

        try {
            await axios.post(
                `${URL_BASE}/api/v1/step/`,
                {
                    text: stepText,
                    lesson_id: lesson_id,
                    video_path: stepVideoPath
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${accessToken}`
                    }
                }
            );
            alert('Step created successfully!');
            window.location.realod();
        } catch (error) {
            console.error('Error creating step:', error);
            alert('Failed to create step.');
        }
    };

    return (
        <div style={{ maxWidth: '400px', margin: '0 auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
            <h1>Create Step</h1>
            <form onSubmit={handleFormToCreateStep}>
                <div style={{ marginBottom: '15px' }}>
                    <label htmlFor="stepText" style={{ display: 'block', marginBottom: '5px', color: 'black' }}>Step Text:</label>
                    <input
                        type="text"
                        id="stepText"
                        value={stepText}
                        onChange={(e) => setStepText(e.target.value)}
                        placeholder="Enter step text"
                        style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
                    />
                </div>

                <div style={{ marginBottom: '15px' }}>
                    <label htmlFor="stepVideoPath" style={{ display: 'block', marginBottom: '5px', color: 'black' }}>Step Video File:</label>
                    <input
                        type="file"
                        id="stepVideoPath"
                        onChange={(e) => setStepVideoPath(e.target.files[0])} 
                        style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc', color: 'black'}}
                    />
                </div>

                <button
                    type="submit"
                    style={{
                        width: '100%',
                        padding: '10px',
                        backgroundColor: '#28a745',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer'
                    }}
                >
                    Create Step
                </button>
            </form>
        </div>
    );
};

export default StepFormCreate;
