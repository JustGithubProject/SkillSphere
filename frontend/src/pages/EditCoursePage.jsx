import React, { useState, useEffect } from 'react';
import { Menu, Layout, Breadcrumb } from 'antd';
import { AppstoreOutlined } from '@ant-design/icons';
import axios from 'axios';
import Sidebar from '../components/EditCourseComponents/Sidebar';
import StepFormUpdate from '../components/EditCourseComponents/StepFormUpdate';
import StepFormCreate from '../components/EditCourseComponents/StepFormCreate';
import styles from '../components/EditCourseComponents/Sidebar.module.css';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

import Cookies from 'js-cookie';

const { Header, Content, Sider } = Layout;

const EditCoursePage = () => {
  const [steps, setSteps] = useState([]);
  const [lessonID, setLessonID] = useState();
  const [currentStepIndex, setCurrentStepIndex] = useState(0); 
  const [showFormUpdate, setShowFormUpdate] = useState(true);
  const [modules, setModules] = useState([]);
  const { id } = useParams();
  const API_BASE = "http://127.0.0.1:8000";

  useEffect(() => {
    const storedSteps = JSON.parse(localStorage.getItem("steps_of_lesson"));
    setLessonID(localStorage.getItem("lesson_id"));
    setSteps(storedSteps || []); 

    // Fetch modules and lessons
    const accessToken = Cookies.get('access_token');
    axios.get(`${API_BASE}/api/v1/module/all/${id}`, {
      headers: { Authorization: `Bearer ${accessToken}` }
    })
    .then((response) => setModules(response.data))
    .catch((error) => console.error('Error fetching modules:', error));
  }, [id]);

  const handleGetStepsOfLesson = (lesson) => {
    localStorage.setItem('steps_of_lesson', JSON.stringify(lesson.steps));
    localStorage.setItem('lesson_id', lesson.id);
    window.location.reload();
  };

  // Generate menu items from modules
  const menuItems = modules.map((module) => ({
    key: `module-${module.id}`,
    icon: <AppstoreOutlined />, // You can replace this icon or keep it
    label: module.title,
    children: module.lessons.map((lesson) => ({
      key: `lesson-${lesson.id}`,
      label: lesson.title,
    })),
  }));

  return (
    <Layout>
      {/* <Header>
        <div className="logo" />
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']} />
      </Header> */}
      <Layout>
        <Sider width={200} className="site-layout-background">
          <Menu
            mode="inline"
            style={{ height: '100%', borderRight: 0 }}
            items={menuItems}
            onClick={(e) => {
              const [type, id] = e.key.split('-');
              if (type === 'lesson') {
                const selectedLesson = modules
                  .flatMap(module => module.lessons)
                  .find(lesson => lesson.id === parseInt(id));
                if (selectedLesson) {
                  handleGetStepsOfLesson(selectedLesson);
                }
              }
            }}
          />
        </Sider>
        <Layout style={{ padding: '0 24px 24px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item><Link to="/">Home</Link></Breadcrumb.Item>
            <Breadcrumb.Item><Link to="/courses">Course</Link></Breadcrumb.Item>
          </Breadcrumb>
          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
              background: '#fff',
            }}
          >
            <h1>Steps</h1>
            {steps.length > 0 ? (
              <>
                <div>
                  {steps[currentStepIndex].video_path && (
                    <video
                      key={steps[currentStepIndex].video_path}
                      controls
                      style={{ width: '100%' }}
                    >
                      <source
                        src={`http://127.0.0.1:8080${steps[currentStepIndex].video_path}`}
                        type="video/mp4"
                      />
                      Your browser does not support the video tag.
                    </video>
                  )}
                  <p>{steps[currentStepIndex].text}</p>
                </div>
                <div className={styles.navigationButtons}>
                  <button
                    onClick={() => setCurrentStepIndex(currentStepIndex - 1)}
                    disabled={currentStepIndex === 0}
                  >
                    Back
                  </button>
                  <button
                    onClick={() => setCurrentStepIndex(currentStepIndex + 1)}
                    disabled={currentStepIndex === steps.length - 1}
                  >
                    Next
                  </button>
                </div>
                <div>
                  <button onClick={() => setShowFormUpdate(true)}>
                    Show Update Form
                  </button>
                  <button onClick={() => setShowFormUpdate(false)}>
                    Show Create Form
                  </button>
                </div>
                {showFormUpdate ? (
                  <StepFormUpdate step_id={steps[currentStepIndex].id} />
                ) : (
                  <StepFormCreate lesson_id={lessonID} />
                )}
              </>
            ) : (
              <p>No steps available</p>
            )}
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default EditCoursePage;
