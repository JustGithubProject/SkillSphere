import React, { useState, useEffect } from 'react';
import styles from './Sidebar.module.css';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Menu } from 'antd';
import { AppstoreOutlined } from '@ant-design/icons';
import ModuleForm from './ModuleForm';

const Sidebar = ({ course_id }) => {
  const [modules, setModules] = useState([]);
  const [course, setCourse] = useState();
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const API_BASE = "http://127.0.0.1:8000";

  useEffect(() => {
    const accessToken = Cookies.get('access_token');

    const fetchModulesOfCourse = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${API_BASE}/api/v1/module/all/${course_id}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        setModules(response.data);
      } catch (error) {
        console.error('Error fetching modules:', error);
      } finally {
        setLoading(false);
      }
    };

    const fetchCourseById = async () => {
      try {
        const response = await axios.get(
          `${API_BASE}/api/v1/course/${course_id}`,
          {
            headers: {
              'Authorization': `Bearer ${accessToken}`
            }
          }
        );
        setCourse(response.data);
      } catch (error) {
        console.log("Error fetching course by id", error);
      }
    };

    fetchModulesOfCourse();
    fetchCourseById();
  }, [course_id]);

  const handleGetStepsOfLesson = (lesson) => {
    const receivedStepsOfLesson = localStorage.getItem("steps_of_lesson");

    if (receivedStepsOfLesson) {
      localStorage.removeItem("steps_of_lesson");
    }

    const receivedLessonId = localStorage.getItem("lesson_id");
    if (receivedLessonId) {
      localStorage.removeItem("lesson_id");
    }

    localStorage.setItem("steps_of_lesson", JSON.stringify(lesson.steps));
    localStorage.setItem("lesson_id", lesson.id);
    window.location.reload();
  };

  const handleMenuClick = (e) => {
    const clickedKey = e.key;
    console.log('Clicked menu item:', clickedKey);
    
    if (clickedKey.startsWith('module-')) {
    } else if (clickedKey.startsWith('lesson-')) {
      const lessonId = clickedKey.split('-')[1];
      const selectedLesson = modules.flatMap(module => module.lessons).find(lesson => lesson.id === parseInt(lessonId));
      if (selectedLesson) {
        handleGetStepsOfLesson(selectedLesson);
      }
    }
  };

  const items = modules.map((module, m_index) => ({
    key: `module-${module.id}`,
    icon: <AppstoreOutlined />,
    label: `${m_index + 1}. ${module.title}`,
    style: { color: '#fff' },
    children: module.lessons.map((lesson, l_index) => ({
      key: `lesson-${lesson.id}`,
      label: lesson.title 
        ? `${l_index + 1}. ${lesson.title.length > 30 ? `${lesson.title.slice(0, 30)}...` : lesson.title}`
        : `Lesson ${l_index + 1}`,
      style: { color: '#fff' },
    })),
  }));

  return (
    <div className={styles.sidebar}>
      <h2 style={{ marginBottom: '50px' }}>
        {course && course.title ? course.title : 'Modules'}
      </h2>
      {loading ? (
        <p>Loading modules...</p>
      ) : (
      <Menu
        onClick={handleMenuClick}
        style={{ width: 350, backgroundColor: '#222', color: '#fff' }} 
        mode="inline"
        items={items.map(item => ({
          ...item,
          style: { color: '#fff' },
        }))}
        theme="dark"
      />
      )}
      <div onClick={() => setShowForm(!showForm)} className={styles.addModuleIcon}>
        <svg
          height="20px"  
          width="20px"
          version="1.1"
          id="Layer_1"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          viewBox="0 0 512 512"
          xmlSpace="preserve"
          fill="#000000"
        >
          <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
          <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
          <g id="SVGRepo_iconCarrier">
            <path
              style={{ fill: '#A4E276' }}
              d="M488.727,186.182H325.818V23.273C325.818,10.418,315.398,0,302.545,0H256h-46.545
              c-12.853,0-23.273,10.418-23.273,23.273v162.909H23.273C10.42,186.182,0,196.6,0,209.455v93.091
              c0,12.853,10.42,23.273,23.273,23.273h162.909v162.909c0,12.853,10.42,23.273,23.273,23.273H256h46.545
              c12.853,0,23.273-10.42,23.273-23.273V325.818h162.909c12.853,0,23.273-10.42,23.273-23.273v-93.091
              C512,196.6,501.58,186.182,488.727,186.182z"
            ></path>
            <path
              style={{ fill: '#64C37D' }}
              d="M209.455,0c-12.853,0-23.273,10.418-23.273,23.273v162.909H23.273C10.42,186.182,0,196.6,0,209.455
              v93.091c0,12.853,10.42,23.273,23.273,23.273h162.909v162.909c0,12.853,10.42,23.273,23.273,23.273H256V0H209.455z"
            ></path>
          </g>
        </svg>
      </div>
      {showForm && <ModuleForm course_id={course_id} />}
    </div>
  );
};

export default Sidebar;
