import React, { useState, useEffect } from "react";
import { getCookie } from "../cookieUtils";
import "../Groups.css";
import "./GroupAnnouncements.css";

const GroupAnnouncements = ({ token }) => {
  const [announcements, setAnnouncements] = useState([]);
  const [showAddAnnouncementForm, setShowAddAnnouncementForm] = useState(false);
  const [newAnnouncementTitle, setNewAnnouncementTitle] = useState("");
  const [newAnnouncementDescription, setNewAnnouncementDescription] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [currentAnnouncementId, setCurrentAnnouncementId] = useState(null);

  useEffect(() => {
    getAnnouncements();
  }, []);

  const getAnnouncements = async () => {
    try {
      const response = await fetch(
        `https://task-together-2020.onrender.com/groups/${getCookie("groupId")}/announcements`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            authorization: `${getCookie("token")}`,
          },
        }
      );

      if (response.ok) {
        const result = await response.json();
        setAnnouncements(result.data);
      } else {
        console.error("Error:", response.statusText);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const toggleAddAnnouncementForm = (announcement = null) => {
    setShowAddAnnouncementForm(!showAddAnnouncementForm);
    if (announcement) {
      setNewAnnouncementTitle(announcement.title);
      setNewAnnouncementDescription(announcement.description);
      setIsEditing(true);
      setCurrentAnnouncementId(announcement._id);
    } else {
      setNewAnnouncementTitle("");
      setNewAnnouncementDescription("");
      setIsEditing(false);
      setCurrentAnnouncementId(null);
    }
  };

  const handleTitleChange = (event) => {
    setNewAnnouncementTitle(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setNewAnnouncementDescription(event.target.value);
  };

  const createOrEditAnnouncement = async () => {
    if (isEditing) {
      editAnnouncementFromGroup(currentAnnouncementId);
    } else {
      createAnnouncement();
    }
  };

  const createAnnouncement = async () => {
    try {
      const response = await fetch(
        `https://task-together-2020.onrender.com/groups/${getCookie("groupId")}/announcements`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: `${getCookie("token")}`,
          },
          body: JSON.stringify({
            title: newAnnouncementTitle,
            description: newAnnouncementDescription,
          }),
        }
      );

      if (response.ok) {
        setNewAnnouncementTitle("");
        setNewAnnouncementDescription("");
        toggleAddAnnouncementForm();
        getAnnouncements();
      } else {
        console.error("Error:", response.statusText);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const editAnnouncementFromGroup = async (announcementId) => {
    try {
      const response = await fetch(
        `https://task-together-2020.onrender.com/groups/${getCookie("groupId")}/announcements/${announcementId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            authorization: `${getCookie("token")}`,
          },
          body: JSON.stringify({
            title: newAnnouncementTitle,
            description: newAnnouncementDescription,
          }),
        }
      );

      if (response.ok) {
        setNewAnnouncementTitle("");
        setNewAnnouncementDescription("");
        toggleAddAnnouncementForm();
        getAnnouncements();
      } else {
        console.error("Error:", response.statusText);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const removeAnnouncementFromGroup = async (announcementId) => {
    try {
      const response = await fetch(
        `https://task-together-2020.onrender.com/announcements/${announcementId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            authorization: `${getCookie("token")}`,
          },
        }
      );

      if (response.ok) {
        getAnnouncements();
      } else {
        console.error("Error:", response.statusText);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const cancelEdit = () => {
    setNewAnnouncementTitle("");
    setNewAnnouncementDescription("");
    setIsEditing(false);
    setCurrentAnnouncementId(null);
    setShowAddAnnouncementForm(false);
  };

  return (
    <>
      <div className="group-abilities">
        <div className="headerBtn">
          <div className="headerAbilityDiv">
            <div className="menuBtn" onClick={() => toggleAddAnnouncementForm()}>
              <i className="fa-solid fa-ellipsis-vertical"></i>
            </div>
          </div>
          <h2>Announcements</h2>
        </div>

        {showAddAnnouncementForm && (
          <div className="addAnnouncementArea">
            <div>
              <h3>Title</h3>
              <input
                type="text"
                value={newAnnouncementTitle}
                placeholder="Group Title"
                onChange={handleTitleChange}
              />
            </div>
            <div>
              <h3>Description</h3>
              <textarea
                value={newAnnouncementDescription}
                onChange={handleDescriptionChange}
                placeholder="Group Description"
              ></textarea>
            </div>
            <button onClick={createOrEditAnnouncement}>
              {isEditing ? "Edit Announcement" : "Create Announcement"}
            </button>
            <button onClick={cancelEdit}> Cancel</button>
          </div>
        )}

        {announcements.map((announcement) => (
          <div key={announcement._id} className="announcement">
            <h2 className="annhead">
              {announcement.title} created by {announcement.createdBy.nickname}
              <span className="edit-ann" onClick={() => toggleAddAnnouncementForm(announcement)}>
                <i className="fa-solid fa-arrows-rotate"></i>
              </span>
              <span className="remove-ann" onClick={() => removeAnnouncementFromGroup(announcement._id)}>
                <i className="fa-solid fa-trash"></i>
              </span>
            </h2>
            <p>{announcement.description}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default GroupAnnouncements;
