import api from "./lib/api.js";

export const getAllClasses = async () => {
  const request = await api.get("/classes");
  return request;
};

export const getClassById = async (id) => {
  const request = await api.get(`/classes/${id}`);
  return request;
};

export const createClass = async (name, journalId, mainTeacherId) => {
  const request = await api.post("/classes", {
    name,
    journalId,
    mainTeacherId,
  });
  return request;
};

export const updateClass = async (id, name, mainTeacherId) => {
  const request = await api.patch(`/classes/${id}`, {
    name,
    mainTeacherId,
  });
  return request;
};

export const deleteClass = async (id) => {
  const request = await api.delete(`/classes/${id}`);
  return request;
};
