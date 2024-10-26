import React, { useState, useEffect } from 'react';
import { Menu, Layout, Breadcrumb, Button, Radio, Input, Typography } from 'antd';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import StepFormUpdate from '../components/EditCourseComponents/StepFormUpdate';
import StepFormCreate from '../components/EditCourseComponents/StepFormCreate';
import styles from '../components/EditCourseComponents/Sidebar.module.css';
import { useParams } from 'react-router-dom';
import { PlusOutlined } from '@ant-design/icons';

const { Content, Sider } = Layout;
const { Title } = Typography;

const EditCoursePage = () => {
  const [steps, setSteps] = useState([]);
  const [lessonID, setLessonID] = useState(null);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [showFormUpdate, setShowFormUpdate] = useState(true);
  const [modules, setModules] = useState([]);
  const [isAddingModule, setIsAddingModule] = useState(false);
  const [isAddingLesson, setIsAddingLesson] = useState(false);
  const [newModuleTitle, setNewModuleTitle] = useState("");
  const [newLessonTitle, setNewLessonTitle] = useState();
  const { id } = useParams();
  const API_BASE = 'http://127.0.0.1:8000';

  useEffect(() => {
    const fetchModules = async () => {
      const accessToken = Cookies.get('access_token');
      try {
        const response = await axios.get(`${API_BASE}/api/v1/module/all/${id}`, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
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

  const handleAddModule = async () => {
    const accessToken = Cookies.get('access_token');
    try {
      const response = await axios.post(
        `${API_BASE}/api/v1/module`,
        {
          title: newModuleTitle,
          description: "TEMP VALUE FOR A WHILE",
          course_id: id,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setModules([...modules, response.data]);
      setNewModuleTitle("");
      setIsAddingModule(false);
    } catch (error) {
      console.error('Error creating module:', error);
    }
  };

  const handleAddLesson = async (module_id) => {
    const accessToken = Cookies.get("access_token");
    try {
      const response = await axios.post(
        `${API_BASE}/api/v1/lesson`,
        {
          title: newLessonTitle,
          description: "TEMP VALUE FOR A WHILE",
          module_id: module_id 
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
          }
        }
      )
      setModules(modules.map(module => 
        module.id === module_id ? { ...module, lessons: [...module.lessons, response.data] } : module
      ));
      setNewLessonTitle("");
      setIsAddingLesson({ ...isAddingLesson, [module_id]: false });
    } catch(error) {
      console.log("Error creating lesson: ", error);
    }
  }

  const menuItems = modules.map((module, m_index) => ({
    key: `module-${module.id}`,
    label: `${m_index + 1}. ` + (module.title.length > 35 ? `${module.title.substring(0, 35)}...` : module.title),
    children: [
      ...module.lessons.map((lesson) => ({
        key: `lesson-${lesson.id}`,
        label: lesson.title,
      })),
      {
        key: `add-lesson-${module.id}`,
        label: isAddingLesson[module.id] ? (
          <Input
            autoFocus
            placeholder="Enter lesson title"
            value={newLessonTitle}
            onChange={(e) => setNewLessonTitle(e.target.value)}
            onPressEnter={() => handleAddLesson(module.id)}
            onBlur={() => setIsAddingLesson({ ...isAddingLesson, [module.id]: false })}
            style={{ borderRadius: '5px' }}
          />
        ) : (
          <Button
            icon={<PlusOutlined />}
            onClick={() => setIsAddingLesson({ ...isAddingLesson, [module.id]: true })}
            style={{ width: '100%'}}
          >
            Add Lesson
          </Button>
        ),
      }
    ],
  }));
  

  return (
    <Layout>
      <Layout>
        <Sider width={300} className="site-layout-background">
          <div className={styles.menuContainer}>
            <div style={{ padding: '10px', textAlign: 'center', backgroundColor: 'white',  }}>
              {isAddingModule ? (
                <Input
                  autoFocus
                  placeholder="Enter module title"
                  value={newModuleTitle}
                  onChange={(e) => setNewModuleTitle(e.target.value)}
                  onPressEnter={handleAddModule}
                  onBlur={() => setIsAddingModule(false)}
                  style={{ marginBottom: '10px', borderRadius: '5px' }}
                />
              ) : (
                <Button
                  icon={<PlusOutlined />}
                  onClick={() => setIsAddingModule(true)}
                  style={{ width: '100%', marginBottom: '10px' }}
                >
                  Add Module
                </Button>
              )}
            </div>
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
                        Your browser does not support the video tag.
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
                    <StepFormUpdate key={steps[currentStepIndex].id} step_id={steps[currentStepIndex].id} prev_text={steps[currentStepIndex].text} />
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
