import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Col, Row, Slider } from 'antd';

const CourseCategoryCoursesPage = () => {
    const { categoryName } = useParams();

    return (
        <>
        <Row gutter={[16, 16]}>
            <Col span={8} />
            <Col span={8} />
            <Col span={8} />

            <Col span={8} />
            <Col span={8} />
            <Col span={8} />
        </Row>
        </>
    );
}

export default CourseCategoryCoursesPage;