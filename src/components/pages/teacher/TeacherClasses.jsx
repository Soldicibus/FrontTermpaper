import React from "react";
import { useTeachers } from "../../../hooks/useStudents";

export default function TeacherClasses() {
  const { data: teachers, isLoading, error } = useTeachers();

  return (
    <main className="main">
      <div className="main__header">
        <h1>Мої класи</h1>
      </div>

      <div className="main__content">
        {isLoading && <div>Завантаження учителів...</div>}
        {error && <div>Помилка завантаження</div>}
        {!isLoading && Array.isArray(teachers) && teachers.map(t => (
          <div className="card" key={t.id}>
            <h2>{t.name || `${t.surname} ${t.name}`}</h2>
            <p>Телефон: {t.phone || '—'}</p>
            <button>Відкрити</button>
          </div>
        ))}
      </div>
    </main>
  );
}
