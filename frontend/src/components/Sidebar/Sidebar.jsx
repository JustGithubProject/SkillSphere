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
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

const InputField = styled.input`
  margin-bottom: 10px;
  padding: 12px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  color: #34495e;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  &:focus {
    outline: none;
    border: 1px solid #3498db;
  }
`;

const SubmitButton = styled.input`
  padding: 12px;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease;

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

  ${({ isActive }) => isActive && `
    background-color: #3d566e; 
    font-weight: bold; 
  `}

  &:hover {
    background-color: #3d566e;
  }
`;

const MainContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
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
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-top: 20px;
`;

const LessonItem = styled.div`
  padding: 15px;
  border: 1px solid #ddd; 
  border-radius: 5px; 
  margin-bottom: 10px; 
  transition: background-color 0.3s ease;
  cursor: pointer;

  &:hover {
    background-color: #f1c40f; 
  }
`;

const LessonTitle = styled.h2`
  margin: 0;
  font-size: 18px;
  color: #34495e;
`;

const LessonDescription = styled.p`
  font-size: 14px;
  color: #7f8c8d;
`;

const StepContainer = styled.div`
  margin-left: 20px;
  padding: 10px;
  background-color: #ecf0f1;
  border-radius: 5px;
`;

const StepItem = styled.div`
  margin-bottom: 10px;
  padding: 10px;
  background-color: #bdc3c7;
  border-radius: 5px;
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

const Sidebar = ({ course_id }) => {
  const [modules, setModules] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [currentModule, setCurrentModule] = useState(null);
  const [lessonTitle, setLessonTitle] = useState('');
  const [lessonDescription, setLessonDescription] = useState('');
  const [openLessons, setOpenLessons] = useState({});

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

  const handleCreateLesson = async (module_id) => {
    try {
      const accessToken = Cookies.get("access_token");
      await axios.post(
        'http://127.0.0.1:8000/api/v1/lesson',
        {
          title: lessonTitle,
          description: lessonDescription,
          module_id: module_id,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          }
        }
      )
      setLessonTitle(''); 
      setLessonDescription(''); 
      window.location.reload();
      
    } catch(error) {
      console.log("Failed to create lesson: ", error);
    }
  }

  const handleOpenLessons = (module) => {
    setIsOpen(true);
    setCurrentModule(module);
  };

  const handleToggleLesson = (lessonId) => {
    setOpenLessons((prevOpenLessons) => ({
      ...prevOpenLessons,
      [lessonId]: !prevOpenLessons[lessonId],
    }));
  };

  const handleRemoveLesson = async (lesson_id) => {
    const accessToken = Cookies.get("access_token");
    try {
      await axios.delete(
        `http://127.0.0.1:8000/api/v1/lesson/${lesson_id}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        }
      )
      window.location.reload();
    } catch(error) {
      console.log("Failed to remove lesson: ", error);
    }
  }

  return (
    <Container>
      <SidebarContainer>
        <h1>Modules of course</h1>
        {modules.map((module, index) => (
          <ModuleButton key={index} onClick={() => handleOpenLessons(module)} isActive={currentModule?.id === module.id}>
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
            <h1 style={{ color: '#2c3e50', marginBottom: '20px', textAlign: 'center' }}>
              Lessons for {currentModule.title} module
            </h1>
              {currentModule.lessons.length === 0 ? (
                <p>The module is empty</p>
              ) : (
                currentModule.lessons.map((lesson, index) => (
                  <div key={index}>
                    <LessonItem onClick={() => handleToggleLesson(lesson.id)}>
                      <LessonTitle>{lesson.title}</LessonTitle>
                      <LessonDescription>{lesson.description}</LessonDescription>
                      <RemoveButton onClick={() => handleRemoveLesson(lesson.id)}>Remove</RemoveButton>
                    </LessonItem>
                    {openLessons[lesson.id] && (
                      <StepContainer>
                        {/* {lesson.steps.map((step, stepIndex) => ( */}
                        {/* <StepItem >{step}</StepItem>   */}
                        {/* // ))} */}
                      </StepContainer>
                    )}
                  </div>
                ))
              )}
            </LessonsContainer>
            <FormContainer onSubmit={(e) => {
              e.preventDefault();
              handleCreateLesson(currentModule.id);
            }}>
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
              <SubmitButton type="submit" value="Create Lesson" />
            </FormContainer>
          </>
        )}
      </MainContent>
    </Container>
  );
};

export default Sidebar;
