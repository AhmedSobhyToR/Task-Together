import React, { useState, useEffect } from 'react';
import { getCookie } from '../cookieUtils';
import '../Groups.css';
import './GroupMembers.css'

const GroupMembers = ({ token }) => {
  const [groupMembers, setGroupMembers] = useState([]);
  const [showAddMemberForm, setShowAddMemberForm] = useState(false);
  const [username, setUsername] = useState('');

  useEffect(() => {
    getGroupMembersData();
  }, []);

  const getGroupMembersData = async () => {
  
   
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

  const toggleAddMemberForm = () => {
    setShowAddMemberForm(!showAddMemberForm); 
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const inviteMemberToGroup = async () => {
    try {
      const response = await fetch(
        `https://task-together-2020.onrender.com/groups/${getCookie('groupId')}/invite?username=${username}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            authorization: `${getCookie("token")}`,
          },
          body: JSON.stringify({ "username:": username }),
        }
      );
      console.log(response);

      if (response.ok) {
        setUsername('');
        toggleAddMemberForm();
        getGroupMembersData();
      } else {
        console.error('Error:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const  removeMemberFromGroup = async (memberId) => {
    console.log(memberId);
    try {
      const response = await fetch(
        `https://task-together-2020.onrender.com/groups/${getCookie('groupId')}/members?userId=${memberId}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            authorization: `${getCookie("token")}`,
          },
      
        }
      );

      if (response.ok) {

       getGroupMembersData();
        console.log('Member removed successfully');
      } else {
        console.error('Error:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };


  return (
    <>
 <div className='group-abilities'>
  <div className='headerBtn'>
  <div className='headerAbilityDiv'>
        <div className='menuBtn' onClick={toggleAddMemberForm}>
          <i className='fa-solid fa-ellipsis-vertical'></i>
        </div>
      </div>
      <h2>Group Members</h2>
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
          <button onClick={inviteMemberToGroup}>Invite Member</button>
        </div>
      )}

   
{groupMembers.map((member) => (
  <div key={member._id} className="member-item">
    <p className="member-details">
      <span className="member-nickname">{member.nickname}</span>
      <span className="remove-user" onClick={() => removeMemberFromGroup(member._id)}>
        <i className='fa-solid fa-trash'></i>
      </span>
    </p>
  </div>
))}

    </div>
    </>
   
  );
};

export default GroupMembers;
