import React from 'react';

import Header from '../components/CoursesPageComponents/Header/Header';
import CourseSingleComponent from '../components/CourseSingle/CourseSingle';
import Footer from '../components/CoursesPageComponents/Footer/Footer';


import { useParams } from 'react-router-dom';


const CourseSingle = () => {
    const { id } = useParams();

    return (
        <>
            <Header />
            <CourseSingleComponent/>
            <Footer/>
        </>
    );
};

export default CourseSingle;
