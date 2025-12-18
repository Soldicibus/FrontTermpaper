import React from 'react';
import { useStudentRanking } from '../../../hooks/useStudents';

function displayName(row) {
  if (!row) return '—';
  // common possibilities
  return (
    row.student_name || row.name || row.first_name || row.student_name || row.full_name ||
    (row.firstname || row.first) && `${row.firstname || row.first} ${row.student_surname || row.last_name || ''}` ||
    row.username || row.login || '—'
  );
}

function displaySurname(row) {
  if (!row) return '—';
  return row.student_surname || row.last_name || '—';
}

function displayAvg(row) {
  if (!row) return '—';
  const candidates = [row.avg, row.average, row.mean, row.avg_mark, row.average_mark, row.average_score, row.score];
  for (const v of candidates) if (v != null) return Number(v).toFixed(2);
  return '—';
}

export default function StudentRanking() {
  const { data: ranking, isLoading, error } = useStudentRanking();

  if (isLoading) return <div>Завантаження рейтингу...</div>;
  if (error) return <div>Помилка: {error.message || 'Не вдалося завантажити рейтинг'}</div>;

  let rows = Array.isArray(ranking) ? ranking : (ranking && Array.isArray(ranking.students) ? ranking.students : []);

  // If the rows are arrays (positional), map to objects: [id, name, class, avg, rank]
  if (rows.length > 0 && Array.isArray(rows[0])) {
    rows = rows.map(r => ({ id: r[0], name: r[1], class: r[2], avg: r[3], rank: r[4] }));
  }

  if (!rows || rows.length === 0) return <div>Рейтинг наразі порожній</div>;

  // sort by numeric average descending
  function getAvgNumeric(row) {
    const candidates = [row.avg_mark, row.avg, row.average, row.mean, row.average_mark, row.average_score, row.score];
    for (const v of candidates) {
      if (v != null && v !== '') {
        const n = Number(String(v).replace(',', '.'));
        if (!Number.isNaN(n)) return n;
      }
    }
    return -Infinity;
  }

  const sorted = rows.slice().sort((a, b) => getAvgNumeric(b) - getAvgNumeric(a));

  return (
    <div className="card">
      <h3>Рейтинг учнів</h3>
      <table className="table">
        <thead>
          <tr>
            <th>Місце</th>
            <th>Ім'я</th>
            <th>Прізвище</th>
            <th>Клас</th>
            <th>Середній</th>
          </tr>
        </thead>
        <tbody>
          {sorted.map((r, idx) => (
            <tr key={r.id || r.student_id || idx}>
              <td>{idx + 1}</td>
              <td>{displayName(r)}</td>
              <td>{displaySurname(r)}</td>
              <td>{r.student_class || r.class || r.class_c || r.className || '—'}</td>
              <td>{displayAvg(r)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* If rows appear to have no name/avg fields, show a small debug preview of the first row */}
      {sorted.length > 0 && !(displayName(sorted[0]) !== '—' || displayAvg(sorted[0]) !== '—') && (
        <pre style={{ fontSize: 12, marginTop: 8 }}>{JSON.stringify(sorted[0], null, 2)}</pre>
      )}
    </div>
  );
}
