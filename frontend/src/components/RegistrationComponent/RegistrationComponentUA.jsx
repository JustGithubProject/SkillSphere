import React from 'react';

import SignUpFormUA from '../SignUpForm/SignUpFormUA';

const RegistrationComponentUA = () => {
    return (
        <div className="container-fluid bg-registration py-5" style={{ margin: '90px 0' }}>
            <div className="container py-5">
                <div className="row align-items-center">
                    <div className="col-lg-7 mb-5 mb-lg-0">
                        <div className="mb-4">
                            <h5 className="text-primary text-uppercase mb-3" style={{ letterSpacing: '5px' }}>
                                Потрібні курси?
                            </h5>
                            <h1 className="text-white">30% знижка для нових студентів</h1>
                        </div>
                        <p className="text-white">
                            Ми прагнемо забезпечити високоякісний освітній контент,
                            який відповідає потребам сучасних учнів.
                            Наша платформа пропонує широкий вибір курсів у різних галузях,
                            щоб ви могли знайти те, що підходить саме вам. Приєднуйтесь до нас, щоб розпочати
                            перетворюючу навчальну подорож, яка наділить вас навичками, необхідними для
                            досягнення успіху в сучасному конкурентному середовищі.
                        </p>
                        <ul className="list-inline text-white m-0">
                            <li className="py-2"><i className="fa fa-check text-primary mr-3"></i>Досвідчені викладачі, які ведуть вас у навчанні</li>
                            <li className="py-2"><i className="fa fa-check text-primary mr-3"></i>Комплексні ресурси та підтримка доступні</li>
                            <li className="py-2"><i className="fa fa-check text-primary mr-3"></i>Гнучкий графік навчання, щоб відповідати вашому стилю життя</li>
                        </ul>
                    </div>
                    <div className="col-lg-5">
                        <div className="card border-0">
                            <div className="card-header bg-light text-center p-4">
                                <h1 className="m-0">Зареєструйтесь зараз</h1>
                            </div>
                            <div className="card-body rounded-bottom bg-primary p-5">
                                <SignUpFormUA/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegistrationComponentUA;
