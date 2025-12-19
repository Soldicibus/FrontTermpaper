import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as userAPI from "../../api/userAPI.js";

export function useCreateUser() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: userAPI.createUser,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["users"] }),
  });
}

export function useResetPassword() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: userAPI.resetPassword,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["users"] }),
  });
}

export function useUpdateUser() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: userAPI.updateUser,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["users"] }),
  });
}

export function useDeleteUser() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: userAPI.deleteUser,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["users"] }),
  });
}