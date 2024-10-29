import React, { useState, useEffect } from 'react';
import Header from '../components/CoursesPageComponents/Header/Header';
import { useSearchParams } from 'react-router-dom';


const SearchedCoursePage = () => {
    const [searchParams] = useSearchParams();
    const query = searchParams.get("q");
    
    useEffect(() => {
        
    }, [query])

    return (
        <>
            <Header isCoursesPage={true} isHomePage={false} isPurchasedCoursesPage={false}/>
        </>
    );
};

export default SearchedCoursePage;