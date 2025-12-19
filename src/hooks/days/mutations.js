import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as daysAPI from "../../api/daysAPI.js";

export function useCreateDay() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: daysAPI.createDay,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["days"] }),
  });
}

export function useUpdateDay() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: daysAPI.updateDay,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["days"] }),
  });
}

export function useDeleteDay() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: daysAPI.deleteDay,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["days"] }),
  });
}