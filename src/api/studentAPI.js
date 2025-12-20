import api from "./lib/api.js";

export const getAllStudents = async () => {
  const request = await api.get("/students");

  return request.data.students;
};
export const getStudentAVGAbove7 = async () => {
  const request = await api.get("/students/avg-above-7");
  const data = request.data;
  return data;
};
export const getStudentByClass = async () => {
  const request = await api.get("/students/class");
  const data = request.data;
  return data.student ?? data;
};
export const getStudentRanking = async () => {
  const request = await api.get("/students/ranking");
  const data = request.data;
  return data;
};
export const getStudentByParentId = async (id) => {
  const request = await api.get(`/students/by-parent/${id}`);
  const data = request.data;
  return data.student ?? data;
}
export const getGradesAndAbsences = async () => {
  const request = await api.get("/students/grades-and-absences");

  return request.data;
};
export const getStudentsMarks = async () => {
  const request = await api.get("/students/marks");

  return request.data;
};
export const getStudentsAttendance = async () => {
  const request = await api.get("/students/attendance");

  return request.data;
};
export const getStudentsDayPlan = async () => {
  const request = await api.get("/students/day-plan");

  return request.data;
};

export const getStudentById = async (id) => {
  const request = await api.get(`/students/${id}`);
  const data = request.data;
  return data.student ?? data;
};

export const createStudent = async (
  name,
  surname,
  patronym,
  phone,
  class_c,
) => {
  const request = await api.post("/studens", {
    name,
    surname,
    patronym,
    phone,
    class_c,
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
    name,
    surname,
    patronym,
    phone,
    class_c,
    user_id,
  });

  return request;
};

export const deleteStudent = async (id) => {
  const request = await api.delete(`/studens/${id}`);

  return request;
};
