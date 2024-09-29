import React from 'react';
import Header from '../components/CoursesPageComponents/Header/Header';
import PurchasedCourses from '../components/PurchasedCourses/PurchasedCourses';

const PurchasedCoursesPage = () => {
    return (
        <>
        <Header isCoursesPage={false} isPurchasedCoursesPage={true}/>
        <PurchasedCourses/>
        </>
    )
}

export default PurchasedCoursesPage;