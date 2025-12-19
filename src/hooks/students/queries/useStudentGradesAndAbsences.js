import { useQuery } from "@tanstack/react-query";
import * as studentAPI from "../../../api/studentAPI.js";

export function useStudentGradesAndAbsences() {
  return useQuery({
    queryKey: ["students", "grades-absences"],
    queryFn: studentAPI.getGradesAndAbsences,
  });
}