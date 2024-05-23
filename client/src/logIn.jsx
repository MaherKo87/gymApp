import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const LogIn = () => {
  //console.log('LogIn component rendered'); // Add this line to check if component renders

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
   // console.log('handleLogin triggered'); // Add this line to check if function is triggered

    try {
      //console.log('Sending login request to server...');
      const response = await axios.post('http://localhost:3000/login', { email, password });
      //console.log('Response received:', response);

      if (response.data.success) {
        //console.log('Login successful!');
        const user = response.data.user;
        //console.log('User data:', user);
        
        // Remove the password before storing the user object
        const { password, ...userWithoutPassword } = user;
        localStorage.setItem('user', JSON.stringify(userWithoutPassword));
        
        const userInfo = localStorage.getItem('user');
        console.log('Stored user info:', userInfo);
        
        // Pass username to HomePage
        navigate('/homepage', { state: { username: user.username } });
      } else {
        //console.log('Login failed with error:', response.data.error);
        setError(response.data.error);
      }
    } catch (error) {
     // console.error('Error during login:', error);
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
          <button onClick={handleLogin}>Login</button>
        </form>
        <p>New here? <Link to='/register'>Create an account</Link></p>
      </div>
    </div>
  );
};

export default LogIn;
