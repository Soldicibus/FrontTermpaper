import api from "./lib/api.js";

export const getAllDays = async () => {
  const request = await api.get("/days");
  return request;
};

export const getDayById = async (id) => {
  const request = await api.get(`/days/${id}`);
  return request;
};

export const createDay = async (dayName, dayTime, dayWeekday) => {
  const request = await api.post("/days", {
    dayName,
    dayTime,
    dayWeekday,
  });
  return request;
};

export const updateDay = async (id, dayName, dayTime, dayWeekday) => {
  const request = await api.patch(`/days/${id}`, {
    dayName,
    dayTime,
    dayWeekday,
  });
  return request;
};

export const deleteDay = async (id) => {
  const request = await api.delete(`/days/${id}`);
  return request;
};
