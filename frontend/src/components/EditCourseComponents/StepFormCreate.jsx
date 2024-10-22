import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import styles from './StepFormCreate.module.css';

import { PlusOutlined } from '@ant-design/icons';
import {
    Button,
    Upload,
    Form,
    Input,
    message,
} from 'antd';

const { TextArea } = Input;

const StepFormCreate = ({ lesson_id }) => {
    const [stepText, setStepText] = useState('');
    const [stepVideoPath, setStepVideoPath] = useState('');

    const URL_BASE = "http://127.0.0.1:8000";

    const handleFormToCreateStep = async (values) => {
        const accessToken = Cookies.get("access_token");

        try {
            const formData = new FormData();
            formData.append("text", stepText);
            formData.append("lesson_id", lesson_id);
            formData.append("video_path", stepVideoPath);

            await axios.post(
                `${URL_BASE}/api/v1/step/`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': `Bearer ${accessToken}`
                    }
                }
            );
            message.success('Step created successfully!');
            window.location.reload();
        } catch (error) {
            console.error('Error creating step:', error);
            message.error('Failed to create step.');
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
            <h1 className={styles.heading}>Create Step</h1>
            <Form
                onFinish={handleFormToCreateStep}
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 14 }}
                layout="horizontal"
                style={{ maxWidth: 600 }}
            >
                <Form.Item label="Step Text">
                    <TextArea
                        id="stepText"
                        value={stepText}
                        onChange={(e) => setStepText(e.target.value)}
                        placeholder="Enter step text"
                        rows={4}
                    />
                </Form.Item>
                <Form.Item
                    label="Upload"
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
                        <button
                            style={{
                                border: 0,
                                background: 'none',
                            }}
                            type="button"
                        >
                            <PlusOutlined />
                            <div style={{ marginTop: 8 }}>Upload</div>
                        </button>
                    </Upload>
                </Form.Item>
                <Form.Item wrapperCol={{ offset: 4, span: 14 }}>
                    <Button type="primary" htmlType="submit">
                        Create Step
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default StepFormCreate;
