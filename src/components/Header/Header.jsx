import React from 'react';
import { useLocation } from 'react-router-dom';
import './Header.css';

const Header = ({ setView }) => {
  const location = useLocation();

  const handleSignUpClick = () => {
    console.log('Sign Up button clicked');
    setView('signup');
  };

  const handleLogInClick = () => {
    console.log('Log In button clicked');
    setView('login');
  };

  // Conditionally render header based on path
  const shouldShowHeader = !['/groups', '/projects'].includes(location.pathname);

  return shouldShowHeader ? (
    <header className="header">
      {location.pathname === '/' ? (
        <div className="full-header">
          <div className="logo">Task Together</div>
          <nav>
            <input type="button" value="Get App" className="get-app-button" />
            <input type="button" value="Sign Up" onClick={handleSignUpClick} />
            <input type="button" value="Log In" onClick={handleLogInClick} />
          </nav>
        </div>
      ) : (
        <div className="simple-header"></div>
      )}
    </header>
  ) : null;
};

export default Header;
