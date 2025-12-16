const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

async function fetchJSON(path, options = {}) {
  const res = await fetch(`${API_BASE}${path}`, options);
  const text = await res.text();
  try {
    const json = text ? JSON.parse(text) : {};
    if (!res.ok) throw new Error(json.error || text || res.statusText);
    return json;
  } catch (err) {
    // If response wasn't JSON
    if (!res.ok) throw new Error(text || res.statusText);
    return {};
  }
}

export const getStudents = () => fetchJSON(`/students`).then(r => r.students || []);
export const getStudentById = (id) => fetchJSON(`/students/${id}`).then(r => r.student || null);
export const getStudentMarks = (studentId, fromDate, toDate) => {
  const params = new URLSearchParams();
  if (studentId) params.set('studentId', studentId);
  if (fromDate) params.set('fromDate', fromDate);
  if (toDate) params.set('toDate', toDate);
  return fetchJSON(`/students/marks?${params.toString()}`).then(r => r.students || []);
};

export const addStudent = (payload) => fetchJSON('/students', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) }).then(r => r.newStudent);
export const updateStudent = (payload) => fetchJSON('/students', { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) }).then(r => r.message);
export const deleteStudent = (id) => fetchJSON(`/students/${id}`, { method: 'DELETE' }).then(r => r.message);
