import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem('user'));
  // const token = localStorage.getItem('token'); // Uncomment if using tokens for auth
  return user ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
