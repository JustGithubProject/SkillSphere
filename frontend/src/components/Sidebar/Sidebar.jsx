import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Module from './Module';

import axios from 'axios';
import Cookies from 'js-cookie';

const Container = styled.div`
  display: flex;
  height: 100vh;
`;

const SidebarContainer = styled.div`
  width: 300px;
  height: 100%;
  background-color: #34495e;
  color: #ecf0f1;
  padding: 20px;
  overflow-y: auto;
`;

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  padding: 20px;
  background-color: #2c3e50;
  border-radius: 10px;
`;

const InputField = styled.input`
  margin-bottom: 10px;
  padding: 10px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  color: #2c3e50;
`;

const SubmitButton = styled.input`
  padding: 10px;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;

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
  padding: 15px 10px;
  text-align: left;
  cursor: pointer;
  font-size: 18px;
  transition: background-color 0.3s ease;
  border-radius: 5px;

  &:hover {
    background-color: #3d566e;
  }
`;

const MainContent = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  background-color: #ecf0f1;
  padding: 20px;
`;

const LessonsContainer = styled.div`
  padding: 20px;
  background-color: #fff;
  color: #2c3e50;
  border-radius: 10px;
  width: 80%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const LessonItem = styled.div`
  padding: 10px;
  border-bottom: 1px solid #ddd;
  font-size: 16px;

  &:last-child {
    border-bottom: none;
  }
`;

const Sidebar = ({ course_id }) => {
  const [modules, setModules] = useState([]);
  const [lessons, setLessons] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const [isOpen, setIsOpen] = useState(false);
  const [currentModule, setCurrentModule] = useState(null);

  const [lessonTitle, setLessonTitle] = useState('');
  const [lessonDescription, setLessonDescription] = useState('');

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

  useEffect(() => {
    const fetchLessonsOfModule = async () => {
      if (currentModule) {
        try {
          const accessToken = Cookies.get("access_token");
          const response = await axios.get(
            `http://127.0.0.1:8000/api/v1/lesson/all/${currentModule.id}`,
            {
              headers: {
                Authorization: `Bearer ${accessToken}`
              }
            }
          )
          setLessons(response.data);
        } catch(error) {
          console.log("Error fetching lessons: ", error);
        }
      }
    }

    fetchLessonsOfModule();
  }, [currentModule]);

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

  const handleCreateLesson = async () => {
    try {
      const accessToken = Cookies.get("access_token");
      await axios.post(
        'http://127.0.0.1:8000/api/v1/lesson',
        {
          title: lessonTitle,
          description: lessonDescription,
          module_id: currentModule.id,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          }
        }
      )
      window.location.reload();
    } catch(error) {
      console.log("Failed to create lesson: ", error);
    }
  }

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
            placeholder="Module Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="form-field"
          />
          <InputField
            type="text"
            placeholder="Module Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="form-field"
          />
          <SubmitButton type="submit" value="Create Module" />
        </FormContainer>
      </SidebarContainer>
      <MainContent>
        {isOpen && currentModule && (
          <>
            <LessonsContainer>
              <h1>Lessons for {currentModule.title} module</h1>
              {lessons.map((lesson, index) => (
                <LessonItem key={index}>{lesson.title}</LessonItem>
              ))}
            </LessonsContainer>
            <FormContainer onSubmit={handleCreateLesson}>
              <InputField
                type="text"
                placeholder="Lesson Title"
                value={lessonTitle}
                onChange={(e) => setLessonTitle(e.target.value)}
                className="form-field"
              />
              <InputField
                type="text"
                placeholder="Lesson Description"
                value={lessonDescription}
                onChange={(e) => setLessonDescription(e.target.value)}
                className="form-field"
              />
            </FormContainer>
          </>
        )}
      </MainContent>
    </Container>
  );
};

export default Sidebar;
