import { useQuery } from "@tanstack/react-query";
import * as userroleAPI from "../../api/userroleAPI.js";

export function useUserRoles(userId) {
  return useQuery({
    queryKey: ["user-roles", userId],
    queryFn: () => userroleAPI.getRolesByUserId(userId),
    enabled: !!userId,
  });
}