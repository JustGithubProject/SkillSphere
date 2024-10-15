import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Module from './Module';
import axios from 'axios';
import Cookies from 'js-cookie';

// Global Styles and Color Palette
const theme = {
  primary: '#1abc9c',
  secondary: '#34495e',
  background: '#1e1e1e',
  sidebarBg: '#2c3e50',
  highlight: '#f1c40f',
  accent: '#e74c3c',
  shadow: 'rgba(0, 0, 0, 0.3)',
  textPrimary: '#ecf0f1',
  textSecondary: '#bdc3c7',
};

const Container = styled.div`
  display: flex;
  height: 100vh;
  background: linear-gradient(145deg, ${theme.background}, ${theme.sidebarBg});
  color: ${theme.textPrimary};
`;

const SidebarContainer = styled.div`
  width: 320px;
  height: 100%;
  background-color: ${theme.sidebarBg};
  padding: 25px;
  box-shadow: 5px 0 20px ${theme.shadow};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-right: 2px solid ${theme.primary};
`;

const Heading = styled.h1`
  font-size: 26px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 30px;
  color: ${theme.primary};
  letter-spacing: 1.5px;
`;

const FormContainer = styled.form`
  background-color: ${theme.secondary};
  border-radius: 16px;
  padding: 20px;
  box-shadow: 0 10px 30px ${theme.shadow};
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: scale(1.02);
    box-shadow: 0 12px 40px ${theme.shadow};
  }
`;

const InputField = styled.input`
  background-color: ${theme.sidebarBg};
  color: ${theme.textPrimary};
  border: none;
  padding: 15px;
  margin-bottom: 15px;
  border-radius: 10px;
  font-size: 16px;
  transition: all 0.3s ease;
  box-shadow: inset 0 2px 5px ${theme.shadow};

  &:focus {
    outline: none;
    border: 2px solid ${theme.highlight};
    background-color: ${theme.primary};
    color: ${theme.textPrimary};
  }
`;

const SubmitButton = styled.button`
  background-color: ${theme.primary};
  color: ${theme.textPrimary};
  border: none;
  padding: 14px;
  border-radius: 10px;
  font-size: 18px;
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    background-color: ${theme.highlight};
    transform: scale(1.05);
    box-shadow: 0 10px 25px ${theme.shadow};
  }
`;

const ModuleButton = styled.button`
  width: 100%;
  background: none;
  color: ${theme.textPrimary};
  border: none;
  padding: 18px;
  text-align: left;
  cursor: pointer;
  font-size: 18px;
  transition: background-color 0.3s ease, transform 0.2s, box-shadow 0.3s ease;
  border-radius: 12px;
  box-shadow: 0 6px 15px ${theme.shadow};

  ${({ isActive }) =>
    isActive &&
    `
    background-color: ${theme.primary}; 
    font-weight: bold;
    transform: scale(1.05);
  `}

  &:hover {
    background-color: ${theme.secondary};
    box-shadow: 0 8px 20px ${theme.shadow};
    transform: translateY(-3px);
  }
`;

const MainContent = styled.div`
  flex: 1;
  display: flex;
  justify-content: space-between;
  padding: 40px;
  background: radial-gradient(circle, ${theme.background}, ${theme.sidebarBg});
  color: ${theme.textPrimary};
`;

const LessonsContainer = styled.div`
  background-color: ${theme.secondary};
  padding: 25px;
  border-radius: 20px;
  box-shadow: 0 10px 25px ${theme.shadow};
  width: 65%;
`;

const FormSideContainer = styled.div`
  background-color: ${theme.secondary};
  padding: 25px;
  border-radius: 20px;
  width: 30%;
  box-shadow: 0 10px 25px ${theme.shadow};
`;

const LessonItem = styled.div`
  padding: 20px;
  background-color: ${theme.sidebarBg};
  border-radius: 12px;
  margin-bottom: 20px;
  transition: background-color 0.3s ease, transform 0.2s, box-shadow 0.3s ease;
  cursor: pointer;
  box-shadow: 0 6px 15px ${theme.shadow};

  &:hover {
    background-color: ${theme.primary};
    box-shadow: 0 8px 25px ${theme.shadow};
    transform: translateY(-3px);
  }
`;

const LessonTitle = styled.h2`
  font-size: 22px;
  font-weight: bold;
  color: ${theme.textPrimary};
  margin-bottom: 10px;
`;

const LessonDescription = styled.p`
  font-size: 16px;
  color: ${theme.textSecondary};
`;

const RemoveButton = styled.button`
  background-color: ${theme.accent};
  color: ${theme.textPrimary};
  padding: 10px;
  border: none;
  border-radius: 8px;
  margin-top: 10px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #c0392b;
  }
`;

const StepContainer = styled.div`
  margin-left: 20px;
  padding: 15px;
  background-color: ${theme.sidebarBg};
  border-radius: 10px;
  box-shadow: 0 4px 15px ${theme.shadow};
`;

const StepItem = styled.div`
  margin-bottom: 15px;
  padding: 15px;
  background-color: ${theme.secondary};
  border-radius: 10px;
  box-shadow: 0 4px 10px ${theme.shadow};
  color: ${theme.textPrimary};
  transition: background-color 0.3s ease, transform 0.2s;

  &:hover {
    background-color: ${theme.highlight};
    transform: scale(1.03);
  }
`;

const EmptyMessage = styled.p`
  text-align: center;
  font-size: 24px;  // Increased font size
  font-weight: bold; // Bold text for emphasis
  color: ${theme.textSecondary}; // Use a contrasting color
  margin: 20px 0;  // Add margin for spacing
`;

// Sidebar Component
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

  const handleCreateStep = () => {
    console.log("Empty for a while");
  }

  return (
    <Container>
      <SidebarContainer>
        <Heading>Modules of course</Heading>
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
          <SubmitButton type="submit">Create Module</SubmitButton>
        </FormContainer>
      </SidebarContainer>
      <MainContent>
        {isOpen && currentModule && (
          <>
            <LessonsContainer>
              <h1 style={{ marginBottom: '20px', textAlign: 'center', color: theme.primary }}>
                Lessons
              </h1>
              {currentModule.lessons.length === 0 ? (
                <EmptyMessage>The module is empty</EmptyMessage>
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
                        {lesson.steps.map((step, stepIndex) => (
                        <StepItem key={stepIndex}>{step.text}</StepItem>  
                        ))}
                      </StepContainer>
                    )}
                  </div>
                ))
              )}
            </LessonsContainer>
            <FormSideContainer>
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
                <SubmitButton type="submit">Create Lesson</SubmitButton>
              </FormContainer>
              <FormContainer onSubmit={(e) => {
                e.preventDefault();
                handleCreateStep();
              }}>
                <InputField
                  type="text"
                  placeholder="Step Video Path"
                  value={lessonTitle}
                  onChange={(e) => setLessonTitle(e.target.value)}
                  className="form-field"
                />
                <InputField
                  type="text"
                  placeholder="Step Text"
                  value={lessonDescription}
                  onChange={(e) => setLessonDescription(e.target.value)}
                  className="form-field"
                />
                <SubmitButton type="submit">Create Step</SubmitButton>
              </FormContainer>
            </FormSideContainer>
          </>
        )}
      </MainContent>
    </Container>
  );
};

export default Sidebar;
