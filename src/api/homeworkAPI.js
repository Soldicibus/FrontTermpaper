import api from "./lib/api.js";

export const getAllHomework = async () => {
  const request = await api.get("/homework");
  const data = request.data;
  return data?.homework ?? data?.rows ?? data;
};

export const getHomeworkById = async (id) => {
  const request = await api.get(`/homework/${id}`);
  return request.data;
};

export const getHomeworkByStudentOrClass = async (studentId) => {
  const request = await api.get(`/homework/by-student-or-class/${studentId}`);
  const data = request.data;
  return data?.homework ?? data?.rows ?? data;
};

export const getHomeworkForTomorrow = async () => {
  const request = await api.get("/homework/for-tomorrow");
  const data = request.data;
  return data?.homework ?? data?.rows ?? data;
};

export const createHomework = async (
  name,
  description,
  dueDate,
  subjectId,
  classId,
) => {
  const request = await api.post("/homework", {
    name,
    description,
    dueDate,
    subjectId,
    classId,
  });
  return request.data;
};

export const updateHomework = async (id, name, description, dueDate) => {
  const request = await api.patch(`/homework/${id}`, {
    name,
    description,
    dueDate,
  });
  return request.data;
};

export const deleteHomework = async (id) => {
  const request = await api.delete(`/homework/${id}`);
  return request.data;
};
