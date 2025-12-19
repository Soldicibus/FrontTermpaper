import api from "./lib/api.js";

export const getTeachers = async () => {
  const response = await api.get("/teacher");

  return response;
};

export const getTeacherSalaryReport = async () => {
  const response = await api.get("/teacher/salary");

  return response;
};

export const getTeachersWithClasses = async () => {
  const response = await api.get("/teacher/with-classes");

  return response;
};

export const getTeacherById = async (id) => {
  const response = await api.get(`/teacher/${id}`);

  return response;
};

export const createTeacher = async (name, surname, patronym, phone) => {
  const response = await api.post("/teacher", {
    data: { name, surname, patronym, phone },
  });
  return response;
};

export const patchTeacher = async (
  id,
  name,
  surname,
  patronym,
  phone,
  user_id = null,
) => {
  const response = await api.patch(`/teacher/${id}`, {
    data: {
      name,
      surname,
      patronym,
      phone,
      user_id,
    },
  });

  return response;
};

export const deleteTeacher = async (id) => {
  const response = await api.delete(`/teacher/${id}`);

  return response;
};
