import { useQuery } from "@tanstack/react-query";
import * as homeworkAPI from "../../api/homeworkAPI.js";

export function useHomework() {
  return useQuery({
    queryKey: ["homework"],
    queryFn: homeworkAPI.getAllHomework,
  });
}

export function useHomeworkById(id) {
  return useQuery({
    queryKey: ["homework", id],
    queryFn: () => homeworkAPI.getHomeworkById(id),
    enabled: !!id,
  });
}

export function useHomeworkByStudentOrClass(studentId) {
  return useQuery({
    queryKey: ["homework", "by-student-or-class", studentId],
    queryFn: () => homeworkAPI.getHomeworkByStudentOrClass(studentId),
    enabled: !!studentId,
  });
}

export function useHomeworkForTomorrow() {
  return useQuery({
    queryKey: ["homework", "for-tomorrow"],
    queryFn: homeworkAPI.getHomeworkForTomorrow,
  });
}