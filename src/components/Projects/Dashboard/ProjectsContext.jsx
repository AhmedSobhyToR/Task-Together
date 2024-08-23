// src/contexts/ProjectsContext.js
import React, { createContext, useState, useEffect } from 'react';
import { getCookie } from '../cookieUtils';

export const ProjectsContext = createContext();

export const ProjectsProvider = ({ children }) => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    getProjects();
  }, []);

  const getProjects = async () => {
    try {
      const response = await fetch(`https://task-together-2020.onrender.com/groups/${getCookie("groupId")}/projects`, {
        headers: {
          'Content-Type': 'application/json',
          'authorization': getCookie("token")
        }
      });

      if (response.ok) {
        const data = await response.json();
        setProjects(data.data);
      } else {
        console.error('Error fetching projects:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching projects:', error.message);
    }
  };

  const getProjectById = (id) => {
    return projects.find(project => project._id === id);
  };

  return (
    <ProjectsContext.Provider value={{ projects, setProjects, getProjects, getProjectById }}>
      {children}
    </ProjectsContext.Provider>
  );
};
