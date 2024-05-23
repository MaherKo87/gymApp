import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [username, setUsername] = useState('Guest');

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser && storedUser.username) {
      setUsername(storedUser.username);
    }
  }, []);

  const handleLogout = () => {
    try {
      // Clear local storage on logout
      localStorage.removeItem('user');
      navigate('/login'); // Redirect to login page using navigate
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  const startWorkout = () => {
    navigate('/gym-log'); // Assuming '/gym-log' is the route for the GymLog component
  };

  const profileInfo = () => {
    navigate('/profile'); // Assuming '/profile' is the route for the profile component
  };

  const tools = () => {
    navigate('/tools')
  }

  return (
    <div>
      <header>
        <h1>Gym Log</h1>
      </header>
      <h1>Welcome, {username}!</h1>
      <div>
        <button onClick={startWorkout}>Start Workout</button>
        <button onClick={tools}>Tools</button>
        <button onClick={profileInfo}>Profile</button>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};

export default HomePage;
