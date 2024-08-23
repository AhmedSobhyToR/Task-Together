import React, { useEffect, useState } from 'react';
import { getCookie } from '../cookieUtils';
import './ProjectMembers.css'
const ProjectMembers = ({ token }) => {
  const [members, setMembers] = useState([]);
  const [groupMembers, setGroupMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [username, setUsername] = useState(''); 
  const [showAddMemberForm, setShowAddMemberForm] = useState(false);
  useEffect(() => {
    getProjectMembers();
  }, []);

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
        console.log(response)
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
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const getGroupMembers = async () => {
  
   
    try {
      const response = await fetch(
        `https://task-together-2020.onrender.com/groups/${getCookie('groupId')}/members`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            authorization: `${getCookie('token')}`,
          },
        }
      );

      if (response.ok) {
        const result = await response.json();
        console.log(result)

        setGroupMembers(result.data);
      } else {
        console.error('Error:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const addMemberToProject = async (memberId) => {

    try {
      const response = await fetch(`https://task-together-2020.onrender.com/projects/${getCookie("projectId")}/members`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'authorization': getCookie("token"),
        },
        body: JSON.stringify([memberId]),
      });

      if (response.ok) {
        setUsername('');
        getProjectMembers();
      }


    } catch (error) {
      console.error('Error inviting member:', error);
      setError(error.message);
    }
  };

  const removeMemberFromProject = async (memberId) => {
    try {
      const response = await fetch(`https://task-together-2020.onrender.com/projects/${getCookie("projectId")}/members?userId=${memberId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'authorization': getCookie("token"),
        },
      });

      if (response.ok) {
        getProjectMembers();
      }


    } catch (error) {
      console.error('Error removing member:', error);
      setError(error.message);
    }
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };
  const toggleAddMemberForm = () => {
    setShowAddMemberForm(!showAddMemberForm); 
  };

  
  function  getMemberId(userName){
    getGroupMembers();
    groupMembers.forEach((member) => {
     if(member.username === userName){
      addMemberToProject(member._id)
     }
    });
  }
  function getMemberIdForRemove(userName){
   members.forEach((member) => {
    if(member.username === userName){
     removeMemberFromProject(member._id)
    
    }
   });
  }

  return (
    <div>
      <div className='headerBtn'>
      <div className='headerAbilityDiv'>
      <div className='menuBtn' onClick={toggleAddMemberForm}>
        <i className='fa-solid fa-ellipsis-vertical'></i>
      </div>
    
    </div>
    <h2>Project Members</h2>
      </div>
  
      {showAddMemberForm && (
      <div className='addMemberArea'>
        <h3>Add Member</h3>
        <input
          type='text'
          placeholder='Enter username'
          value={username}
          onChange={handleUsernameChange}
        />
    
        <button onClick={()=>getMemberId(username)}>Add Member</button>
      </div>
       )}
      <ul>
      {members.map(member => (
          <li key={member.username} className="member-item">
            <span className="member-nickname">{member.nickname}</span>
            <span className="member-icon" onClick={() => getMemberIdForRemove(member.username)}>
              <i className="fa-solid fa-trash"></i>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProjectMembers;
