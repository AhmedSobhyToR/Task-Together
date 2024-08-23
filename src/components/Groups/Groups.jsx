import React, { useState } from 'react';
import GroupMembers from './GroupMembers/GroupMembers';
import GroupAnnouncements from './GroupAnnouncements/GroupAnnouncements';
import GroupProjects from './GroupProjects/GroupProjects';
import MyGroups from './MyGroups/MyGroups'; 
import GroupInvitations from './GroupInvitations/GroupInvitations';
import LogOut from '../LogOut/LogOut';
import Chat from './Chat/Chat';
import './Groups.css';



const Groups = ({ token }) => {
  const [activeTab, setActiveTab] = useState('group-page');
  const [isNavExpanded, setIsNavExpanded] = useState(false);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <>


      <section>
        <div className="groups-page d-flex flex-column flex-md-row">
          <nav 
            id="navSide" 
            className={`side-nav d-flex flex-column text-light expanded`}
            onMouseEnter={() => setIsNavExpanded(true)}
            onMouseLeave={() => setIsNavExpanded(false)}
          >
            <div className="nav-logo">{ <div className="logo">Task Together</div>}</div>
            <button className="nav-link" onClick={() => handleTabClick('group-members')}>
              <i className="fa-solid fa-users"></i> { 'Group Members'}
            </button>
            <button className="nav-link" onClick={() => handleTabClick('group-announcements')}>
              <i className="fa-solid fa-bullhorn"></i> { 'Group Announcements'}
            </button>
            <button className="nav-link" onClick={() => handleTabClick('group-projects')}>
              <i className="fa-solid fa-table-list"></i> { 'Group Projects'}
            </button>
            <button className="nav-link" onClick={() => handleTabClick('group-invitations')}>
              <i className="fa-solid fa-envelope"></i> { 'Group Invitations'}
            </button>
            <button className="nav-link" onClick={() => handleTabClick('group-chat')}>
              <i className="fa-solid fa-comments"></i> { 'Chat'}
            </button>
            <button className="nav-link logOutBtn" onClick={() => handleTabClick('LogOut')}>
              <i className="fa-solid fa-sign-out-alt"></i> { 'Log Out'}
            </button>
          </nav>

          <MyGroups />
          <>
            {activeTab === 'group-members' && <GroupMembers token={token} />}
            {activeTab === 'group-announcements' && <GroupAnnouncements token={token} />}
            {activeTab === 'group-projects' && <GroupProjects token={token} />}
            {activeTab === 'group-invitations' && <GroupInvitations token={token} />}
            {activeTab === 'group-chat' && <Chat token={token} />}
            {activeTab === 'LogOut' && <LogOut token={token} />}
          </>
        </div>
      </section>
    </>
  );
};

export default Groups;
