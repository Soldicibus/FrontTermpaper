import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as homeworkAPI from "../../api/homeworkAPI.js";

export function useCreateHomework() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: homeworkAPI.createHomework,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["homework"] }),
  });
}

export function useUpdateHomework() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: homeworkAPI.updateHomework,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["homework"] }),
  });
}

export function useDeleteHomework() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: homeworkAPI.deleteHomework,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["homework"] }),
  });
}