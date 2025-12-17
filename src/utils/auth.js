import { decodeToken } from './jwt';

export function getCurrentUser() {
  try {
    const token = localStorage.getItem('accessToken');
    return token ? decodeToken(token) : null;
  } catch (err) {
    return null;
  }
}

export function getCurrentStudentId() {
  const user = getCurrentUser();
  if (!user) return null;
  return user.studentId || user.student_id || user.sub || user.id || null;
}

export function getCurrentUserClass() {
  const user = getCurrentUser();
  if (!user) return null;
  return user.class || user.class_c || user.classId || null;
}

export function isAuthenticated() {
  const user = getCurrentUser();
  // Require payload with userId (server enforces this)
  return Boolean(user && (user.userId || user.id || user.sub));
}
