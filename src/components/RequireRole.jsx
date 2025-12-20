import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { decodeToken } from '../utils/jwt';
import { useUserData } from '../hooks/users/queries/useUserData';

// allowedRoles: array of role names or ids
export default function RequireRole({ allowedRoles = [], children }) {
  const location = useLocation();
  const token = localStorage.getItem('accessToken');
  const payload = token ? decodeToken(token) : null;
  const userId = payload?.userId || payload?.id || payload?.user_id || null;

  // Prefer role from token as a fast path, but treat server-returned role as source of truth.
  const tokenRole = payload?.role || payload?.role_name || null;

  const { data: userDataRes, isLoading: loadingUser, error: userError } = useUserData(userId);

  if (!userId) {
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  // show nothing while we fetch role info
  if (loadingUser) return null;
  if (userError) return <Navigate to="/auth" state={{ from: location }} replace />;

  // `useUserData` returns the response body; unwrap common shapes.
  const userData = userDataRes?.userData ?? userDataRes?.user ?? userDataRes;

  const normalizedRoles = [];
  if (tokenRole) normalizedRoles.push(String(tokenRole));
  if (userData?.role) normalizedRoles.push(String(userData.role));

  // Normalize casing because backend may return 'Student' while routes use 'student'.
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
