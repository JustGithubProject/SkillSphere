import React from 'react';

import Header from '../components/CoursesPageComponents/Header/Header';
import CreateCourseSection from '../components/CreateCourseSection/CreateCourseSection';
import Footer from '../components/CoursesPageComponents/Footer/Footer';

const CreateCoursePage = () => {
    return (
        <>
            <Header/>
            <CreateCourseSection/>
            <Footer/>
        </>
    );   
}

export default CreateCoursePage;