import React, { useState, useEffect } from 'react';
import { getCookie } from './cookieUtils';
import { useNavigate } from 'react-router-dom';
import ProjectMembers from './ProjectMembers/ProjectMembers.jsx';
import ProjectTasks from './ProjectTasks/ProjectTasks.jsx';
import Dashboard from './Dashboard/Dashboard.jsx';
import MyTasks from './MyTasks/MyTasks.jsx';
import LogOut from '../LogOut/LogOut';
import styles from './Projects.module.css';

const Projects = () => {
  const [token, setToken] = useState(getCookie("token"));
  const [activeTab, setActiveTab] = useState('project-members');
  const [, setIsNavExpanded] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    setToken(getCookie("token"));
  }, []);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <>
    <div className={styles.projectsec}>

  
          <nav 
            id="navSide" 
            className={`side-nav d-flex flex-column text-light expanded`}
            onMouseEnter={() => setIsNavExpanded(true)}
            onMouseLeave={() => setIsNavExpanded(false)}
          >
            <div className="nav-logo">{  <div className="logo">Task Together</div>}</div>
            <button className="nav-link" onClick={() => handleTabClick('project-members')}>
              <i className="fa-solid fa-users"></i> {  'Project Members'}
            </button>
            <button className="nav-link" onClick={() => handleTabClick('my-tasks')}>
              <i className="fa-solid fa-bullhorn"></i> {  'My Tasks'}
            </button>
            <button className="nav-link" onClick={() => handleTabClick('project-tasks')}>
              <i className="fa-solid fa-table-list"></i> { 'Project Tasks'}
            </button>
            <button className="nav-link" onClick={() => handleTabClick('dashboard')}>
            <i class="fa-solid fa-clipboard"></i> { 'Dashboard'}
            </button>
            <button className="nav-link logOutBtn" onClick={() => handleTabClick('LogOut')}>
              <i className="fa-solid fa-sign-out-alt"></i> {  'Log Out'}
            </button>
          </nav>

          <>
            {activeTab === 'project-members' && <ProjectMembers token={token} />}
            {activeTab === 'my-tasks' && <MyTasks token={token} />}
            {activeTab === 'project-tasks' && <ProjectTasks token={token} />}
            {activeTab === 'dashboard' && <Dashboard token={token} />}
            {activeTab === 'LogOut' && <LogOut token={token} />}
          </>
      


          </div>
  
     
    </>
  );
};

export default Projects;
