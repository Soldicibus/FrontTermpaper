import React, { useState } from 'react';
import { useStudentDayPlan } from '../../../hooks/useStudents';
import { getCurrentStudentId } from '../../../utils/auth';

function toInputDate(d) {
  const dt = new Date(d || Date.now());
  const yyyy = dt.getFullYear();
  const mm = String(dt.getMonth() + 1).padStart(2, '0');
  const dd = String(dt.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
}

export default function StudentDayPlan({ studentId: propStudentId }) {
  const studentId = propStudentId || getCurrentStudentId();
  const [date, setDate] = useState(toInputDate());

  const { data: dayPlan, isLoading, error } = useStudentDayPlan(studentId, { fromDate: date, toDate: date, enabled: !!studentId });

  if (isLoading) return <div>Завантаження плану дня...</div>;
  if (error) return <div>Помилка: {error.message || 'Не вдалося завантажити план'}</div>;
  if (!dayPlan || dayPlan.length === 0) return <div>План дня наразі порожній</div>;

  return (
    <div className="card">
      <h3>План дня</h3>
      <div style={{ marginBottom: 8 }}>
        <label>Дата: <input type="date" value={date} onChange={e => setDate(e.target.value)} /></label>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>Дата</th>
            <th>Час</th>
            <th>Предмет</th>
            <th>Вчитель</th>
            <th>Клас/Кімната</th>
            <th>Домашнє</th>
          </tr>
        </thead>
        <tbody>
          {dayPlan.map((row, idx) => (
            <tr key={idx}>
              <td>{row.lesson_date || row.date || '—'}</td>
              <td>{row.lesson_time || row.time || '—'}</td>
              <td>{row.subject || row.lesson_name || '—'}</td>
              <td>{row.teacher || row.teacher_name || '—'}</td>
              <td>{row.room || row.class || row.class_c || '—'}</td>
              <td>{row.homework || row.homework_desc || '—'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
