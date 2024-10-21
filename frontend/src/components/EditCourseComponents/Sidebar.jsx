import React, { useState, useEffect } from 'react';
import styles from './Sidebar.module.css';
import axios from 'axios';
import Cookies from 'js-cookie';
import '@fortawesome/fontawesome-free/css/all.css';
import ModuleForm from './ModuleForm';

const Sidebar = ({ course_id }) => {
  const [modules, setModules] = useState([]);
  const [course, setCourse] = useState();
  const [openedModuleId, setOpenedModuleId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const API_BASE = "http://127.0.0.1:8000";
  
  // TODO: get the course name using course_id and display it in h2 tag instread of "Modules"

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
        )
        setCourse(response.data);
      } catch(error) {
        console.log("Error fetching course by id", error);
      }
    }

    fetchModulesOfCourse();
    fetchCourseById();
  }, [course_id]);

  const handleModuleClick = (moduleId) => {
    setOpenedModuleId(openedModuleId === moduleId ? null : moduleId);
  };

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
  }

  const handleRemoveLesson = async (lesson_id) => {
    if (!window.confirm('Are you sure you want to delete this lesson?')) return;
    const accessToken = Cookies.get("access_token");
    setDeleting(lesson_id);
    try {
      await axios.delete(
        `${API_BASE}/api/v1/lesson/${lesson_id}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setModules(prevModules =>
        prevModules.map(module => ({
          ...module,
          lessons: module.lessons.filter(lesson => lesson.id !== lesson_id),
        }))
      );
    } catch (error) {
      console.log('Failed to remove lesson: ', error);
    } finally {
      setDeleting(null);
    }
  };

  const handleRemoveModule = async (module_id) => {
    if (!window.confirm('Are you sure you want to delete this module?')) return;
    const accessToken = Cookies.get("access_token");
    setDeleting(module_id);
    try {
      await axios.delete(
        `${API_BASE}/api/v1/module/${module_id}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setModules(prevModules => prevModules.filter(module => module.id !== module_id));
    } catch (error) {
      console.log('Failed to remove module: ', error);
    } finally {
      setDeleting(null);
    }
  };

  const handleShowFormClick = () => {
    if (showForm) {
      setShowForm(false);
    } else {
      setShowForm(true);
    }
  }

  return (
    <aside className={styles.sidebar}>
    <h2 style={{ marginBottom: '50px' }}>
      {course && course.title ? course.title : 'Modules'}
    </h2>
      {loading ? (
        <p>Loading modules...</p>
      ) : (
        <ul>
          {modules.map((module, m_index) => (
            <li key={module.id}>
              <div className={styles.moduleHeader}>
                {m_index + 1}.{' '}
                <a onClick={() => handleModuleClick(module.id)} href="#">
                  {module.title}
                </a>
                <i
                  onClick={() => handleRemoveModule(module.id)}
                  className={`fas fa-times ${styles.removeIcon}`}
                  style={{ color: 'red', marginLeft: '10px' }}
                ></i>
                <i
                  onClick={() => handleModuleClick(module.id)}
                  className={`fas ${openedModuleId === module.id ? 'fa-chevron-up' : 'fa-chevron-down'} ${styles.toggleIcon}`}
                  style={{ marginLeft: '10px', cursor: 'pointer' }}
                ></i>
              </div>
              {openedModuleId === module.id && (
                <ul className={styles.lessonList}>
                  {module.lessons.length === 0 ? (
                    <li className={styles.noLessonText}>No lessons available.</li>
                  ) : (
                    module.lessons.map((lesson, l_index) => (
                      <li key={lesson.id} className={styles.lessonItem}>
                        {l_index + 1}.{' '}
                        <p onClick={() => handleGetStepsOfLesson(lesson)} className={styles.noLessonText}>{lesson.title}</p>
                        <i
                          onClick={() => handleRemoveLesson(lesson.id)}
                          className={`fas fa-times ${styles.removeIcon}`}
                          style={{ color: 'red', marginLeft: '10px' }}
                        ></i>
                        {deleting === lesson.id && <span className={styles.loadingText}>Deleting...</span>}
                      </li>
                    ))
                  )}
                </ul>
              )}
              {deleting === module.id && <span className={styles.loadingText}>Deleting...</span>}
            </li>
          ))}
        </ul>
      )}
       <div onClick={handleShowFormClick} className={styles.addModuleIcon}>
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
      {showForm ? (
        <ModuleForm course_id={course_id}/>
      ) : null}

    </aside>
  );
};

export default Sidebar;
