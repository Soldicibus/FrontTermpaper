import React from 'react';
import { useStudentGradesAndAbsences } from '../../../hooks/students/queries/useStudentGradesAndAbsences';
import { useStudentAttendanceReport } from '../../../hooks/students/queries/useStudentAttendance';
import { useUserData } from '../../../hooks/users/queries/useUserData';
import { getCurrentStudentId, getCurrentUser } from '../../../utils/auth';

export default function StudentGradesAndAbsences({ enabled = true, studentId: propStudentId }) {
  const tokenStudentId = propStudentId || getCurrentStudentId();
  const currentUser = getCurrentUser();
  const userId = currentUser?.userId || currentUser?.id || currentUser?.sub || null;
  const { data: userRes, isLoading: userDataLoading } = useUserData(userId, { enabled: !!userId });
  const userData = userRes?.userData ?? userRes?.user ?? userRes ?? null;

  // Resolve student id from token first, then userData.entity_id or userData.student_id
  let resolvedStudentId = tokenStudentId || null;
  if (!resolvedStudentId && userData) {
    resolvedStudentId = userData?.student_id || userData?.studentId || userData?.entity_id || userData?.entityId || null;
  }
  if (import.meta?.env?.DEV) {
    console.log('student grades: resolvedStudentId', { tokenStudentId, userId, resolvedStudentId, userData });
  }

  const { data: gradesData, isLoading: gradesLoading, error } = useStudentGradesAndAbsences(resolvedStudentId, { enabled: enabled && !!resolvedStudentId });
  // fetch attendance totals for a wide range by default
  const today = new Date().toISOString().slice(0,10);
  const { data: attendanceReport = [], isLoading: attendanceLoading } = useStudentAttendanceReport(resolvedStudentId, '1970-01-01', today, { enabled: !!resolvedStudentId });
  const isLoading = userDataLoading || gradesLoading || attendanceLoading;

  if (isLoading) return <div>Завантаження оцінок...</div>;
  if (error) return <div>Помилка: {error.message || 'Не вдалося завантажити дані'}</div>;
  if (!gradesData || gradesData.length === 0) return <div>Немає даних про оцінки або відсутності</div>;

  // If the response is aggregated per-subject (has subject_name and absences count), render a summary view.
  const isAggregated = gradesData[0] && (gradesData[0].subject_name || typeof gradesData[0].absences !== 'undefined');
  // Pull out attendance totals if available (attendanceReport is expected to be [{ present, absent, present_percent }])
  const attendanceTotals = Array.isArray(attendanceReport) && attendanceReport.length > 0 ? attendanceReport[0] : null;
  const presentCount = attendanceTotals ? (attendanceTotals.present ?? 0) : null;
  const absentCount = attendanceTotals ? (attendanceTotals.absent ?? 0) : null;
  const presentPercent = attendanceTotals ? (attendanceTotals.present_percent ?? null) : null;
  
  // Attendance summary table component and status message
  const AttendanceSummaryTable = () => (
    attendanceTotals ? (
      <div>
        <table className="card" style={{ marginBottom: 12 }}>
          <thead>
            <tr>
              <th>Присутні</th>
              <th>Відсутні</th>
              <th>Присутність</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>{presentCount ?? '—'}</strong></td>
              <td><strong>{absentCount ?? '—'}</strong></td>
              <td><strong>{presentPercent != null ? `${Number(presentPercent).toFixed(2)}%` : '—'}</strong></td>
            </tr>
          </tbody>
        </table>
        {presentPercent != null && (
          <div className="attendance-status">
            {Number(presentPercent) >= 75 ? (
              <span className="attendance-ok">Норма — відвідуваність відповідає вимогам</span>
            ) : (
              <span className="attendance-bad">Потрібно відвідувати більше уроків</span>
            )}
          </div>
        )}
      </div>
    ) : null
  );

  return <AttendanceSummaryTable />;
}
