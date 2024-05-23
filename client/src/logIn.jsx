import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import config from './config'; // Adjust the path as necessary

const LogIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(`${config.apiUrl}/login`, { email, password });

      if (response.data.success) {
        const user = response.data.user;
        const { password, ...userWithoutPassword } = user; // Remove the password before storing the user object
        localStorage.setItem('user', JSON.stringify(userWithoutPassword));
        
        const userInfo = localStorage.getItem('user');
        console.log('Stored user info:', userInfo);

        // Pass username to HomePage
        navigate('/homepage', { state: { username: user.username } });
      } else {
        setError(response.data.error);
      }
    } catch (error) {
      console.error('Error during login:', error);
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div id="login-component-template">
      <div id="login-container">
        <h2>Login</h2>
        {error && <div id="error-message">{error}</div>}
        <form onSubmit={handleLogin}>
          <div>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">Login</button>
        </form>
        <p>New here? <Link to='/register'>Create an account</Link></p>
      </div>
    </div>
  );
};

export default LogIn;
