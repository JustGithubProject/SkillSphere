import React from 'react';
import Sidebar from '../components/Sidebar/Sidebar';

import { useParams } from 'react-router-dom';

const EditCoursePage = () => {
    const { id } = useParams();
    return (
        <>
            <Sidebar course_id={id}/>
        </>
    )
}

export default EditCoursePage;