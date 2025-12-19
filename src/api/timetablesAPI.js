import api from "./lib/api.js";

export const getAllTimetables = async () => {
  const request = await api.get("/timetables");
  return request;
};

export const getWeeklyTimetable = async (id) => {
  const request = await api.get(`/timetables/week/${id}`);
  return request;
};

export const getTimetableByStudentId = async (id) => {
  const request = await api.get(`/timetables/student/${id}`);
  return request;
};

export const getTimetableById = async (id) => {
  const request = await api.get(`/timetables/${id}`);
  return request;
};

export const createTimetable = async (name, classId) => {
  const request = await api.post("/timetables", {
    name,
    classId,
  });
  return request;
};

export const updateTimetable = async (id, name, classId) => {
  const request = await api.patch(`/timetables/${id}`, {
    name,
    classId,
  });
  return request;
};

export const deleteTimetable = async (id) => {
  const request = await api.delete(`/timetables/${id}`);
  return request;
};
