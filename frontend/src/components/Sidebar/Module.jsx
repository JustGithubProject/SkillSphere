import React, { useState } from 'react';
import styled from 'styled-components';
import Lesson from './Lesson';
import axios from 'axios';
import Cookies from 'js-cookie';

const ModuleContainer = styled.div`
  margin-bottom: 10px;
`;

const ModuleHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-weight: bold;
  cursor: pointer;
  padding: 10px;
  background-color: #34495e;
`;

const Title = styled.div`
  flex: 1;
`;

const RemoveButton = styled.button`
  background-color: red;
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
  margin-left: 10px;

  &:hover {
    background-color: darkred;
  }
`;


const Module = ({ module }) => {
  const handleRemoveModule = async (module_id) => {
    const accessToken = Cookies.get("access_token");
    try {
      await axios.delete(
        `http://127.0.0.1:8000/api/v1/module/${module_id}`,
        {
          headers: {
            'Authorization': `Bearer ${accessToken}`
          }
        }
      );
      window.location.reload();
    } catch(error) {
      console.log("Failed to remove module");
    }
  };



  return (
    <ModuleContainer>
      <ModuleHeader>
        <Title>{module.title}</Title>
        <RemoveButton onClick={() => handleRemoveModule(module.id)}>Remove</RemoveButton>
      </ModuleHeader>
      

    </ModuleContainer>
  );
};

export default Module;
