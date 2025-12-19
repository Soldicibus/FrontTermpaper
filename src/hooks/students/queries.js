import { useQuery } from "@tanstack/react-query";
import * as studentAPI from "../../api/studentAPI.js";

export function useStudents() {
  return useQuery({
    queryKey: ["students"],
    queryFn: studentAPI.getAllStudents,
  });
}

export function useStudent(id) {
  return useQuery({
    queryKey: ["student", id],
    queryFn: () => studentAPI.getStudentById(id),
    enabled: !!id,
  });
}

export function useStudentAVGAbove7() {
  return useQuery({
    queryKey: ["students", "avg-above-7"],
    queryFn: studentAPI.getStudentAVGAbove7,
  });
}

export function useStudentByClass() {
  return useQuery({
    queryKey: ["students", "by-class"],
    queryFn: studentAPI.getStudentByClass,
  });
}

export function useStudentRanking() {
  return useQuery({
    queryKey: ["students", "ranking"],
    queryFn: studentAPI.getStudentRanking,
  });
}

export function useStudentByParent(parentId) {
  return useQuery({
    queryKey: ["students", "by-parent", parentId],
    queryFn: () => studentAPI.getStudentByParentId(parentId),
    enabled: !!parentId,
  });
}

export function useStudentGradesAndAbsences() {
  return useQuery({
    queryKey: ["students", "grades-absences"],
    queryFn: studentAPI.getGradesAndAbsences,
  });
}

export function useStudentMarks() {
  return useQuery({
    queryKey: ["students", "marks"],
    queryFn: studentAPI.getStudentsMarks,
  });
}

export function useStudentAttendance() {
  return useQuery({
    queryKey: ["students", "attendance"],
    queryFn: studentAPI.getStudentsAttendance,
  });
}

export function useStudentDayPlan() {
  return useQuery({
    queryKey: ["students", "day-plan"],
    queryFn: studentAPI.getStudentsDayPlan,
  });
}