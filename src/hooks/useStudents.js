import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import * as api from '../api/api';

// Students
export function useStudents() {
  return useQuery({ queryKey: ['students'], queryFn: api.getStudents, staleTime: 1000 * 60 * 2 });
}

export function useStudent(id) {
  return useQuery({ queryKey: ['student', id], queryFn: () => api.getStudentById(id), enabled: !!id });
}

export function useStudentMarks(studentId, opts = {}) {
  return useQuery({ queryKey: ['student', studentId, 'marks'], queryFn: () => api.getStudentMarks(studentId), enabled: !!studentId, ...opts });
}

export function useStudentsByParent(parentId, opts = {}) {
  return useQuery({ queryKey: ['students', 'by-parent', parentId], queryFn: () => api.getStudentsByParent(parentId), enabled: !!parentId, ...opts });
}

export function useAddStudent() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: api.addStudent, onSuccess: () => qc.invalidateQueries({ queryKey: ['students'] }) });
}

export function useUpdateStudent() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: api.updateStudent, onSuccess: () => qc.invalidateQueries({ queryKey: ['students'] }) });
}

export function useDeleteStudent() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: api.deleteStudent, onSuccess: () => qc.invalidateQueries({ queryKey: ['students'] }) });
}

// Teachers
export function useTeachers() {
  return useQuery({ queryKey: ['teachers'], queryFn: api.getTeachers });
}

export function useTeacher(id) {
  return useQuery({ queryKey: ['teacher', id], queryFn: () => api.getTeacherById(id), enabled: !!id });
}

// Parents
export function useParents() {
  return useQuery({ queryKey: ['parents'], queryFn: api.getParents });
}

export function useParent(id) {
  return useQuery({ queryKey: ['parent', id], queryFn: () => api.getParentById(id), enabled: !!id });
}

// Users
export function useUsers() {
  return useQuery({ queryKey: ['users'], queryFn: api.getUsers });
}

export function useUser(id) {
  return useQuery({ queryKey: ['user', id], queryFn: () => api.getUserById(id), enabled: !!id });
}

// Auth
export function useLogin() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: api.login, onSuccess: () => qc.invalidateQueries() });
}

export function useLogout() {
  return () => api.logout();
}

// Homework / Materials / Timetables / Classes
export function useHomework() {
  return useQuery({ queryKey: ['homework'], queryFn: api.getHomework });
}

export function useMaterials() {
  return useQuery({ queryKey: ['materials'], queryFn: api.getMaterials });
}

export function useTimetables() {
  return useQuery({ queryKey: ['timetables'], queryFn: api.getTimetables });
}

export function useClasses() {
  return useQuery({ queryKey: ['classes'], queryFn: api.getClasses });
}

export function useClass(id) {
  return useQuery({ queryKey: ['class', id], queryFn: () => api.getClassById(id), enabled: !!id });
}
