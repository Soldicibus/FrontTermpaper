import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import * as api from "../api/api_old.js";
import * as teacherAPI from "../api/teacherAPI.js";
import { decodeToken } from "../utils/jwt.js";
import { prefetchUserData } from "../utils/prefetch.js";

// Students
export function useStudents() {
  return useQuery({
    queryKey: ["students"],
    queryFn: api.getStudents,
    staleTime: 1000 * 60 * 2,
  });
}

export function useStudent(id) {
  return useQuery({
    queryKey: ["student", id],
    queryFn: () => api.getStudentById(id),
    enabled: !!id,
  });
}

export function useStudentMarks(studentId, opts = {}) {
  return useQuery({
    queryKey: ["student", studentId, "marks"],
    queryFn: () => api.getStudentMarks(studentId),
    enabled: !!studentId,
    ...opts,
  });
}

export function useStudentDayPlan(studentId, opts = {}) {
  return useQuery({
    queryKey: ["student", studentId, "day-plan", opts.fromDate, opts.toDate],
    queryFn: () => api.getStudentDayPlan(studentId, opts.fromDate, opts.toDate),
    enabled: !!studentId && !!opts.fromDate,
    ...opts,
  });
}

export function useStudentGradesAndAbsences(studentId, opts = {}) {
  return useQuery({
    queryKey: ["student", studentId, "grades-absences"],
    queryFn: () => api.getStudentGradesAndAbsences(studentId),
    enabled: !!studentId,
    ...opts,
  });
}

export function useStudentRanking(opts = {}) {
  return useQuery({
    queryKey: ["students", "ranking"],
    queryFn: () => api.getStudentRanking(),
    ...opts,
  });
}

export function useStudentsByParent(parentId, opts = {}) {
  return useQuery({
    queryKey: ["students", "by-parent", parentId],
    queryFn: () => api.getStudentsByParent(parentId),
    enabled: !!parentId,
    ...opts,
  });
}

export function useAddStudent() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: api.addStudent,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["students"] }),
  });
}

export function useUpdateStudent() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: api.updateStudent,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["students"] }),
  });
}

export function useDeleteStudent() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: api.deleteStudent,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["students"] }),
  });
}

// Teachers
export function useTeachers() {
  return useQuery({
    enabled: false,
    queryKey: ["teachers"],
    queryFn: teacherAPI.getTeachers(),
  });
}

export function useTeacher(id) {
  return useQuery({
    queryKey: ["teacher", id],
    queryFn: () => api.getTeacherById(id),
    enabled: !!id,
  });
}

// Parents
export function useParents() {
  return useQuery({ queryKey: ["parents"], queryFn: api.getParents });
}

export function useParent(id) {
  return useQuery({
    queryKey: ["parent", id],
    queryFn: () => api.getParentById(id),
    enabled: !!id,
  });
}

// Users
export function useUsers() {
  return useQuery({ queryKey: ["users"], queryFn: api.getUsers });
}

export function useUser(id) {
  return useQuery({
    queryKey: ["user", id],
    queryFn: () => api.getUserById(id),
    enabled: !!id,
  });
}

export function useUserData(id, opts = {}) {
  return useQuery({
    queryKey: ["user-data", id],
    queryFn: () => api.getUserData(id),
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
    ...opts,
  });
}

export function useUserRoles(id, opts = {}) {
  return useQuery({
    queryKey: ["user-roles", id],
    queryFn: () => api.getRolesByUserId(id),
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
    ...opts,
  });
}

// Auth
export function useLogin() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: api.login,
    onSuccess: (data) => {
      qc.invalidateQueries();
      // data may contain user object or accessToken
      const userId =
        data?.user?.id || decodeToken(data?.accessToken)?.userId || null;
      if (userId) prefetchUserData(qc, userId);
    },
  });
}

export function useLogout() {
  return () => api.logout();
}

// Homework / Materials / Timetables / Classes
export function useHomework() {
  return useQuery({ queryKey: ["homework"], queryFn: api.getHomework });
}

export function useHomeworkByStudent(studentId, opts = {}) {
  return useQuery({
    queryKey: ["homework", "by-student", studentId],
    queryFn: () => api.getHomeworkByStudentId(studentId),
    enabled: !!studentId,
    ...opts,
  });
}

export function useHomeworkForTomorrow(opts = {}) {
  return useQuery({
    queryKey: ["homework", "for-tomorrow"],
    queryFn: () => api.getHomeworkForTomorrow(),
    ...opts,
  });
}

export function useMaterials() {
  return useQuery({ queryKey: ["materials"], queryFn: api.getMaterials });
}

export function useTimetables() {
  return useQuery({ queryKey: ["timetables"], queryFn: api.getTimetables });
}

export function useClasses() {
  return useQuery({ queryKey: ["classes"], queryFn: api.getClasses });
}

export function useClass(id) {
  return useQuery({
    queryKey: ["class", id],
    queryFn: () => api.getClassById(id),
    enabled: !!id,
  });
}

export function useStudentMarks7d(studentId, opts = {}) {
  return useQuery({
    queryKey: ["student", studentId, "marks-7d"],
    queryFn: () => api.getStudentMarks7d(studentId),
    enabled: !!studentId,
    ...opts,
  });
}

export function useWeeklyTimetable(className, opts = {}) {
  return useQuery({
    queryKey: ["timetable", "week", className],
    queryFn: () => api.getWeeklyTimetableByClassName(className),
    enabled: !!className,
    ...opts,
  });
}

export function useWeeklyTimetableById(timetableId, opts = {}) {
  return useQuery({
    queryKey: ["timetable", "week", "id", timetableId],
    queryFn: () => api.getWeeklyTimetableById(timetableId),
    enabled: !!timetableId,
    ...opts,
  });
}

export function useTimetableByStudent(studentId, opts = {}) {
  return useQuery({
    queryKey: ["timetable", "by-student", studentId],
    queryFn: () => api.getTimetableByStudentId(studentId),
    enabled: !!studentId,
    ...opts,
  });
}

export function useStudentAttendanceReport(
  studentId,
  startDate,
  endDate,
  opts = {},
) {
  return useQuery({
    queryKey: ["student", studentId, "attendance-report", startDate, endDate],
    queryFn: () =>
      api.getStudentAttendanceReport(studentId, startDate, endDate),
    enabled: !!studentId,
    ...opts,
  });
}
