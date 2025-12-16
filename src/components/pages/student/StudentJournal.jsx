import React from "react";
import { useStudentMarks } from "../../../hooks/useStudents";

export default function StudentJournal() {

  const studentId = 1;
  const { data: marksData, isLoading, error } = useStudentMarks(studentId);

  const sample = [
    { subject: 'Математика', date: '2025-09-12', mark: 10, status: 'Присутній' },
    { subject: 'Українська мова', date: '2025-09-13', mark: null, status: 'Не присутній' },
    { subject: 'Математика', date: '2025-09-19', mark: 9, status: 'Присутній' },
    { subject: 'Фізика', date: '2025-09-20', mark: 8, status: 'Присутній' },
  ];

  const entries = Array.isArray(marksData) && marksData.length ? marksData : sample;

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
