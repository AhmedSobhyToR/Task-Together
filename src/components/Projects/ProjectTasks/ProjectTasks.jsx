import React, { useEffect, useState } from 'react';
import './ProjectTasks.css';
import { getCookie } from '../cookieUtils';

const ProjectTasks = ({ token }) => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    async function fetchProjectTasks() {
      try {
        const response = await fetch(`https://task-together-2020.onrender.com/projects/${getCookie("projectId")}/memberstatistics`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'authorization': token,
          },
        });
        if (response.ok) {
          const result = await response.json();
          setTasks(result.data);
        } else {
          console.error('Error:', response.statusText);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }

    fetchProjectTasks();
  }, [token]);

  return (
    <section id="project-tasks" className="section">
      <div className="project-tasks accordion accordion-flush" id="accordionFlushExample">
        <h2>Project Tasks</h2>
        {tasks.map((member, index) => {
          const completedTasks = member.tasks.filter(task => task.completedDate !== null).length;
          const incompleteTasks = member.tasks.length - completedTasks;

          return (
            <div className="accordion-item" key={index}>
              <h2 className="accordion-header" id={`flush-heading${index}`}>
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={`#flush-collapse${index}`} aria-expanded="false" aria-controls={`flush-collapse${index}`}>
                  {member.member.nickname} ({completedTasks} <i className="fa-solid fa-circle-check"></i>, {incompleteTasks} <i className="fa-regular fa-hourglass-half"></i>)
                </button>
              </h2>
              <div id={`flush-collapse${index}`} className="accordion-collapse collapse" aria-labelledby={`flush-heading${index}`} data-bs-parent="#accordionFlushExample">
                <div className="accordion-body">
                  {member.tasks.map(task => (
                    <div key={task._id} className={`task ${task.completedDate ? 'completed' : 'incomplete'}`}>
                      <span>Title: {task.title}</span>
                      <p>Description: {task.description}</p>
                      <p>Deadline: {new Date(task.deadline).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                      <p>Weight: {task.weight}</p>
                      <p>Status: {task.completedDate ? <i className="fa-solid fa-circle-check"></i> : <i className="fa-regular fa-hourglass-half"></i>}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default ProjectTasks;
