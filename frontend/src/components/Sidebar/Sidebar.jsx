import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Module from './Module';

import axios from 'axios';
import Cookies from 'js-cookie';

const Container = styled.div`
  display: flex;
`;

const SidebarContainer = styled.div`
  width: 250px;
  height: 100vh;
  background-color: #2c3e50;
  color: #ecf0f1;
  padding: 20px;
  overflow-y: auto;
`;

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
`;

const InputField = styled.input`
  margin-bottom: 10px;
  padding: 10px;
  border: none;
  border-radius: 5px;
`;

const SubmitButton = styled.input`
  padding: 10px;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #2980b9;
  }
`;

const ModuleButton = styled.button`
  display: block;
  width: 100%;
  background: none;
  color: inherit;
  border: none;
  padding: 10px 0;
  text-align: left;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #34495e;
  }
`;

const MainContent = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #ecf0f1;
`;

const LessonsContainer = styled.div`
  padding: 20px;
  background-color: #ecf0f1;
  color: #2c3e50;
  border-radius: 5px;
`;

const Sidebar = ({ course_id }) => {
  const [modules, setModules] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const [isOpen, setIsOpen] = useState(false);
  const [currentModule, setCurrentModule] = useState(null);

  useEffect(() => {
    const accessToken = Cookies.get('access_token');
    const fetchModulesOfCourse = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/v1/module/all/${course_id}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        setModules(response.data);
      } catch (error) {
        console.error('Error fetching modules:', error);
      }
    };

    fetchModulesOfCourse();
  }, [course_id]);

  const handleCreateModule = async (e) => {
    e.preventDefault();
    try {
      const accessToken = Cookies.get('access_token');
      const response = await axios.post(
        'http://127.0.0.1:8000/api/v1/module',
        {
          title: title,
          description: description,
          course_id: course_id,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (response.status === 201) {
        setModules([...modules, response.data]);
        setTitle('');
        setDescription('');
      }
    } catch (error) {
      console.log('Failed to create module:', error);
    }
  };

  const handleOpenLessons = (module) => {
    setIsOpen(true);
    setCurrentModule(module);
  };

  return (
    <Container>
      <SidebarContainer>
        {modules.map((module, index) => (
          <ModuleButton key={index} onClick={() => handleOpenLessons(module)}>
            <Module module={module} />
          </ModuleButton>
        ))}
        <FormContainer onSubmit={handleCreateModule}>
          <InputField
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="form-field"
          />
          <InputField
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="form-field"
          />
          <SubmitButton type="submit" value="Create Module" />
        </FormContainer>
      </SidebarContainer>
      <MainContent>
        {isOpen && currentModule && (
          <LessonsContainer>
            <h1>Lessons for {currentModule.title} module</h1>
            {/* Here you can add a list or other content representing the lessons */}
          </LessonsContainer>
        )}
      </MainContent>
    </Container>
  );
};

export default Sidebar;
