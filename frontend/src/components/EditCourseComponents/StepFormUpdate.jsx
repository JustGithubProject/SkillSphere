import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import styles from './StepFormUpdate.module.css';

import { PlusOutlined } from '@ant-design/icons';
import {
    Button,
    Upload,
    Form,
    Input,
    message,
} from 'antd';

const { TextArea } = Input;

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

    const normFile = (e) => {
        if (Array.isArray(e)) {
            return e;
        }
        return e && e.fileList;
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.heading}>Update Step</h1>
            <Form
                onFinish={handleFormToUpdateStep}
                layout="vertical"
                style={{ maxWidth: 400 }}
            >
                <Form.Item label="Step Text" required>
                    <TextArea
                        value={stepText}
                        onChange={(e) => setStepText(e.target.value)}
                        placeholder="Enter step text"
                        rows={4}
                        className={styles.input}
                    />
                </Form.Item>
                <Form.Item 
                    label="Upload Video" 
                    valuePropName="fileList" 
                    getValueFromEvent={normFile}
                >
                    <Upload
                        beforeUpload={(file) => {
                            setStepVideoPath(file);
                            return false;
                        }}
                        listType="picture-card"
                        showUploadList={false}
                    >
                        <div>
                            <PlusOutlined />
                            <div style={{ marginTop: 8 }}>Upload</div>
                        </div>
                    </Upload>
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" className={styles.submitButton}>
                        Update Step
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default StepFormUpdate;
