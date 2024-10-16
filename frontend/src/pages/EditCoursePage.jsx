import React from 'react';
import Navbar from '../components/EditCourseComponents/Navbar';
import Sidebar from '../components/EditCourseComponents/Sidebar';
import styles from '../components/EditCourseComponents/Sidebar.module.css';

import { useParams } from 'react-router-dom';

const EditCoursePage = () => {
    const { id } = useParams();

    return (
        <div className={styles.container}>
            <div className={styles.navbar}>
                <Navbar course_id={id}/>
            </div>
            <div className={styles.mainContent}>
                <Sidebar course_id={id} />
                {/* <main className={styles.content}>
                    <h1 align="center">Шаг 1 — Дескрипторы</h1>
                </main> */}
            </div>
        </div>
    );
}

export default EditCoursePage;
