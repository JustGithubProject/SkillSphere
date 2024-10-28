import React from 'react';
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer>
      {/* Footer Start */}
      <div className="container-fluid bg-dark text-white py-5 px-sm-3 px-lg-5" style={{ marginTop: '90px' }}>
        <div className="row pt-5">
          <div className="col-lg-7 col-md-12">
            <div className="row">
              <div className="col-md-6 mb-5">
                <h5 className="text-primary text-uppercase mb-4" style={{ letterSpacing: '5px' }}>{t('Get In Touch')}</h5>
                <p style={{color: 'white'}}><i className="fa fa-map-marker-alt mr-2"></i>{t('Address')}</p>
                <p style={{color: 'white'}}><i className="fa fa-phone-alt mr-2"></i>{t('Phone')}</p>
                <p style={{color: 'white'}}><i className="fa fa-envelope mr-2"></i>{t('Email')}</p>
                <div className="d-flex justify-content-start mt-4">
                  <a className="btn btn-outline-light btn-square mr-2" href="#"><i className="fab fa-twitter"></i></a>
                  <a className="btn btn-outline-light btn-square mr-2" href="#"><i className="fab fa-facebook-f"></i></a>
                  <a className="btn btn-outline-light btn-square mr-2" href="#"><i className="fab fa-linkedin-in"></i></a>
                  <a className="btn btn-outline-light btn-square" href="#"><i className="fab fa-instagram"></i></a>
                </div>
              </div>
              <div className="col-md-6 mb-5">
                <h5 className="text-primary text-uppercase mb-4" style={{ letterSpacing: '5px' }}>{t('Our Courses')}</h5>
                <div className="d-flex flex-column justify-content-start">
                  <a className="text-white mb-2" href="#"><i className="fa fa-angle-right mr-2"></i>{t('Web Design')}</a>
                  <a className="text-white mb-2" href="#"><i className="fa fa-angle-right mr-2"></i>{t('Apps Design')}</a>
                  <a className="text-white mb-2" href="#"><i className="fa fa-angle-right mr-2"></i>{t('Marketing')}</a>
                  <a className="text-white mb-2" href="#"><i className="fa fa-angle-right mr-2"></i>{t('Research')}</a>
                  <a className="text-white" href="#"><i className="fa fa-angle-right mr-2"></i>{t('SEO')}</a>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-5 col-md-12 mb-5">
            <h5 className="text-primary text-uppercase mb-4" style={{ letterSpacing: '5px' }}>{t('Newsletter')}</h5>
            <div className="w-100">
              <div className="input-group">
                <input type="text" className="form-control border-light" style={{ padding: '30px' }} placeholder={t('Your Email Address')} />
                <div className="input-group-append">
                  <button className="btn btn-primary px-4">{t('Sign Up')}</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container-fluid bg-dark text-white border-top py-4 px-sm-3 px-md-5">
        <div className="row">
          <div className="col-lg-6 text-center text-md-left mb-3 mb-md-0">
            <p className="m-0 text-white">&copy; <a href="#">{t('Domain Name')}</a>. {t('All Rights Reserved')} {t('Designed by')} <a href="https://htmlcodex.com">HTML Codex</a></p>
          </div>
          <div className="col-lg-6 text-center text-md-right">
            <ul className="nav d-inline-flex">
              <li className="nav-item">
                <a className="nav-link text-white py-0" href="#">{t('Privacy')}</a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-white py-0" href="#">{t('Terms')}</a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-white py-0" href="#">{t('FAQs')}</a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-white py-0" href="#">{t('Help')}</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      {/* Footer End */}
    </footer>
  );
};

export default Footer;
