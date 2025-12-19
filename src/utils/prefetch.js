import * as usersAPI from "../api/userAPI.js";
import * as rolesAPI from "../api/rolesAPI.js";
import * as studentAPI from "../api/studentAPI.js";
import * as homeworkAPI from "../api/homeworkAPI.js";
import * as materialsAPI from "../api/materialsAPI.js";
import * as timetablesAPI from "../api/timetablesAPI.js";
import * as classesAPI from "../api/classesAPI.js";

export async function prefetchUserData(queryClient, userId) {
  if (!userId || !queryClient) return;
  try {
    // Basic profile
    queryClient.prefetchQuery({ queryKey: ["user-data", userId], queryFn: () => usersAPI.getUserData(userId) });
    // Roles
    queryClient.prefetchQuery({ queryKey: ["user-roles", userId], queryFn: () => rolesAPI.getAllRoles() });
    // Student records
    queryClient.prefetchQuery({ queryKey: ["student", userId], queryFn: () => studentAPI.getStudentById(userId) });
    queryClient.prefetchQuery({ queryKey: ["student", userId, "marks"], queryFn: () => studentAPI.getStudentsMarks() });
    queryClient.prefetchQuery({ queryKey: ["student", userId, "day-plan"], queryFn: () => studentAPI.getStudentsDayPlan() });
    queryClient.prefetchQuery({ queryKey: ["student", userId, "grades-absences"], queryFn: () => studentAPI.getGradesAndAbsences() });
    // General data
    queryClient.prefetchQuery({ queryKey: ["homework"], queryFn: () => homeworkAPI.getAllHomework() });
    queryClient.prefetchQuery({ queryKey: ["materials"], queryFn: () => materialsAPI.getAllMaterials() });
    queryClient.prefetchQuery({ queryKey: ["timetables"], queryFn: () => timetablesAPI.getAllTimetables() });
    queryClient.prefetchQuery({ queryKey: ["classes"], queryFn: () => classesAPI.getAllClasses() });
  } catch (err) {
    // ignore prefetch failures
    // eslint-disable-next-line no-console
    console.warn('[prefetch] failed to prefetch user data', err?.message || err);
  }
}
