import React from 'react';
import { useStudentGradesAndAbsences } from '../../../hooks/useStudents';
import { getCurrentStudentId } from '../../../utils/auth';

export default function StudentGradesAndAbsences({ enabled = true, studentId: propStudentId }) {
  const studentId = propStudentId || getCurrentStudentId();
  const { data: gradesData, isLoading, error } = useStudentGradesAndAbsences(studentId, { enabled: enabled && !!studentId });

  if (isLoading) return <div>Завантаження оцінок...</div>;
  if (error) return <div>Помилка: {error.message || 'Не вдалося завантажити дані'}</div>;
  if (!gradesData || gradesData.length === 0) return <div>Немає даних про оцінки або відсутності</div>;

  return (
    <div className="card">
      <h3>Оцінки та відсутності</h3>
      <table className="table">
        <thead>
          <tr>
            <th>Предмет</th>
            <th>Оцінка</th>
            <th>Дата</th>
            <th>Тип/Коментар</th>
          </tr>
        </thead>
        <tbody>
          {gradesData.map((r, idx) => (
            <tr key={idx}>
              <td>{r.subject || r.discipline || '—'}</td>
              <td>{r.grade != null ? r.grade : (r.absent ? 'Відсутній' : '—')}</td>
              <td>{r.date || r.record_date || '—'}</td>
              <td>{r.type || r.comment || '—'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
