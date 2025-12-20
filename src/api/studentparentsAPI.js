import api from "./lib/api.js";

export const getParentsByStudentId = async (studentId) => {
  const request = await api.get(`/studentparents/${studentId}`);
  const data = request.data;
  return data.parents ?? data;
};

export const assignParentToStudent = async (studentId, parentId) => {
  const request = await api.post("/studentparents/assign", {
    studentId,
    parentId,
  });
  return request;
};

export const unassignParentFromStudent = async (studentId, parentId) => {
  const request = await api.delete("/studentparents/unassign", {
    studentId,
    parentId,
  });
  return request;
};
