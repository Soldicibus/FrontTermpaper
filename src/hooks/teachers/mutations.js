import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as teacherAPI from "../../api/teacherAPI.js";

export function useCreateTeacher() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: teacherAPI.createTeacher,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["teachers"] }),
  });
}

export function useUpdateTeacher() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: teacherAPI.patchTeacher,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["teachers"] }),
  });
}

export function useDeleteTeacher() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: teacherAPI.deleteTeacher,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["teachers"] }),
  });
}