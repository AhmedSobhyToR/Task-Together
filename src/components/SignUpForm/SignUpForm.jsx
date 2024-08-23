/* import React, { useState } from 'react';
import './SignUpForm.css';

const SignUpForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [nickname, setNickname] = useState('');
  const [error, setError] = useState('');

  const signUpProcess = async () => {
    const data = { username, password, nickname };

    try {
      const response = await fetch('https://task-together-2020.onrender.com/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const result = await response.json();
        document.cookie = `username=${username}; max-age=8640000; path=/`;
        document.cookie = `nickname=${nickname}; max-age=8640000; path=/`;
        document.cookie = `token=${result.data}; max-age=8640000; path=/`;
        window.location.href = '../Html/index2.html';
      } else {
        setError('Username already exists');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <form className="sign-up" id="signupForm" onSubmit={(e) => e.preventDefault()}>
      <h2>Sign Up</h2>
      <div>
        <label htmlFor="username">
          <i className="fa-solid fa-user"></i>
        </label>
        <input
          type="text"
          placeholder="Username"
          name="username"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="password">
          <i className="fa-solid fa-lock"></i>
        </label>
        <input
          type="password"
          placeholder="Password"
          name="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="nickname">
          <i className="fa-solid fa-user-tie"></i>
        </label>
        <input
          type="text"
          placeholder="Nickname"
          name="nickname"
          id="nickname"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
        />
      </div>
      <input type="button" value="Sign Up" className="signlog-button" id="sign" onClick={signUpProcess} />
      {error && <p>{error}</p>}
    </form>
  );
};

export default SignUpForm;
 */import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SignUpForm.css';

const SignUpForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [nickname, setNickname] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const signUpProcess = async () => {
    const data = { username, password, nickname };

    try {
      const response = await fetch('https://task-together-2020.onrender.com/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const result = await response.json();
        document.cookie = `username=${username}; max-age=8640000; path=/`;
        document.cookie = `nickname=${nickname}; max-age=8640000; path=/`;
        document.cookie = `token=${result.data}; max-age=8640000; path=/`;
        navigate('/Groups'); // Redirect to the Groups page
      } else {
        setError('Username already exists');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <form className="sign-up" id="signupForm" onSubmit={(e) => e.preventDefault()}>
      <h2>Sign Up</h2>
      <div>
        <label htmlFor="username">
          <i className="fa-solid fa-user"></i>
        </label>
        <input
          type="text"
          placeholder="Username"
          name="username"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="password">
          <i className="fa-solid fa-lock"></i>
        </label>
        <input
          type="password"
          placeholder="Password"
          name="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="nickname">
          <i className="fa-solid fa-user-tie"></i>
        </label>
        <input
          type="text"
          placeholder="Nickname"
          name="nickname"
          id="nickname"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
        />
      </div>
      <input type="button" value="Sign Up" className="signlog-button" id="sign" onClick={signUpProcess} />
      {error && <p>{error}</p>}
    </form>
  );
};

export default SignUpForm;
