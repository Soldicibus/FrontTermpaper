import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import * as api from '../api/api';

export function useStudents() {
  return useQuery({ queryKey: ['students'], queryFn: api.getStudents, staleTime: 1000 * 60 * 2 });
}

export function useStudent(id) {
  return useQuery({ queryKey: ['student', id], queryFn: () => api.getStudentById(id), enabled: !!id });
}

export function useStudentMarks(studentId, opts = {}) {
  return useQuery({ queryKey: ['student', studentId, 'marks'], queryFn: () => api.getStudentMarks(studentId), enabled: !!studentId, ...opts });
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
