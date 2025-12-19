import { useQuery } from "@tanstack/react-query";
import * as rolesAPI from "../../api/rolesAPI.js";

export function useRoles() {
  return useQuery({
    queryKey: ["roles"],
    queryFn: rolesAPI.getAllRoles,
  });
}

export function useRole(id) {
  return useQuery({
    queryKey: ["role", id],
    queryFn: () => rolesAPI.getRoleById(id),
    enabled: !!id,
  });
}