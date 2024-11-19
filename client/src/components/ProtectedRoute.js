// ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const token = localStorage.getItem('authToken'); // Check if the user has a valid token

  if (!token) {
    // If no token is found, redirect the user to login page
    return <Navigate to="/login" replace />;
  }

  // If token exists, render the component (Home, in this case)
  return <Component {...rest} />;
};

export default ProtectedRoute;
