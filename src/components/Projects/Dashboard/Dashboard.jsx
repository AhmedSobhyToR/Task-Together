import React, { useContext, useState, useEffect } from 'react';
import { ProjectsContext } from './ProjectsContext';
import { getCookie } from '../cookieUtils';
import ColumnChart from './ColumnChart/ColumnChart';
import MemberProgressChart from './MemberChart/MemberProgressChart';


const Dashboard = () => {
  const { getProjectById } = useContext(ProjectsContext);
  const project = getProjectById(getCookie("projectId"));
  const [progressData, setProgressData] = useState(null);
  const [memberStatistics, setMemberStatistics] = useState(null);
  const token = getCookie('token');

  // Helper function to calculate remaining time
  const calculateRemainingTime = (deadline, startDate) => {
    if (!deadline || !startDate) return 'N/A';

    const deadlineDate = new Date(deadline);
    const startDateDate = new Date(startDate);

    if (isNaN(deadlineDate) || isNaN(startDateDate)) return 'Invalid dates';

    const diffTime = Math.abs(deadlineDate - startDateDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); // Convert to days

    return `${diffDays} days remaining`;
  };

  const remainingTime = project ? calculateRemainingTime(project.deadline, new Date()) : 'N/A';

  useEffect(() => {
    async function fetchDashboardData() {
      try {
        const [projectResponse, memberResponse] = await Promise.all([
          fetch(`https://task-together-2020.onrender.com/projects/${getCookie("projectId")}/projectStatistics`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'authorization': token,
            },
          }),
          fetch(`https://task-together-2020.onrender.com/projects/${getCookie("projectId")}/memberStatistics`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'authorization': token,
            },
          }),
        ]);

        if (projectResponse.ok && memberResponse.ok) {
          const projectResult = await projectResponse.json();
          const memberResult = await memberResponse.json();
          setProgressData(projectResult.data);
          setMemberStatistics(memberResult.data);
        } else {
          if (!projectResponse.ok) {
            console.error('Error fetching project statistics:', projectResponse.statusText);
          }
          if (!memberResponse.ok) {
            console.error('Error fetching member statistics:', memberResponse.statusText);
          }
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }

    fetchDashboardData();
  }, [token]);

  return (
    <>
    
    <section id="dashboard">
      
      <div className="project-dashboard">
      <h2>Dashboard</h2>
        <div className="remaining-time">
          {project ? remainingTime : 'Project not found'}
        </div>
        <div className="progress-data">
          {progressData ? (
            <ColumnChart 
              data={progressData.totalCompletedTasksWeightInterval} 
              maxDayWeight={progressData.maxDayWeight} 
            />
          ) : 'Loading project statistics...'}
        </div>
        <div className="member-statistics">
          {memberStatistics ? <MemberProgressChart data={memberStatistics} />: 'Loading member statistics...'}
        </div>
      </div>
      <span></span>
    </section>
    </>
    
  );
};

export default Dashboard;