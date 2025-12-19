import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as materialsAPI from "../../api/materialsAPI.js";

export function useCreateMaterial() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: materialsAPI.createMaterial,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["materials"] }),
  });
}

export function useUpdateMaterial() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: materialsAPI.updateMaterial,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["materials"] }),
  });
}

export function useDeleteMaterial() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: materialsAPI.deleteMaterial,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["materials"] }),
  });
}