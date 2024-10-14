import React from 'react';
import styled from 'styled-components';
import Module from './Module';

const SidebarContainer = styled.div`
  width: 250px;
  height: 100vh;
  background-color: #2c3e50;
  color: #ecf0f1;
  padding: 20px;
  overflow-y: auto; 
`;

const Sidebar = ({ modules }) => {
  return (
    <SidebarContainer>
      {/* {modules.map((module, index) => (
        <Module key={index} module={module} />
      ))} */}
    </SidebarContainer>
  );
};

export default Sidebar;
