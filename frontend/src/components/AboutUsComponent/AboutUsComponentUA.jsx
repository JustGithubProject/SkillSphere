import React from 'react';

const AboutUsComponentUA = () => {
  return (
    <div className="container-fluid py-5">
      <div className="container py-5">
        <div className="row align-items-center">
          <div className="col-lg-5">
            <img
              className="img-fluid rounded mb-4 mb-lg-0"
              src="img/about.jpg"
              alt="Про нас"
            />
          </div>
          <div className="col-lg-7">
            <div className="text-left mb-4">
              <h5 className="text-primary text-uppercase mb-3" style={{ letterSpacing: '5px' }}>
                Про нас
              </h5>
              <h1>Інноваційний спосіб навчання</h1>
            </div>
            <p>
              Наша місія полягає в тому, щоб надати можливості учням по всьому світу,
              забезпечуючи високоякісний навчальний контент та підтримуючу спільноту.
              Ми використовуємо інноваційні технології, щоб створювати інтерактивні навчальні
              досвіди, які допомагають вам залишатися залученими та мотивованими.
              Від відеолекцій і тестів до форумів обговорень і практичних проєктів,
              наші курси відповідають різним стилям навчання.
            </p>
            <a href="#" className="btn btn-primary py-md-2 px-md-4 font-weight-semi-bold mt-2">
              Дізнатися більше
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUsComponentUA;
