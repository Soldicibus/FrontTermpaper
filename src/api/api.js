const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:3000/api";
const API_ROOT = import.meta.env.VITE_API_ROOT || "http://localhost:3000";

function getAccessToken() {
  return localStorage.getItem('accessToken');
}

async function fetchJSON(path, options = {}) {
  const headers = options.headers || {};
  const token = getAccessToken();
  if (token) headers['Authorization'] = `Bearer ${token}`;

  // Determine whether this path should go to the API root (e.g. /auth) or to /api
  const base = path.startsWith('/auth') ? API_ROOT : API_BASE;
  const res = await fetch(`${base}${path}`, { ...options, headers });
  const text = await res.text();
  try {
    const json = text ? JSON.parse(text) : {};

    // If unauthorized, attempt to refresh once (but don't do this for auth endpoints themselves)
    if (res.status === 401 && !path.startsWith('/auth')) {
      const refreshToken = localStorage.getItem('refreshToken');
      console.warn('[api] received 401 for', path);
      if (!refreshToken) {
        console.warn('[api] no refresh token available');
        logout();
        if (typeof window !== 'undefined') window.location.href = '/auth';
        throw new Error('Unauthorized');
      }

      // quick check if refresh token is already expired (inspect exp claim)
      try {
        const parsed = decodeToken(refreshToken);
        if (parsed && parsed.exp && parsed.exp * 1000 < Date.now()) {
          console.warn('[api] refresh token already expired');
          logout();
          if (typeof window !== 'undefined') window.location.href = '/auth';
          throw new Error('Refresh token expired');
        }
      } catch (e) {
        console.warn('[api] failed to parse refresh token', e.message);
      }

      // Attempt refresh using the auth root directly (avoid recursion through fetchJSON)
      const refreshRes = await fetch(`${API_ROOT}/auth/refresh`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refreshToken }),
      });

      const refreshText = await refreshRes.text();
      let refreshJson = {};
      try {
        refreshJson = refreshText ? JSON.parse(refreshText) : {};
      } catch (e) {
        console.warn('[api] failed to parse refresh response', refreshText);
      }

      if (!refreshRes.ok) {
        console.warn('[api] refresh request failed', refreshRes.status, refreshJson);
        logout();
        if (typeof window !== 'undefined') window.location.href = '/auth';
        throw new Error(refreshJson.error || 'Unauthorized');
      }

      // successful refresh
      console.info('[api] refresh successful');
      if (refreshJson.accessToken) {
        localStorage.setItem('accessToken', refreshJson.accessToken);
        // Retry the original request with the new access token
        const retryHeaders = { ...(options.headers || {}) };
        retryHeaders['Authorization'] = `Bearer ${refreshJson.accessToken}`;
        const retryRes = await fetch(`${base}${path}`, { ...options, headers: retryHeaders });
        const retryText = await retryRes.text();
        const retryJson = retryText ? JSON.parse(retryText) : {};
        if (!retryRes.ok) {
          console.warn('[api] retry after refresh failed', retryRes.status, retryJson);
          throw new Error(retryJson.error || retryText || retryRes.statusText);
        }
        return retryJson;
      }
      // fallback - no accessToken in refresh response
      console.warn('[api] refresh response did not contain accessToken', refreshJson);
      logout();
      if (typeof window !== 'undefined') window.location.href = '/auth';
      throw new Error('Unauthorized');
    }

    if (!res.ok) {
      console.warn('[api] request failed', path, res.status, json);
      throw new Error(json.error || text || res.statusText);
    }
    return json;
  } catch (err) {
    if (!res.ok) throw new Error(text || res.statusText);
    return {};
  }
}

export function logout() {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
}

// Students
export const getStudents = () => fetchJSON(`/students`).then(r => r.students || []);
export const getStudentById = (id) => fetchJSON(`/students/${id}`).then(r => r.student || null);
export const getStudentMarks = (studentId, fromDate, toDate) => {
  const params = new URLSearchParams();
  if (studentId) params.set('studentId', studentId);
  if (fromDate) params.set('fromDate', fromDate);
  if (toDate) params.set('toDate', toDate);
  return fetchJSON(`/students/marks?${params.toString()}`).then(r => r.students || []);
};
export const getStudentsByParent = (parentId) => fetchJSON(`/students/by-parent/${parentId}`).then(r => r.students || []);

export const addStudent = (payload) => fetchJSON('/students', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) }).then(r => r.newStudent);
export const updateStudent = (payload) => fetchJSON('/students', { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) }).then(r => r.message);
export const deleteStudent = (id) => fetchJSON(`/students/${id}`, { method: 'DELETE' }).then(r => r.message);

// Teachers
export const getTeachers = () => fetchJSON('/teacher').then(r => r.teachers || r);
export const getTeacherById = (id) => fetchJSON(`/teacher/${id}`).then(r => r.teacher || null);

// Parents
export const getParents = () => fetchJSON('/parents').then(r => r.parents || r);
export const getParentById = (id) => fetchJSON(`/parents/${id}`).then(r => r.parent || null);

// Users
export const getUsers = () => fetchJSON('/users').then(r => r.users || r);
export const getUserById = (id) => fetchJSON(`/users/${id}`).then(r => r.user || null);
export const getUserData = (id) => {
  if (!id) return Promise.reject(new Error('id required'));
  return fetchJSON(`/users/${id}/data`).then(r => r.userData || r);
};

// Auth
export const login = async ({ username, email, password }) => {
  const res = await fetchJSON('/auth/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ username, email, password }) });
  // Store tokens
  if (res.accessToken) localStorage.setItem('accessToken', res.accessToken);
  if (res.refreshToken) localStorage.setItem('refreshToken', res.refreshToken);
  return res;
};

export const refreshToken = (refreshToken) => fetchJSON('/auth/refresh', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ refreshToken }) });
export const getMe = () => fetchJSON('/auth/me').then(r => r.user || null);

// Homework, Materials, Timetables, Classes
export const getHomework = () => fetchJSON('/homework').then(r => r.homework || r);
export const getHomeworkByStudentOrClass = (params = {}) => {
  const qs = new URLSearchParams(params).toString();
  return fetchJSON(`/homework/by-student-or-class?${qs}`).then(r => r.homework || r);
};

export const getMaterials = () => fetchJSON('/materials').then(r => r.materials || r);
export const getMaterialById = (id) => fetchJSON(`/materials/${id}`).then(r => r.material || null);

export const getTimetables = () => fetchJSON('/timetables').then(r => r.timetables || r);

export const getClasses = () => fetchJSON('/classes').then(r => r.classes || r);
export const getClassById = (id) => fetchJSON(`/classes/${id}`).then(r => r.class || null);

// Roles
export const getRolesByUserId = (id) => {
  if (!id) return Promise.reject(new Error('id required'));
  return fetchJSON(`/userroles/role/${id}`).then(r => r.roles || r);
};
