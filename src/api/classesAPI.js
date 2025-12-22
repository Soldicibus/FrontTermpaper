import api from "./lib/api.js";

export const getAllClasses = async () => {
  const request = await api.get("/classes");
  return request.data.classes;
};

export const getClassByName = async (name) => {
  let decoded = name;
  try {
    decoded = decodeURIComponent(name);
  } catch {
    decoded = name;
  }
  const safeSegment = encodeURIComponent(decoded);
  const request = await api.get(`/classes/${safeSegment}`);
  const data = request.data;
  return data.class;
};

export const getClassRatingReport = async () => {
  const request = await api.get(`/classes/rate/rating`);
  return request.data.report;
}

export const createClass = async (name, journalId, mainTeacherId) => {
  const request = await api.post("/classes", {
    name,
    journalId,
    mainTeacherId,
  });
  return request;
};

export const updateClass = async (name, mainTeacherId) => {
  const request = await api.patch(`/classes/${name}`, {
    mainTeacherId,
  });
  return request;
};

export const deleteClass = async (name) => {
  const request = await api.delete(`/classes/${name}`);
  return request;
};
