import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import { Menu, Layout, Breadcrumb, Button, Radio, Input, Typography, Card} from 'antd';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import styles from '../components/EditCourseComponents/Sidebar.module.css';
import { useTranslation } from 'react-i18next';

import LanguageSwitcher from '../LanguageSwitcher';

const { Content, Sider } = Layout;
const { Paragraph } = Typography;

const FullCoursePage = () => {
    const [modules, setModules] = useState([]);
    const [steps, setSteps] = useState([]);
    const [lessonID, setLessonID] = useState(null);
    const [currentStepIndex, setCurrentStepIndex] = useState(0);
    const { id } = useParams();

    const { t, i18n } = useTranslation();

    const BASE_URL = process.env.REACT_APP_API_URL;
    const NGINX_URL = process.env.REACT_APP_NGINX_URL;
    
    console.log("BASE_URL: ", BASE_URL);
    console.log("NGINX_URL: ", NGINX_URL);
    

    useEffect(() => {
        const fetchModules = async () => {
          const accessToken = Cookies.get('access_token');
          try {
            const response = await axios.get(`${BASE_URL}/api/v1/module/all/${id}`, 
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
          const response = await axios.get(`${BASE_URL}/api/v1/step/all/${lessonId}`, {
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
                    position: 'relative',
                }}
                >
                <div style={{ position: 'absolute', top: 16, left: 16, zIndex: 1 }}>
                    <LanguageSwitcher />
                </div>
                {steps.length > 0 ? (
                <>
                    <Card
                        style={{
                            width: '60%',
                            maxWidth: '800px',
                            margin: '0 auto',
                            marginBottom: '24px',
                            marginTop: '32px',
                            padding: '16px',
                            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                            borderRadius: '8px',
                            textAlign: 'center',
                        }}
                    >
                    <Paragraph
                        ellipsis={{ rows: 3, expandable: true, symbol: t('more') }}
                        style={{ margin: 0, fontSize: '16px', lineHeight: '1.5' }}
                    >
                        {steps[currentStepIndex].text}
                    </Paragraph>
                    </Card>
                    {steps[currentStepIndex].video_path && (
                        <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                        <video
                            key={steps[currentStepIndex].video_path}
                            controls
                            style={{ width: '50%' }}
                        >
                            <source
                            src={`${NGINX_URL}${steps[currentStepIndex].video_path}`}
                            type="video/mp4"
                            />
                            {t('Your browser does not support the video tag.')}
                        </video>
                        </div>
                    )}
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