import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Module from './Module';

import axios from 'axios';
import Cookies from 'js-cookie';

const SidebarContainer = styled.div`
  width: 250px;
  height: 100vh;
  background-color: #2c3e50;
  color: #ecf0f1;
  padding: 20px;
  overflow-y: auto; 
`;

const Sidebar = ( {course_id }) => {

  const [modules, setModules] = useState([]);
  
  useEffect(() => {
    const accessToken = Cookies.get("access_token");
    const fetchModulesOfCourse = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/v1/module/all/${course_id}`,
          {
            headers: {
              'Authorization': `Bearer ${accessToken}`
            }
          }
        );
        setModules(response.data);
      } catch(error) {
        console.error("Error fetching modules:", error);
      }
    }

    fetchModulesOfCourse();
  }, [course_id]); 

  return (
    <SidebarContainer>
      {modules.map((module, index) => (
        <Module key={index} module={module} />
      ))}
    </SidebarContainer>
  );
};

export default Sidebar;
