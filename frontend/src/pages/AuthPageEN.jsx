import React, { useState, useEffect } from 'react';
import LoginFormEN from '../components/LoginForm/LoginFormEN';
import LoginFormUA from '../components/LoginForm/LoginFormUA';
import SignUpFormEN from '../components/SignUpForm/SignUpFormEN';
import SignUpFormUA from '../components/SignUpForm/SignUpFormUA';
import styled from 'styled-components';

const MainContainer = styled.div`
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  font-family: 'Jost', sans-serif;
  background: linear-gradient(to bottom, #0f0c29, #302b63, #24243e);
`;

const Checkbox = styled.input`
  display: none;
`;

const AuthWrapper = styled.div`
  width: 350px;
  height: 500px;
  background: red;
  overflow: hidden;
  background: url("https://doc-08-2c-docs.googleusercontent.com/docs/securesc/68c90smiglihng9534mvqmq1946dmis5/fo0picsp1nhiucmc0l25s29respgpr4j/1631524275000/03522360960922298374/03522360960922298374/1Sx0jhdpEpnNIydS4rnN4kHSJtU1EyWka?e=view&authuser=0&nonce=gcrocepgbb17m&user=03522360960922298374&hash=tfhgbs86ka6divo3llbvp93mg4csvb38") no-repeat center/ cover;
  border-radius: 10px;
  box-shadow: 5px 20px 50px #000;
  position: relative;
`;

const Signup = styled.div`
  position: relative;
  height: 100%;
`;

const Label = styled.label`
  color: #fff;
  font-size: 2.3em;
  justify-content: center;
  display: flex;
  margin: 60px;
  font-weight: bold;
  cursor: pointer;
  transition: .5s ease-in-out;
`;

const Input = styled.input`
  width: 60%;
  height: 20px;
  background: #e0dede;
  justify-content: center;
  display: flex;
  margin: 20px auto;
  padding: 10px;
  border: none;
  outline: none;
  border-radius: 5px;
`;

const Button = styled.button`
  width: 60%;
  height: 40px;
  margin: 10px auto;
  justify-content: center;
  display: block;
  color: #fff;
  background: #573b8a;
  font-size: 1em;
  font-weight: bold;
  margin-top: 20px;
  outline: none;
  border: none;
  border-radius: 5px;
  transition: .2s ease-in;
  cursor: pointer;

  &:hover {
    background: #6d44b8;
  }
`;

const Login = styled.div`
  height: 460px;
  background: #eee;
  border-radius: 60% / 10%;
  transform: translateY(-180px);
  transition: .8s ease-in-out;

  ${Checkbox}:checked + & {
    transform: translateY(-500px);
  }

  & label {
    color: #573b8a;
    transform: scale(.6);

    ${Checkbox}:checked ~ ${Signup} & {
      transform: scale(1);
    }
  }
`;

const AuthPage = () => {
    const [currentLanguage, setCurrentLanguage] = useState('en');

    useEffect(() => {
        const currentLang = localStorage.getItem("language_key");
        setCurrentLanguage(currentLang);
    }, []);

    return (
        <MainContainer>
            <Checkbox type="checkbox" id="chk" aria-hidden="true" />
            <AuthWrapper>
                <Login>
                    {currentLanguage === 'en' ? <LoginFormEN /> : <LoginFormUA />}
                </Login>
                <Signup>
                    {currentLanguage === 'en' ? <SignUpFormEN /> : <SignUpFormUA />}
                </Signup>
            </AuthWrapper>
        </MainContainer>
    );
}

export default AuthPage;
