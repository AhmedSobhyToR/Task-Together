import React, { useEffect, useState } from 'react';
import { getCookie } from '../cookieUtils';

const GroupInvitations = ({ token }) => {
  const [invitations, setInvitations] = useState([]);

  useEffect(() => {
    getGroupInvitations();
  }, []);

  const getGroupInvitations = async () => {
    try {
      const response = await fetch(
        `https://task-together-2020.onrender.com/groups/groupInvites`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            authorization: `${getCookie("token")}`,
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setInvitations(data.data);
      } else {
        console.error('Failed to fetch invitations:', response.status);
      }
    } catch (err) {
      console.error('Error fetching invitations:', err);
    }
  };

  const handleInvitationResponse = async (invitationId, accept) => {
    console.log(invitationId);
    try {
      const response = await fetch(
        `https://task-together-2020.onrender.com/groups/groupInvites/${invitationId}?accept=${accept}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            authorization: `${getCookie("token")}`,
          },
          body: JSON.stringify({ GroupInvite_ID: invitationId, accept }),
        }
      );
      if (response.ok) {
        getGroupInvitations();
      } else {
        console.error('Failed to send invitation response:', response.status);
      }
    } catch (err) {
      console.error('Error sending invitation response:', err);
    }
  };

  return (
    <>
    <div className='group-abilities'>
    <div className="group-invitations">
      <h2>Group Invitations</h2>
      <ul>
        {invitations.map((invitation) => (
          <li key={invitation._id}>
            <div>
                <p>You're invited by  <strong>{invitation.invitedBy.nickname}</strong> to join <strong>{invitation.group.name}</strong></p>
             
            </div>
            <div>
              <button 
                className="accept-button" 
                onClick={() => handleInvitationResponse(invitation._id, true)}
              >
                Accept
              </button>
              <button 
                className="decline-button" 
                onClick={() => handleInvitationResponse(invitation._id, false)}
              >
                Decline
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
    </div>
    </>
   
  );
};

export default GroupInvitations;
