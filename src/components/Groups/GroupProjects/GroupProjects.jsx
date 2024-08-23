import React, { useState, useEffect } from "react";
import { getCookie } from "../cookieUtils";
import { useNavigate } from "react-router-dom";
import "../Groups.css";
import "./GroupProjects.css";
const GroupProjects = () => {
  const [projects, setProjects] = useState([]);
  const [isAddProjectAreaVisible, setIsAddProjectAreaVisible] = useState(false);
  const [newProjectTitle, setNewProjectTitle] = useState("");
  const [newProjectDescription, setNewProjectDescription] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    getProjects();
  }, []);

  const getProjects = async () => {
    try {
      const response = await fetch(
        `https://task-together-2020.onrender.com/groups/${getCookie(
          "groupId"
        )}/projects`,
        {
          headers: {
            "Content-Type": "application/json",
            authorization: getCookie("token"),
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setProjects(data.data);
      } else {
        console.error("Error fetching projects:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching projects:", error.message);
    }
  };

  const handleCreateProject = async () => {
    try {
      const response = await fetch(
        `https://task-together-2020.onrender.com/groups/${getCookie(
          "groupId"
        )}/projects`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: getCookie("token"),
          },
          body: JSON.stringify({
            title: newProjectTitle,
            description: newProjectDescription,
          }),
        }
      );

      if (response.status === 201) {
        toggleAddProjectArea();
        getProjects();
      } else {
        console.error("Error creating project:", response.statusText);
      }
    } catch (error) {
      console.error("Error creating project:", error.message);
    }
  };

  const toggleAddProjectArea = () => {
    setIsAddProjectAreaVisible(!isAddProjectAreaVisible);
    if (!isAddProjectAreaVisible) {
      setNewProjectTitle("");
      setNewProjectDescription("");
    }
  };

  function setCookie(name, value, days) {
    let expires = "";
    if (days) {
      const date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
  }
  const joinProject = (projectId,projectName) => {
    console.log(projectId);
    setCookie("projectId", projectId);
    setCookie("projectName",projectName)
    navigate(`/Projects`);
  };

  return (
    <div className="group-abilities">
      <div className="headerBtn">
        <div className="headerAbilityDiv">
          <div className="menuBtn" onClick={toggleAddProjectArea}>
            <i className="fa-solid fa-ellipsis-vertical"></i>
          </div>
        </div>
        <h2>Group Projects</h2>
      </div>
      {isAddProjectAreaVisible && (
        <div className="addProjectArea">
          <div>
            <h3>Title</h3>
            <input
              type="text"
              value={newProjectTitle}
              placeholder="Project Title"
              onChange={(e) => setNewProjectTitle(e.target.value)}
            />
          </div>
          <div>
            <h3>Description</h3>
            <textarea
              value={newProjectDescription}
              placeholder="Project Description"
              onChange={(e) => setNewProjectDescription(e.target.value)}
            ></textarea>
          </div>
          <button onClick={handleCreateProject}>Create Project </button>
        </div>
      )}

      {projects.map((proj) => (
        <div
          key={proj._id}
          className="each-project"
          projectId={proj._id}
          onClick={() => joinProject(proj._id,proj.title)}
        >
          <div>
            <h2>{proj.title}</h2>
            <p>{proj.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default GroupProjects;
