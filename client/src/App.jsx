import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import NewAccount from './signUp.jsx';
import LogIn from './logIn.jsx';
import HomePage from './homePage.jsx';
import GymLog from './gymLog.jsx';
import ProfileInfo from './profileInfo.jsx';
import ProtectedRoute from './protect.jsx'
import Tools from './tools.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/register' element={<NewAccount />} />
        <Route path='/login' element={<LogIn />}/>
        <Route path='/homepage' element={<ProtectedRoute><HomePage /></ProtectedRoute>}/>
        <Route path='/gym-log' element={<ProtectedRoute><GymLog /></ProtectedRoute>} />
        <Route path='/profile' element={<ProtectedRoute><ProfileInfo /></ProtectedRoute>} />
        <Route path='/tools' element={<ProtectedRoute><Tools /></ProtectedRoute>} />
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
