import api from "./lib/api.js";

export const getAllStudents = async () => {
  const request = await api.get("/students");

  return request;
};
export const getStudentAVGAbove7 = async () => {
  const request = await api.get("/students/avg-above-7");

  return request;
};
export const getStudentByClass = async () => {
  const request = await api.get("/students/class");

  return request;
};
export const getStudentRanking = async () => {
  const request = await api.get("/students/ranking");

  return request;
};
export const getStudentByParentId = async (id) => {
  const request = await api.get(`/students/by-parent/${id}`);

  return request;
};
export const getGradesAndAbsences = async () => {
  const request = await api.get("/students/grades-and-absences");

  return request;
};
export const getStudentsMarks = async () => {
  const request = await api.get("/students/marks");

  return request;
};
export const getStudentsAttendance = async () => {
  const request = await api.get("/students/attendance");

  return request;
};
export const getStudentsDayPlan = async () => {
  const request = await api.get("/students/day-plan");

  return request;
};

export const getStudentById = async (id) => {
  const request = await api.get(`/students/${id}`);

  return request;
};

export const createStudent = async (
  name,
  surname,
  patronym,
  phone,
  class_c,
) => {
  const request = await api.post("/studens", {
    data: { name, surname, patronym, phone, class_c },
  });

  return request;
};

export const patchStudent = async (
  id,
  name,
  surname,
  patronym,
  phone,
  class_c,
  user_id = null,
) => {
  const request = await api.patch(`/studens/${id}`, {
    data: { name, surname, patronym, phone, class_c, user_id },
  });

  return request;
};

export const deleteStudent = async (id) => {
  const request = await api.delete(`/studens/${id}`);

  return request;
};
