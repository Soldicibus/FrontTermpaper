import { useQuery } from "@tanstack/react-query";
import * as studentdataAPI from "../../api/studentdataAPI.js";

export function useStudentData() {
  return useQuery({
    queryKey: ["studentdata"],
    queryFn: studentdataAPI.getAllStudentData,
  });
}

export function useStudentDataById(id) {
  return useQuery({
    queryKey: ["studentdata", id],
    queryFn: () => studentdataAPI.getStudentDataById(id),
    enabled: !!id,
  });
}

export function useStudentDataMarks7d(studentId) {
  return useQuery({
    queryKey: ["studentdata", "marks-7d", studentId],
    queryFn: () => studentdataAPI.getStudentDataMarks7d(studentId),
    enabled: !!studentId,
  });
}