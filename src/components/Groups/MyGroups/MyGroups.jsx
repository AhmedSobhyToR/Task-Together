import React, { useEffect, useState } from 'react';
import { getCookie } from '../cookieUtils';
import '../Groups.css'
import './MyGroups.css'
const MyGroups = ({ token }) => {
  const [groups, setGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [showAddGroupForm, setShowAddGroupForm] = useState(false);
  const [newGroupTitle, setNewGroupTitle] = useState('');
  const [newGroupDescription, setNewGroupDescription] = useState('');


  useEffect(() => {
    getGroups();
  }, []);
  const getGroups = async () => {
    try {
      const response = await fetch('https://task-together-2020.onrender.com/groups', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'authorization': `${ getCookie("token")}`
        }
      });

      if (response.ok) {
        const result = await response.json();
        setGroups(result.data);
      } else {
        console.error('Error:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  const handleGroupClick = (groupId, groupName) => {
    setSelectedGroup(groupId);
    document.cookie = `groupId=${groupId}; path=/`;
    document.cookie = `groupName=${groupName}; path=/`;

  };
  const toggleAddGroupForm = () => {
    setShowAddGroupForm(!showAddGroupForm); 
  };

  const handleTitleChange = (event) => {
    setNewGroupTitle(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setNewGroupDescription(event.target.value);
  };


  const createGroup = async () => {
    try {
      const response = await fetch(
        `https://task-together-2020.onrender.com/groups`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            authorization: `${getCookie("token")}`,
          },
          body: JSON.stringify({
            title: newGroupTitle,
            description: newGroupDescription,
          }),
        }
      );

      if (response.ok) {
       
        setNewGroupTitle('');
        setNewGroupDescription('');
        toggleAddGroupForm(); 
        getGroups();
       
      } else {
        console.error('Error:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="my-groups">
      <div className='headerBtn'>
      <div className='headerAbilityDiv'>
        <div className='menuBtn' onClick={toggleAddGroupForm}>
          <i className='fa-solid fa-ellipsis-vertical'></i>
        </div>
      </div>
      <h3>My Groups</h3>
      </div>

      {showAddGroupForm && (
        <div className='addGroupArea'>
          <div>
            <h3>Title</h3>
            <input
              type='text'
              value={newGroupTitle}
              placeholder='Group Title'
              onChange={handleTitleChange}
            />
          </div>
          <div>
            <h3>Description</h3>
            <textarea
              value={newGroupDescription}
              onChange={handleDescriptionChange}
              placeholder='Group Description'
            ></textarea>
          </div>
          <button onClick={createGroup}>Create Group</button>
        </div>
      )}
      {groups.map(group => (
        <div 
          key={group._id} 
          className={`group-info ${selectedGroup === group._id ? 'selected' : ''}`} 
          onClick={() => handleGroupClick(group._id, group.name)}
        >
          <img src={group.photo} alt={group.name} className="group-image" />
          <h2>{group.name}</h2>
          <p>{group.description}</p>
        </div>
      ))}
    </div>
  );
};

export default MyGroups;
