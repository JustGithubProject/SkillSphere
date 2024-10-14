import React, { useState } from 'react';
import styled from 'styled-components';
import Lesson from './Lesson';

const ModuleContainer = styled.div`
  margin-bottom: 10px;
`;

const ModuleHeader = styled.div`
  font-weight: bold;
  cursor: pointer;
  padding: 10px;
  background-color: #34495e;
`;

const LessonsContainer = styled.div`
  padding-left: 20px;
`;

const Module = ({ module }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <ModuleContainer>
      <ModuleHeader onClick={toggleOpen}>
        {/* {module.name} */}
      </ModuleHeader>
      {isOpen && (
        <LessonsContainer>
          {/* {module.lessons.map((lesson, index) => (
            <Lesson key={index} lesson={lesson} />
          ))} */}
        </LessonsContainer>
      )}
    </ModuleContainer>
  );
};

export default Module;
