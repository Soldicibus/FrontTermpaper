import React from "react";
import { useStudentMarks } from "../../../hooks/useStudents";
import { getCurrentStudentId } from "../../../utils/auth";

export default function StudentJournal() {

  const studentId = getCurrentStudentId();
  const { data: marksData, isLoading, error } = useStudentMarks(studentId);

  // marksData expected to be array of { subject, date, mark, status }
  const entries = Array.isArray(marksData) && marksData.length ? marksData : [];

  const dates = Array.from(new Set(entries.map(e => e.date))).sort();
  const subjects = Array.from(new Set(entries.map(e => e.subject))).sort();

  const lookup = {};
  entries.forEach(e => {
    lookup[e.subject] = lookup[e.subject] || {};
    lookup[e.subject][e.date] = e;
  });

  const avgForSubject = (subject) => {
    const values = Object.values(lookup[subject] || {}).map(x => x.mark).filter(m => m != null);
    if (!values.length) return '—';
    const avg = (values.reduce((s, v) => s + v, 0) / values.length).toFixed(2);
    return avg;
  };

  return (
    <div className="card journal-card">
      {isLoading && <div className="loading">Завантаження...</div>}
      {error && <div className="error">Помилка завантаження даних</div>}
      {!isLoading && entries.length === 0 && <div className="empty-state">Немає оцінок для цього учня</div>}
      <table className="journal-table">
        <thead>
          <tr>
            <th>Предмет</th>
            {dates.map(d => (
              <th key={d}>{d}</th>
            ))}
            <th>Середній</th>
          </tr>
        </thead>
        <tbody>
          {subjects.map(sub => (
            <tr key={sub}>
              <td className="subject-cell">{sub}</td>
              {dates.map(d => {
                const e = lookup[sub] && lookup[sub][d];
                return (
                  <td key={d} className="mark-cell">
                    {e ? (e.mark != null ? e.mark : e.status === 'Присутній' ? '—' : '—') : '—'}
                  </td>
                );
              })}
              <td>{avgForSubject(sub)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
