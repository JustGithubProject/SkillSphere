import React from 'react';

const FooterUA = () => {
  return (
    <footer>
      {/* Footer Start */}
      <div className="container-fluid bg-dark text-white py-5 px-sm-3 px-lg-5" style={{ marginTop: '90px' }}>
        <div className="row pt-5">
          <div className="col-lg-7 col-md-12">
            <div className="row">
              <div className="col-md-6 mb-5">
                <h5 className="text-primary text-uppercase mb-4" style={{ letterSpacing: '5px' }}>Зв'яжіться з нами</h5>
                <p><i className="fa fa-map-marker-alt mr-2"></i>Вулиця 123, Нью-Йорк, США</p>
                <p><i className="fa fa-phone-alt mr-2"></i>+012 345 67890</p>
                <p><i className="fa fa-envelope mr-2"></i>info@example.com</p>
                <div className="d-flex justify-content-start mt-4">
                  <a className="btn btn-outline-light btn-square mr-2" href="#"><i className="fab fa-twitter"></i></a>
                  <a className="btn btn-outline-light btn-square mr-2" href="#"><i className="fab fa-facebook-f"></i></a>
                  <a className="btn btn-outline-light btn-square mr-2" href="#"><i className="fab fa-linkedin-in"></i></a>
                  <a className="btn btn-outline-light btn-square" href="#"><i className="fab fa-instagram"></i></a>
                </div>
              </div>
              <div className="col-md-6 mb-5">
                <h5 className="text-primary text-uppercase mb-4" style={{ letterSpacing: '5px' }}>Наші курси</h5>
                <div className="d-flex flex-column justify-content-start">
                  <a className="text-white mb-2" href="#"><i className="fa fa-angle-right mr-2"></i>Веб-дизайн</a>
                  <a className="text-white mb-2" href="#"><i className="fa fa-angle-right mr-2"></i>Дизайн додатків</a>
                  <a className="text-white mb-2" href="#"><i className="fa fa-angle-right mr-2"></i>Маркетинг</a>
                  <a className="text-white mb-2" href="#"><i className="fa fa-angle-right mr-2"></i>Дослідження</a>
                  <a className="text-white" href="#"><i className="fa fa-angle-right mr-2"></i>SEO</a>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-5 col-md-12 mb-5">
            <h5 className="text-primary text-uppercase mb-4" style={{ letterSpacing: '5px' }}>Розсилка новин</h5>
            <p>Ми прагнемо надати якісний контент, що відповідає вашим потребам. Підписуйтеся на нашу розсилку, щоб отримувати останні новини та оновлення.</p>
            <div className="w-100">
              <div className="input-group">
                <input type="text" className="form-control border-light" style={{ padding: '30px' }} placeholder="Ваша електронна адреса" />
                <div className="input-group-append">
                  <button className="btn btn-primary px-4">Підписатися</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container-fluid bg-dark text-white border-top py-4 px-sm-3 px-md-5" style={{ borderColor: 'rgba(256, 256, 256, .1) !important' }}>
        <div className="row">
          <div className="col-lg-6 text-center text-md-left mb-3 mb-md-0">
            <p className="m-0 text-white">&copy; <a href="#">Назва домену</a>. Усі права захищені. Розроблено <a href="https://htmlcodex.com">HTML Codex</a></p>
          </div>
          <div className="col-lg-6 text-center text-md-right">
            <ul className="nav d-inline-flex">
              <li className="nav-item">
                <a className="nav-link text-white py-0" href="#">Конфіденційність</a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-white py-0" href="#">Умови</a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-white py-0" href="#">Поширені запитання</a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-white py-0" href="#">Допомога</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      {/* Footer End */}
    </footer>
  );
};

export default FooterUA;
