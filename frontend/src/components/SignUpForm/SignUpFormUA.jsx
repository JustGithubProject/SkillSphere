import React, { useState } from 'react';
import axios from 'axios';

const SignUpFormUA = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [retypePassword, setRetypePassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [step, setStep] = useState('signup');

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== retypePassword) {
      alert('Паролі не збігаються');
      return;
    }

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/v1/jwt/auth/signup/', {
        email: email,
        username: username,
        password_hash: password,
        first_name: firstName,
        last_name: lastName
      }, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log('Код верифікації надіслано:', response.data);
      setStep('verify');
    } catch (error) {
      console.error('Помилка створення користувача:', error);
    }
  };

  const handleVerification = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/v1/jwt/auth/confirm/code/', {
        email: email,
        username: username,
        password_hash: password,
        first_name: firstName,
        last_name: lastName,
        code: verificationCode,
      }, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log('Верифікація успішна:', response.data);
      window.location.href = "/login"
    } catch (error) {
      console.error('Помилка верифікації коду:', error);
    }
  };

  return (
    <div>
      {step === 'signup' ? (
        <form onSubmit={handleSubmit} className="form-box">
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              placeholder="Електронна адреса"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              placeholder="Ім'я користувача"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              placeholder="Ім'я"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              placeholder="Прізвище"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              placeholder="Пароль"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="form-group mb-4">
            <input
              type="password"
              className="form-control"
              placeholder="Повторіть пароль"
              value={retypePassword}
              onChange={(e) => setRetypePassword(e.target.value)}
            />
          </div>
          <div className="form-group">
            <input
              type="submit"
              className="btn btn-warning btn-pill"
              value="Зареєструватися"
            />
          </div>
        </form>
      ) : (
        <form onSubmit={handleVerification} className="form-box">
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              placeholder="Код верифікації"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
            />
          </div>
          <div className="form-group">
            <input
              type="submit"
              className="btn btn-warning btn-pill"
              value="Верифікувати"
            />
          </div>
        </form>
      )}
    </div>
  );
};

export default SignUpFormUA;
