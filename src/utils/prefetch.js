import * as api from '../api/api';

export async function prefetchUserData(queryClient, userId) {
  if (!userId || !queryClient) return;
  try {
    // Basic profile
    queryClient.prefetchQuery({ queryKey: ['user-data', userId], queryFn: () => api.getUserData(userId) });
    // Roles
    queryClient.prefetchQuery({ queryKey: ['user-roles', userId], queryFn: () => api.getRolesByUserId(userId) });
    // Student records
    queryClient.prefetchQuery({ queryKey: ['student', userId], queryFn: () => api.getStudentById(userId) });
    queryClient.prefetchQuery({ queryKey: ['student', userId, 'marks'], queryFn: () => api.getStudentMarks(userId) });
    queryClient.prefetchQuery({ queryKey: ['student', userId, 'day-plan'], queryFn: () => api.getStudentDayPlan(userId) });
    queryClient.prefetchQuery({ queryKey: ['student', userId, 'grades-absences'], queryFn: () => api.getStudentGradesAndAbsences(userId) });
    // General data
    queryClient.prefetchQuery({ queryKey: ['homework'], queryFn: () => api.getHomework() });
    queryClient.prefetchQuery({ queryKey: ['materials'], queryFn: () => api.getMaterials() });
    queryClient.prefetchQuery({ queryKey: ['timetables'], queryFn: () => api.getTimetables() });
    queryClient.prefetchQuery({ queryKey: ['classes'], queryFn: () => api.getClasses() });
  } catch (err) {
    // ignore prefetch failures
    // eslint-disable-next-line no-console
    console.warn('[prefetch] failed to prefetch user data', err?.message || err);
  }
}
