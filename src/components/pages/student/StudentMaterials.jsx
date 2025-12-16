import React from "react";

const materials = [
  { id: 1, title: 'Алгебра: Лінійні рівняння', type: 'Презентація', link: '#', date: '2025-09-10' },
  { id: 2, title: 'Фізика: Пояснення', type: 'Відео', link: '#', date: '2025-09-12' },
];

export default function StudentMaterials() {
  return (
    <div className="materials-grid">
      {materials.map(m => (
        <article key={m.id} className="material-card small">
          <h3>{m.title}</h3>
          <table className="materials-table">
            <tbody>
              <tr><td>Тип</td><td>{m.type}</td></tr>
              <tr><td>Дата</td><td>{m.date}</td></tr>
            </tbody>
          </table>
          <div style={{marginTop:8}}><a className="btn btn-ghost" href={m.link}>Відкрити</a></div>
        </article>
      ))}
    </div>
  );
}
