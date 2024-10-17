import React, { useState, useEffect } from 'react';
import styles from './Sidebar.module.css';
import axios from 'axios';
import Cookies from 'js-cookie';
import '@fortawesome/fontawesome-free/css/all.css';

const Sidebar = ({ course_id }) => {
  const [modules, setModules] = useState([]);
  const [openedModuleId, setOpenedModuleId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(null);

  useEffect(() => {
    const accessToken = Cookies.get('access_token');
    const fetchModulesOfCourse = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/v1/module/all/${course_id}`,
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

    fetchModulesOfCourse();
  }, [course_id]);

  const handleModuleClick = (moduleId) => {
    setOpenedModuleId(openedModuleId === moduleId ? null : moduleId);
  };

  const handleRemoveLesson = async (lesson_id) => {
    if (!window.confirm('Are you sure you want to delete this lesson?')) return;
    const accessToken = Cookies.get("access_token");
    setDeleting(lesson_id);
    try {
      await axios.delete(
        `http://127.0.0.1:8000/api/v1/lesson/${lesson_id}`,
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
        `http://127.0.0.1:8000/api/v1/module/${module_id}`,
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

  return (
    <aside className={styles.sidebar}>
      <h2>Modules</h2>
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
              </div>
              {openedModuleId === module.id && (
                <ul className={styles.lessonList}>
                  {module.lessons.length === 0 ? (
                    <li className={styles.noLessonText}>No lessons available.</li>
                  ) : (
                    module.lessons.map((lesson, l_index) => (
                      <li key={lesson.id} className={styles.lessonItem}>
                        {l_index + 1}.{' '}
                        <a href="#">{lesson.title}</a>
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
    </aside>
  );
};

export default Sidebar;
