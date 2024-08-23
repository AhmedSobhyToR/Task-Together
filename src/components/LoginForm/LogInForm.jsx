/* import React, { useState } from 'react';
import './LogInForm.css';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const logInProcess = async () => {
    const data = { username, password };

    try {
      const response = await fetch('https://task-together-2020.onrender.com/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const result = await response.json();
        document.cookie = `username=${username}; max-age=8640000; path=/`;
        document.cookie = `token=${result.data}; max-age=8640000; path=/`;
        window.location.href = '../Html/groups.html';
      } else {
        setError('Incorrect Username or Password');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <form className="sign-up" id="loginForm" onSubmit={(e) => e.preventDefault()}>
      <h2>Log In</h2>
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
      <input type="button" value="Log In" className="signlog-button" id="log" onClick={logInProcess} />
      {error && <p>{error}</p>}
    </form>
  );
};

export default LoginForm;
 */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LogInForm.css';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const logInProcess = async () => {
    const data = { username, password };

    try {
      const response = await fetch('https://task-together-2020.onrender.com/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const result = await response.json();
        document.cookie = `username=${username}; max-age=8640000; path=/`;
        document.cookie = `token=${result.data.token}; max-age=8640000; path=/`;
         navigate('./Groups');
      } else {
        setError('Incorrect Username or Password');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <form className="sign-up" id="loginForm" onSubmit={(e) => e.preventDefault()}>
      <h2>Log In</h2>
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
      <input type="button" value="Log In" className="signlog-button" id="log" onClick={logInProcess} />
      {error && <p>{error}</p>}
    </form>
  );
};

export default LoginForm;

