import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { isAuthenticated } from '../utils/auth';

export default function RequireAuth({ children }) {
  const location = useLocation();
  if (!isAuthenticated()) {
    // redirect to /auth, preserving original location
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }
  return children;
}
