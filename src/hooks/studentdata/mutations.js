import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as studentdataAPI from "../../api/studentdataAPI.js";

export function useCreateStudentData() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: studentdataAPI.createStudentData,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["studentdata"] }),
  });
}

export function useUpdateStudentData() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: studentdataAPI.updateStudentData,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["studentdata"] }),
  });
}

export function useDeleteStudentData() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: studentdataAPI.deleteStudentData,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["studentdata"] }),
  });
}