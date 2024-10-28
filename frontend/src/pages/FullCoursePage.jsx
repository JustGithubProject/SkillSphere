import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import { Menu, Layout, Breadcrumb, Button, Radio, Input } from 'antd';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import styles from '../components/EditCourseComponents/Sidebar.module.css';
import { useTranslation } from 'react-i18next';

import LanguageSwitcher from '../LanguageSwitcher';

const { Content, Sider } = Layout;

const FullCoursePage = () => {
    const [modules, setModules] = useState([]);
    const [steps, setSteps] = useState([]);
    const [lessonID, setLessonID] = useState(null);
    const [currentStepIndex, setCurrentStepIndex] = useState(0);
    const { id } = useParams();

    const { t, i18n } = useTranslation();

    const API_BASE = 'http://127.0.0.1:8000';

    useEffect(() => {
        const fetchModules = async () => {
          const accessToken = Cookies.get('access_token');
          try {
            const response = await axios.get(`${API_BASE}/api/v1/module/all/${id}`, 
            {
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                },
            }
            );
            setModules(response.data);
          } catch (error) {
            console.error('Error fetching modules:', error);
          }
        };
        fetchModules();
    }, [id]);


    const fetchLessonSteps = async (lessonId) => {
        const accessToken = Cookies.get('access_token');
        try {
          const response = await axios.get(`${API_BASE}/api/v1/step/all/${lessonId}`, {
            headers: { Authorization: `Bearer ${accessToken}` },
          });
          setSteps(response.data);
          setLessonID(lessonId);
          setCurrentStepIndex(0);
        } catch (error) {
          console.error('Error fetching steps:', error);
        }
    };

    const menuItems = modules.map((module, m_index) => ({
        key: `module-${module.id}`,
        label: `${m_index + 1}. ` + (module.title.length > 35 ? `${module.title.substring(0, 35)}...` : module.title),
        children: module.lessons.map((lesson) => ({
          key: `lesson-${lesson.id}`,
          label: lesson.title,
        })),
    }));
    return (
        <Layout>
        <Layout>
            <Sider width={300} className="site-layout-background">
            <div className={styles.menuContainer}>
                <Menu
                mode="inline"
                style={{ height: '100%', borderRight: 0 }}
                items={menuItems}
                onClick={(e) => {
                    const [type, id] = e.key.split('-');
                    if (type === 'lesson') {
                    fetchLessonSteps(parseInt(id)); 
                    }
                }}
                />
            </div>
            </Sider>
            <Layout style={{ padding: '0 24px 24px', minHeight: '100vh' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>
                    <Link to="/">{t('Home')}</Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                    <Link to="/courses">{t('Course')}</Link>
                </Breadcrumb.Item>
                
                <LanguageSwitcher style={{marginLeft: '50px', marginBottom: '10px'}}/>
           
            </Breadcrumb>
            <Content
                style={{
                padding: 24,
                margin: 0,
                minHeight: 280,
                background: '#fff',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: steps.length ? 'flex-start' : 'center',
                alignItems: steps.length ? 'flex-start' : 'center',
                textAlign: steps.length ? 'left' : 'center',
                }}
            >
                {steps.length > 0 ? (
                <>
                    <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginBottom: '16px',
                        width: '100%', 
                    }}
                    >
                    <p style={{ marginTop: '16px' }}>{steps[currentStepIndex].text}</p>
                    {steps[currentStepIndex].video_path && (
                        <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                        <video
                            key={steps[currentStepIndex].video_path}
                            controls
                            style={{ width: '50%' }}
                        >
                            <source
                            src={`http://127.0.0.1:8080${steps[currentStepIndex].video_path}`}
                            type="video/mp4"
                            />
                            {t('Your browser does not support the video tag.')}
                        </video>
                        </div>
                    )}
                    </div>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'center', 
                        alignItems: 'center', 
                        marginTop: '16px',
                        width: '100%', 
                    }}> 
                    <Button
                        onClick={() => setCurrentStepIndex(currentStepIndex - 1)}
                        disabled={currentStepIndex === 0}
                        color="danger"
                        variant="outlined"
                        style={{ marginRight: '10px' }}
                    >
                        {t('Back')}
                    </Button>
                    <Button
                        onClick={() => setCurrentStepIndex(currentStepIndex + 1)}
                        disabled={currentStepIndex === steps.length - 1}
                        color="danger"
                        variant="outlined"
                    >
                        {t('Next')}
                    </Button>
                    </div>
                </>
                ) : (
                <div style={{ padding: '50px', color: '#888' }}>
                    <h2 style={{color: 'black'}}>{t('NoStepsAvailable')}</h2>
                    <p>{t('Please select a lesson to view.')}</p>
                </div>
                )}
            </Content>
            </Layout>
        </Layout>
        </Layout>
  );
}

export default FullCoursePage;