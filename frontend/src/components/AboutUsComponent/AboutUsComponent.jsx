import React from 'react';
import { useTranslation } from 'react-i18next';

const AboutUsComponent = () => {
  const { t } = useTranslation(); 

  return (
    <div className="container-fluid py-5">
      <div className="container py-5">
        <div className="row align-items-center">
          <div className="col-lg-5">
            <img
              className="img-fluid rounded mb-4 mb-lg-0"
              src="img/about.jpg"
              alt={t("About Us")}
            />
          </div>
          <div className="col-lg-7">
            <div className="text-left mb-4">
              <h5 className="text-primary text-uppercase mb-3" style={{ letterSpacing: '5px' }}>
                {t("About Us")}
              </h5>
              <h1>{t("Innovative Way To Learn")}</h1>
            </div>
            <p>
              {t("Our mission is to empower learners around the world by providing high-quality educational content and a supportive community. We leverage innovative technology to create interactive learning experiences that keep you engaged and motivated. From video lectures and quizzes to discussion forums and hands-on projects, our courses cater to various learning styles.")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUsComponent;
