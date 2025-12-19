import { useQuery } from "@tanstack/react-query";
import * as teacherAPI from "../../api/teacherAPI.js";

export function useTeachers() {
  return useQuery({
    queryKey: ["teachers"],
    queryFn: teacherAPI.getTeachers,
  });
}

export function useTeacher(id) {
  return useQuery({
    queryKey: ["teacher", id],
    queryFn: () => teacherAPI.getTeacherById(id),
    enabled: !!id,
  });
}

export function useTeacherSalaryReport() {
  return useQuery({
    queryKey: ["teachers", "salary-report"],
    queryFn: teacherAPI.getTeacherSalaryReport,
  });
}

export function useTeachersWithClasses() {
  return useQuery({
    queryKey: ["teachers", "with-classes"],
    queryFn: teacherAPI.getTeachersWithClasses,
  });
}