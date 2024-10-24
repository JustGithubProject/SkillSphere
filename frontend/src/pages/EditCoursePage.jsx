import React, { useState, useEffect } from 'react';
import { Menu, Layout, Breadcrumb, Button, Radio } from 'antd';
import { AppstoreOutlined } from '@ant-design/icons';
import axios from 'axios';
import StepFormUpdate from '../components/EditCourseComponents/StepFormUpdate';
import StepFormCreate from '../components/EditCourseComponents/StepFormCreate';
import styles from '../components/EditCourseComponents/Sidebar.module.css';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';

const { Content, Sider } = Layout;

const EditCoursePage = () => {
  const [steps, setSteps] = useState([]);
  const [lessonID, setLessonID] = useState();
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [showFormUpdate, setShowFormUpdate] = useState(true);
  const [modules, setModules] = useState([]);
  const { id } = useParams();
  const API_BASE = 'http://127.0.0.1:8000';

  useEffect(() => {
    const storedSteps = JSON.parse(localStorage.getItem('steps_of_lesson'));
    setLessonID(localStorage.getItem('lesson_id'));
    setSteps(storedSteps || []);

    // Fetch modules and lessons
    const accessToken = Cookies.get('access_token');
    axios
      .get(`${API_BASE}/api/v1/module/all/${id}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
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
    icon: <AppstoreOutlined />,
    label:
      module.title.length > 20 ? `${module.title.slice(0, 20)}...` : module.title,
    children: module.lessons.map((lesson) => ({
      key: `lesson-${lesson.id}`,
      label: lesson.title,
    })),
  }));

  return (
    <Layout>
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
                  .flatMap((module) => module.lessons)
                  .find((lesson) => lesson.id === parseInt(id));
                if (selectedLesson) {
                  handleGetStepsOfLesson(selectedLesson);
                }
              }
            }}
          />
        </Sider>
        <Layout style={{ padding: '0 24px 24px', minHeight: '100vh' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>
              <Link to="/">Home</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <Link to="/courses">Course</Link>
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
            }}
          >
            {steps.length > 0 ? (
              <>
                <h1 style={{textAlign: 'center', width: '100%'}}>Steps</h1>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginBottom: '16px',
                    width: '100%', // Ensures full width to center align
                  }}
                >
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
                        Your browser does not support the video tag.
                      </video>
                    </div>
                  )}
                  <p style={{ marginTop: '16px' }}>{steps[currentStepIndex].text}</p>
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
                    Back
                  </Button>
                  <Button
                    onClick={() => setCurrentStepIndex(currentStepIndex + 1)}
                    disabled={currentStepIndex === steps.length - 1}
                    color="danger"
                    variant="outlined"
                  >
                    Next
                  </Button>
                </div>
                <div style={{
                    display: 'flex',
                    justifyContent: 'center', 
                    alignItems: 'center', 
                    marginTop: '16px',
                    width: '100%', 
                }}>
                  <Radio.Group defaultValue="a" buttonStyle="solid">
                    <Radio.Button onClick={() => setShowFormUpdate(true)} value="a">Show Update Form</Radio.Button>
                    <Radio.Button onClick={() => setShowFormUpdate(false)} value="b">Show Create Form</Radio.Button>
                  </Radio.Group>
                </div>
                <div style={{
                    display: 'flex',
                    justifyContent: 'center', 
                    alignItems: 'center', 
                    marginTop: '16px',
                    width: '100%', 
                }}>
                  {showFormUpdate ? (
                    <StepFormUpdate step_id={steps[currentStepIndex].id} />
                  ) : (
                    <StepFormCreate lesson_id={lessonID} />
                  )}
                </div>
              </>
            ) : (
              <div style={{ padding: '50px', color: '#888' }}>
                <h2 style={{color: 'black'}}>No steps available</h2>
                <p>Please select a lesson to view or create steps.</p>
                <StepFormCreate lesson_id={lessonID} />
              </div>
            )}
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default EditCoursePage;
