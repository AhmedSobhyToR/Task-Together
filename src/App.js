import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header/Header';
import HomePage from './components/HomePage/HomePage';
import LogInForm from './components/LoginForm/LogInForm';
import SignUpForm from './components/SignUpForm/SignUpForm';
import Groups from './components/Groups/Groups';
import Projects from './components/Projects/Projects';
import ChatComponent from './components/Groups/Chat/Chat';
import { ProjectsProvider } from '../src/components/Projects/Dashboard/ProjectsContext'

function App() {
  const [view, setView] = useState(null);

  return (
    <ProjectsProvider>
      <Router>
        <div className="App">
          <Header setView={setView} />
          <Routes>
            <Route path="/" element={<HomePage view={view} />} />
            <Route path="/login" element={<LogInForm />} />
            <Route path="/signup" element={<SignUpForm />} />
            <Route path="/groups" element={<Groups />} />
            <Route path='/projects'element={<Projects/>}/>
            <Route path='/chat'element={<ChatComponent/>}/>
          </Routes>
        </div>
      </Router>
    </ProjectsProvider>
  );
}

export default App;
