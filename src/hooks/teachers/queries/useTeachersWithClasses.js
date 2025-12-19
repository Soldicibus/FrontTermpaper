import { useQuery } from "@tanstack/react-query";
import * as teacherAPI from "../../api/teacherAPI.js";

export function useTeachersWithClasses() {
  return useQuery({
    queryKey: ["teachers", "with-classes"],
    queryFn: teacherAPI.getTeachersWithClasses,
  });
}