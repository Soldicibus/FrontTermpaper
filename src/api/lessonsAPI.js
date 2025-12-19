import api from "./lib/api.js";

export const getAllLessons = async () => {
  const request = await api.get("/lessons");
  return request;
};

export const getLessonById = async (id) => {
  const request = await api.get(`/lessons/${id}`);
  return request;
};

export const createLesson = async (
  name,
  className,
  subjectId,
  materialId,
  teacherId,
  date,
) => {
  const request = await api.post("/lessons", {
    name,
    className,
    subjectId,
    materialId,
    teacherId,
    date,
  });
  return request;
};

export const updateLesson = async (
  id,
  name,
  className,
  subjectId,
  materialId,
  teacherId,
  date,
) => {
  const request = await api.patch(`/lessons/${id}`, {
    name,
    className,
    subjectId,
    materialId,
    teacherId,
    date,
  });
  return request;
};

export const deleteLesson = async (id) => {
  const request = await api.delete(`/lessons/${id}`);
  return request;
};
