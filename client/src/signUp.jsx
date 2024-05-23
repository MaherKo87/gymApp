import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import config from './config'; // Adjust the path as necessary

const NewAccount = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleCreateAccount = async (event) => {
    event.preventDefault();

    try {
      const userData = { username, email, password };
      console.log(userData);

      const response = await axios.post(`${config.apiUrl}/register`, userData);
      console.log(response);
      navigate('/login'); // Navigate to the login page after successful registration
    } catch (error) {
      console.error('Error creating account:', error.message);
      setError('Failed to create account. Please try again.');
    }
  };

  return (
    <div id="new-account-container">
      <h2>Create Account</h2>
      {error && <div>{error}</div>}
      <form onSubmit={handleCreateAccount}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
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
        <button type="submit">Create Account</button>
      </form>
      <p>Already have an account? <Link to='/login'>Log in</Link></p>
    </div>
  );
};

export default NewAccount;
