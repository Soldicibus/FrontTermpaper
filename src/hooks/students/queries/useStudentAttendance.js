import { useQuery } from "@tanstack/react-query";
import * as studentAPI from "../../../api/studentAPI.js";

export function useStudentAttendance() {
  return useQuery({
    queryKey: ["students", "attendance"],
    queryFn: studentAPI.getStudentsAttendance,
  });
}

// Backwards-compatible name used by some pages
export const useStudentAttendanceReport = useStudentAttendance;