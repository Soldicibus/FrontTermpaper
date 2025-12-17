import React from "react";
import { useMaterials } from "../../../hooks/useStudents";
import { getCurrentUserClass } from "../../../utils/auth";

export default function StudentMaterials() {
  const { data: materials, isLoading } = useMaterials();
  const studentClass = getCurrentUserClass();
  let list = Array.isArray(materials) && materials.length ? materials : [];
  if (studentClass) {
    list = list.filter(m => (m.classId && `${m.classId}` === `${studentClass}`) || (m.class_c && m.class_c === studentClass) || true);
  }

  return (
    <div className="materials-grid">
      {isLoading && <div>Завантаження матеріалів...</div>}
      {!isLoading && list.map(m => (
        <article key={m.id} className="material-card small">
          <h3>{m.name || m.title}</h3>
          <table className="materials-table">
            <tbody>
              <tr><td>Тип</td><td>{m.type || '—'}</td></tr>
              <tr><td>Дата</td><td>{m.date || m.createdAt || '—'}</td></tr>
            </tbody>
          </table>
          <div style={{marginTop:8}}><a className="btn btn-ghost" href={m.link || '#'}>Відкрити</a></div>
        </article>
      ))}
    </div>
  );
}
