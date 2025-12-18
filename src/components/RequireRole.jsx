import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { decodeToken } from '../utils/jwt';
import { useUserRoles, useUserData } from '../hooks/useStudents';

// allowedRoles: array of role names or ids
export default function RequireRole({ allowedRoles = [], children }) {
  const location = useLocation();
  const token = localStorage.getItem('accessToken');
  const payload = token ? decodeToken(token) : null;
  const userId = payload?.userId || payload?.id || payload?.sub || null;

  const { data: rolesResponse, isLoading: loadingRoles, error: rolesError } = useUserRoles(userId);
  const { data: userData, isLoading: loadingUser, error: userError } = useUserData(userId);

  if (!userId) {
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  // show nothing while we fetch role info
  if (loadingRoles || loadingUser) return null;
  if (rolesError || userError) return <Navigate to="/auth" state={{ from: location }} replace />;

  // normalize roles into array of strings (names or ids)
  let normalized = [];
  if (Array.isArray(rolesResponse)) {
    // API might return an array directly
    normalized = rolesResponse.map(r => {
      if (typeof r === 'string' || typeof r === 'number') return String(r);
      return String(r.role_name ?? r.name ?? r.role_id ?? r.id ?? '');
    });
  } else if (rolesResponse && typeof rolesResponse === 'object') {
    // when API returns { roles: [...] }
    const arr = rolesResponse.roles || [];
    normalized = arr.map(r => String(r.role_name ?? r.name ?? r.role_id ?? r.id ?? r));
  }

  if (userData && userData.role) normalized.push(String(userData.role));

  const userRoles = Array.from(new Set(normalized.filter(Boolean)));

  const allowed = allowedRoles.length === 0 || allowedRoles.some(r => userRoles.includes(String(r)));
  if (!allowed) {
    // unauthorized - redirect to home
    return <Navigate to="/" replace />;
  }

  return children;
}
