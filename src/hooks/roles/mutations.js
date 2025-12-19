import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as rolesAPI from "../../api/rolesAPI.js";

export function useCreateRole() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: rolesAPI.createRole,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["roles"] }),
  });
}

export function useUpdateRole() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: rolesAPI.updateRole,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["roles"] }),
  });
}

export function useDeleteRole() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: rolesAPI.deleteRole,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["roles"] }),
  });
}