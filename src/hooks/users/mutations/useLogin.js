import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as authAPI from "../../../api/auth.js";
import { decodeToken } from "../../../utils/jwt";
import { prefetchUserData } from "../../../utils/prefetch";

export function useLogin() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: authAPI.login,
    onSuccess: (data) => {
      // Invalidate queries and prefetch user data when possible
      qc.invalidateQueries();
      const userId = data?.user?.id || decodeToken(data?.accessToken)?.userId || null;
      if (userId) prefetchUserData(qc, userId);
    },
  });
}
