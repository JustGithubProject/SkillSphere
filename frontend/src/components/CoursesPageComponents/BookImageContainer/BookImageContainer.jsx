import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const BookImageContainer = () => {
    const { t } = useTranslation(); 

    return (
        <div className="container-fluid page-header" style={{ marginBottom: '90px' }}>
            <div className="container">
                <div className="d-flex flex-column justify-content-center" style={{ minHeight: '300px' }}>
                    <h3 className="display-4 text-white text-uppercase">{t('Courses')}</h3>
                    <div className="d-inline-flex text-white">
                        <p className="m-0 text-uppercase">
                            <Link className="text-white" to="/">{t('Home')}</Link>
                        </p>
                        <i className="fa fa-angle-double-right pt-1 px-3"></i>
                        <p className="m-0 text-uppercase">{t('Courses')}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookImageContainer;
