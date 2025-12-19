import { useQuery } from "@tanstack/react-query";
import * as teacherAPI from "../../api/teacherAPI.js";

export function useTeacherSalaryReport() {
  return useQuery({
    queryKey: ["teachers", "salary-report"],
    queryFn: teacherAPI.getTeacherSalaryReport,
  });
}