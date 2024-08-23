import React, { useEffect, useState } from 'react';
import { getCookie } from '../cookieUtils';
import './MyTasks.css';

const MyTasks = ({ token }) => {
  const [tasks, setTasks] = useState([]);
  const [taskTitle, settaskTitle] = useState('');
  const [taskDescription, settaskDescription] = useState('');
  const [taskDeadline, setTaskDeadline] = useState('');
  const [taskWeight, setTaskWeight] = useState(''); // New state for task weight
  const [selectedMember, setSelectedMember] = useState('');
  const [showAddTaskForm, setShowAddTaskForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [members, setMembers] = useState([]);

  useEffect(() => {
    getMyTasks();
    getProjectMembers();
  }, [token]);

  useEffect(() => {
    document.querySelectorAll("input[type='checkbox']").forEach(check => {
      check.addEventListener("click", function() {
        markTaskCompleted(check.getAttribute("taskId"))
          .then(() => getMyTasks())
          .catch(error => {
            console.error("An error occurred:", error);
          });
      });
    });
  }, [tasks]);

  const markTaskCompleted = async (taskId) => {
    try {
      const response = await fetch(`https://task-together-2020.onrender.com/tasks/${taskId}/tick`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'authorization': getCookie("token"),
        },
      });

      if (response.ok) {
        const data = await response.json();
      }
    } catch (error) {
      console.error('Error marking task as completed:', error);
    }
  };

  const getProjectMembers = async () => {
    try {
      const projectId = getCookie("projectId");
      const response = await fetch(`https://task-together-2020.onrender.com/projects/${projectId}/members`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'authorization': getCookie("token"),
        },
      });

      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }

      const data = await response.json();

      if (Array.isArray(data.data)) {
        setMembers(data.data);
      } else {
        throw new Error('Invalid response format');
      }
    } catch (error) {
      console.error('Error fetching members:', error);
    }
  };

  const getMyTasks = async () => {
    try {
      const response = await fetch(`https://task-together-2020.onrender.com/projects/${getCookie("projectId")}/tasks`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'authorization': getCookie("token"),
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
  };

  const createTask = async () => {
    try {
      const response = await fetch(`https://task-together-2020.onrender.com/projects/${getCookie("projectId")}/tasks`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'authorization': getCookie("token"),
        },
        body: JSON.stringify({
          "title": taskTitle,
          "description": taskDescription,
          "deadline": taskDeadline,
          "weight": taskWeight, // Include task weight in the request body
          "assignedMember": selectedMember
        }),
      });
      if (response.ok) {
        const result = await response.json();
        setTasks([result.data, ...tasks]);
        settaskTitle('');
        settaskDescription('');
        setTaskDeadline('');
        setTaskWeight(''); // Reset task weight input
        setSelectedMember('');
        toggleAddTaskForm();
        getMyTasks();
      } else {
        console.error('Error:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const toggleAddTaskForm = () => {
    setShowAddTaskForm(!showAddTaskForm);
  };

  const handleTitleChange = (event) => {
    settaskTitle(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    settaskDescription(event.target.value);
  };

  const handleDeadlineChange = (event) => {
    setTaskDeadline(event.target.value);
  };

  const handleWeightChange = (event) => {
    setTaskWeight(event.target.value); // Handle weight input change
  };

  const handleMemberChange = (event) => {
    setSelectedMember(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredTasks = tasks.filter(task =>
    task.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="app-container">
      <div className="main-content">
        <section id="my-tasks" className="section">
          <div className="my-tasks-header">
            <div className='headerAbilityDiv'>
              <div className='menuBtn'>
                <i className='fa-solid fa-ellipsis-vertical' onClick={toggleAddTaskForm}></i>
              </div>
            </div>
            <h2>My Tasks</h2>
            <input
              type="text"
              placeholder="Search by Task Title"
              value={searchQuery}
              onChange={handleSearchChange}
              className="search-input"
            />
          </div>

          {showAddTaskForm && (
            <div className='addGroupArea'>
              <div>
                <h3>Title</h3>
                <input
                  type='text'
                  value={taskTitle}
                  placeholder='Task Title'
                  onChange={handleTitleChange}
                />
              </div>
              <div>
                <h3>Description</h3>
                <textarea
                  value={taskDescription}
                  onChange={handleDescriptionChange}
                  placeholder='Task Description'
                ></textarea>
              </div>
              <div>
                <h3>Deadline</h3>
                <input
                  type='date'
                  value={taskDeadline}
                  onChange={handleDeadlineChange}
                />
              </div>
              <div>
                <h3>Weight</h3> {/* New input for task weight */}
                <input
                  type='number'
                  value={taskWeight}
                  onChange={handleWeightChange}
                  placeholder='Task Weight'
                />
              </div>
              <div>
                <h3>Assign to</h3>
                <select value={selectedMember} onChange={handleMemberChange}>
                  <option value=''>Select Member</option>
                  {members.map(member => (
                    <option key={member._id} value={member._id}>{member.username}</option>
                  ))}
                </select>
              </div>
              <button onClick={createTask}>Create Task</button>
            </div>
          )}
          <div className="my-tasks">
            {filteredTasks.map(task => (
              <div className="each-task" key={task._id}>
                <input type="checkbox" taskId={task._id} defaultChecked={task.completedDate !== null} />
                <div>
                  <h2>{task.title}</h2>
                  <p>{task.description}</p>
                  <p>{new Date(task.deadline).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                  <p>Weight: {task.weight}</p> {/* Display task weight */}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default MyTasks;
