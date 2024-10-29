import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import styles from './StepFormUpdate.module.css';

import { PlusOutlined } from '@ant-design/icons';
import { Button, Upload, Form, Input, message } from 'antd';
import { useTranslation } from 'react-i18next';

const { TextArea } = Input;

const StepFormUpdate = ({ step_id, prev_text }) => {
    const [showForm, setShowForm] = useState(false);
    const [stepText, setStepText] = useState(prev_text);
    const [stepVideoPath, setStepVideoPath] = useState(null);
    const { t, i18n } = useTranslation();

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
            message.success(t('Step updated successfully!'));
            setShowForm(false);
            window.location.reload();
        } catch (error) {
            console.error('Error updating step:', error);
            message.error(t('Failed to update step.'));
        }
    };

    const normFile = (e) => (Array.isArray(e) ? e : e && e.fileList);

    return (
        <div className={showForm ? styles.formContainer : ''}> 
            {showForm ? (
                <div>
                    <h1 className={styles.heading}>{t('Update Step')}</h1>
                    <Form
                        onFinish={handleFormToUpdateStep}
                        layout="vertical"
                        style={{ maxWidth: 400 }}
                    >
                        <Form.Item label={t('Step Text')} required>
                            <TextArea
                                value={stepText}
                                onChange={(e) => setStepText(e.target.value)}
                                rows={4}
                                className={styles.input}
                            />
                        </Form.Item>
                        <Form.Item 
                            label={t('Upload Video')}
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
                                accept="video/*"
                            >
                                <div>
                                    <PlusOutlined />
                                    <div style={{ marginTop: 8 }}>{t('Upload')}</div>
                                </div>
                            </Upload>
                        </Form.Item>
                        <Form.Item style={{ textAlign: 'center' }}>
                            <Button type="primary" htmlType="submit">
                                {t('Update Step')}
                            </Button>
                            <Button style={{ marginLeft: '10px' }} onClick={() => setShowForm(false)}>
                                {t('Cancel')}
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            ) : (
                <Button type="primary" icon={<PlusOutlined />} onClick={() => setShowForm(true)}>
                    {t('Update Step')}
                </Button>
            )}
        </div>
    );
};

export default StepFormUpdate;
