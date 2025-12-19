import { useQuery } from "@tanstack/react-query";
import * as userAPI from "../../api/userAPI.js";

export function useUsers() {
  return useQuery({
    queryKey: ["users"],
    queryFn: userAPI.getAllUsers,
  });
}

export function useUser(id) {
  return useQuery({
    queryKey: ["user", id],
    queryFn: () => userAPI.getUserById(id),
    enabled: !!id,
  });
}

export function useUserData(id) {
  return useQuery({
    queryKey: ["user-data", id],
    queryFn: () => userAPI.getUserData(id),
    enabled: !!id,
  });
}