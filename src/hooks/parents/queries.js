import { useQuery } from "@tanstack/react-query";
import * as parentAPI from "../../api/parentAPI.js";

export function useParents() {
  return useQuery({
    queryKey: ["parents"],
    queryFn: parentAPI.getParents,
  });
}

export function useParent(id) {
  return useQuery({
    queryKey: ["parent", id],
    queryFn: () => parentAPI.getParentById(id),
    enabled: !!id,
  });
}