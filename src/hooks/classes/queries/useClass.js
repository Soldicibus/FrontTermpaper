import { useQuery } from "@tanstack/react-query";
import * as classesAPI from "../../api/classesAPI.js";

export function useClass(id) {
  return useQuery({
    queryKey: ["class", id],
    queryFn: () => classesAPI.getClassById(id),
    enabled: !!id,
  });
}