import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as lessonsAPI from "../../api/lessonsAPI.js";

export function useCreateLesson() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: lessonsAPI.createLesson,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["lessons"] }),
  });
}

export function useUpdateLesson() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: lessonsAPI.updateLesson,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["lessons"] }),
  });
}

export function useDeleteLesson() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: lessonsAPI.deleteLesson,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["lessons"] }),
  });
}