import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as parentAPI from "../../api/parentAPI.js";

export function useCreateParent() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: parentAPI.createParent,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["parents"] }),
  });
}

export function useUpdateParent() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: parentAPI.patchParent,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["parents"] }),
  });
}

export function useDeleteParent() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: parentAPI.deleteParent,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["parents"] }),
  });
}