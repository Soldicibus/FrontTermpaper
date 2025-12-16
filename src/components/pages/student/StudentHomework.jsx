import React, { useState } from "react";

const sample = [
  { id: 1, subject: 'Фізика', title: '§5, задачі', due: '2025-09-20', teacher: 'Іваненко О.О.', desc: 'Розв’язати задачі з підручника стор. 45–47' },
  { id: 2, subject: 'Українська мова', title: 'Вправи з граматики', due: '2025-09-21', teacher: 'Петренко О.С.', desc: 'Вправа 4, с. 33' },
];

export default function StudentHomework() {
  const [openId, setOpenId] = useState(null);

  return (
    <div className="homework-grid">
      {sample.map(h => (
        <article key={h.id} className={`homework-card ${openId === h.id ? 'open' : ''}`} onClick={() => setOpenId(openId === h.id ? null : h.id)}>
          <header>
            <strong>{h.subject}</strong>
            <span className="hw-title">{h.title}</span>
            <div className="hw-meta">
              <span>До: {h.due}</span>
              <span>{h.teacher}</span>
            </div>
          </header>

          <div className="hw-body">
            <p>{h.desc}</p>
            <button className="btn btn-primary">Відмітити як виконане</button>
          </div>
        </article>
      ))}

      {sample.length === 0 && <div className="empty-state">Немає домашніх завдань</div>}
    </div>
  );
}
