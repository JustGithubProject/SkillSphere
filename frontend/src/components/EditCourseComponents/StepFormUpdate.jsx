import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import styles from './StepFormUpdate.module.css';

import { PlusOutlined } from '@ant-design/icons';
import { Button, Upload, Form, Input, message } from 'antd';

const { TextArea } = Input;

const StepFormUpdate = ({ step_id, prev_text }) => {
    const [showForm, setShowForm] = useState(false);
    const [stepText, setStepText] = useState(prev_text);
    const [stepVideoPath, setStepVideoPath] = useState(null);

    const URL_BASE = "http://127.0.0.1:8000";

    const handleFormToUpdateStep = async () => {
        const accessToken = Cookies.get("access_token");
        const formData = new FormData();
        formData.append("text", stepText);
        if (stepVideoPath) {
            formData.append("video_path", stepVideoPath);
        }

        try {
            await axios.patch(
                `${URL_BASE}/api/v1/step/${step_id}`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': `Bearer ${accessToken}`
                    }
                }
            );
            message.success('Step updated successfully!');
            setShowForm(false);
            window.location.reload();
        } catch (error) {
            console.error('Error updating step:', error);
            message.error('Failed to update step.');
        }
    };

    const normFile = (e) => (Array.isArray(e) ? e : e && e.fileList);

    return (
        <div className={showForm ? styles.formContainer : ''}> 
            {showForm ? (
                <div>
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
                                rows={4}
                                className={styles.input}
                            />
                        </Form.Item>
                        <Form.Item 
                            label="Upload Video" 
                            valuePropName="fileList" 
                            getValueFromEvent={normFile}
                            labelCol={{ span: 24 }}
                            style={{ textAlign: 'center' }}
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
                        <Form.Item style={{ textAlign: 'center' }}>
                            <Button type="primary" htmlType="submit">
                                Update Step
                            </Button>
                            <Button style={{ marginLeft: '10px' }} onClick={() => setShowForm(false)}>
                                Cancel
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            ) : (
                <Button type="primary" icon={<PlusOutlined />} onClick={() => setShowForm(true)}>
                    Update Step
                </Button>
            )}
        </div>
    );
};

export default StepFormUpdate;
