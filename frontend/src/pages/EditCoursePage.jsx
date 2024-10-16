import React from 'react';
import Navbar from '../components/EditCourseComponents/Navbar';

import { useParams } from 'react-router-dom';

const EditCoursePage = () => {
    const { id } = useParams();
    return (
        <>
            <Navbar/>
        </>
    )
}

export default EditCoursePage;