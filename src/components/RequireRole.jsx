import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { getCurrentUser } from '../utils/auth';
import { useUserData } from '../hooks/users/queries/useUserData';

export default function RequireRole({ allowedRoles = [], children }) {
  const location = useLocation();
  const currentUser = getCurrentUser();
  const userId = currentUser?.userId || currentUser?.id || currentUser?.sub || null;
  const tokenRole = currentUser?.role || currentUser?.role_name || null;

  const { data: userDataRes, isLoading: loadingUser, error: userError } = useUserData(userId);

  if (!userId) {
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  if (loadingUser) return null;
  if (userError) return <Navigate to="/auth" state={{ from: location }} replace />;

  const userData = userDataRes?.userData ?? userDataRes?.user ?? userDataRes;

  const normalizedRoles = [];
  if (tokenRole) normalizedRoles.push(String(tokenRole));
  if (userData?.role) normalizedRoles.push(String(userData.role));

  // Normalize casing, may return 'Student' while routes use 'student'.
  const userRoles = Array.from(
    new Set(normalizedRoles.filter(Boolean).map(r => r.toLowerCase())),
  );
  const allowedRolesNorm = allowedRoles.map(r => String(r).toLowerCase());

  const allowed = allowedRolesNorm.length === 0 || allowedRolesNorm.some(r => userRoles.includes(r));
  if (!allowed) {
    // unauthorized - redirect to home
    return <Navigate to="/" replace />;
  }

  return children;
}
