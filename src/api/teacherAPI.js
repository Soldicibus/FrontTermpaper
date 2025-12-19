import api from "./lib/api.js";

export const getTeachers = async () => {
  const request = await api.get("/teacher");

  return request;
};

export const getTeacherSalaryReport = async () => {
  const request = await api.get("/teacher/salary");

  return request;
};

export const getTeachersWithClasses = async () => {
  const request = await api.get("/teacher/with-classes");

  return request;
};

export const getTeacherById = async (id) => {
  const request = await api.get(`/teacher/${id}`);

  return request;
};

export const createTeacher = async (name, surname, patronym, phone) => {
  const request = await api.post("/teacher", {
    name,
    surname,
    patronym,
    phone,
  });
  return request;
};

export const patchTeacher = async (
  id,
  name,
  surname,
  patronym,
  phone,
  user_id = null,
) => {
  const request = await api.patch(`/teacher/${id}`, {
    name,
    surname,
    patronym,
    phone,
    user_id,
  });

  return request;
};

export const deleteTeacher = async (id) => {
  const request = await api.delete(`/teacher/${id}`);

  return request;
};
