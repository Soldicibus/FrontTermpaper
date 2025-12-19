import { useQuery } from "@tanstack/react-query";
import * as timetablesAPI from "../../api/timetablesAPI.js";

export function useTimetables() {
  return useQuery({
    queryKey: ["timetables"],
    queryFn: timetablesAPI.getAllTimetables,
  });
}

export function useWeeklyTimetable(id) {
  return useQuery({
    queryKey: ["timetable", "week", id],
    queryFn: () => timetablesAPI.getWeeklyTimetable(id),
    enabled: !!id,
  });
}

export function useTimetableByStudent(studentId) {
  return useQuery({
    queryKey: ["timetable", "by-student", studentId],
    queryFn: () => timetablesAPI.getTimetableByStudentId(studentId),
    enabled: !!studentId,
  });
}

export function useTimetable(id) {
  return useQuery({
    queryKey: ["timetable", id],
    queryFn: () => timetablesAPI.getTimetableById(id),
    enabled: !!id,
  });
}