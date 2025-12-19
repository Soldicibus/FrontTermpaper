import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as journalsAPI from "../../api/journalsAPI.js";

export function useCreateJournal() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: journalsAPI.createJournal,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["journals"] }),
  });
}

export function useUpdateJournal() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: journalsAPI.updateJournal,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["journals"] }),
  });
}

export function useDeleteJournal() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: journalsAPI.deleteJournal,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["journals"] }),
  });
}