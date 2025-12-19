import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as userroleAPI from "../../api/userroleAPI.js";

export function useAssignRole() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: userroleAPI.assignRole,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["user-roles"] }),
  });
}

export function useRemoveRoleFromUser() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: userroleAPI.removeRoleFromUser,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["user-roles"] }),
  });
}