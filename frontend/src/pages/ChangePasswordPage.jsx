import React, {useState, useEffect} from 'react';

import ChangePasswordForm from '../components/ChangePasswordForm/ChangePasswordForm';

import { useParams } from 'react-router-dom';

const ChangePasswordPage = () => {
    const { id } = useParams();
    return (
        <>
            <ChangePasswordForm unique_id={id}/>
        </>
    )
}

export default ChangePasswordPage;