import React from 'react';
import SignUpForm from '../SignUpForm/SignUpForm';
import LoginForm from '../LoginForm/LogInForm.jsx';
import './HomaPage.css';

const HomePage = ({ view }) => {
  console.log('Current view:', view);

  return (
    <section className="home-page">
      {view === 'signup' && <SignUpForm />}
      {view === 'login' && <LoginForm />}
      {!view && <p>Please select an option above to continue.</p>}
    </section>
  );
};

export default HomePage;
