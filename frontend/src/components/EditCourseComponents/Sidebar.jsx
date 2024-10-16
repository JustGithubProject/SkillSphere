import React, { useState, useEffect } from 'react';
import styles from './Sidebar.module.css';
import axios from 'axios';
import Cookies from 'js-cookie';


const Sidebar = ( {course_id} ) => {
    const [modules, setModules] = useState([]);

    useEffect(() => {
        const accessToken = Cookies.get('access_token');
        const fetchModulesOfCourse = async () => {
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
          }
        };
    
        fetchModulesOfCourse();
    }, [course_id]);
    return (
        <aside className={styles.sidebar}>
            {/* <h2>ООП в Python</h2> */}
            <ul>
                {modules.map((module, index) => (
                <>
                    <li><a href="#">{module.title}</a></li>
                    <ul>
                        {module.lessons.map((lesson, index) => (
                            <li><a href="#">{lesson.title}</a></li>
                        ))}
                    </ul>
                </>
                ))}
            </ul>
        </aside>
    );
}

export default Sidebar;
