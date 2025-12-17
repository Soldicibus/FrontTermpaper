import React from "react";
import { useStudentsByParent } from "../../../hooks/useStudents";

export default function ParentOverview() {
  const parentId = 1; // TODO: get from auth
  const { data: students, isLoading, error } = useStudentsByParent(parentId);

  return (
    <main className="main">
      <div className="main__header">
        <h1>Кабінет батьків</h1>
      </div>

      <div className="card">
        {isLoading && <div>Завантаження дітей...</div>}
        {error && <div>Помилка завантаження</div>}
        {!isLoading && Array.isArray(students) && students.length > 0 ? (
          <div>
            <h2>Діти</h2>
            <ul>
              {students.map((s) => (
                <li key={s.id}>
                  {s.name} {s.surname} — Клас: {s.class_c || "—"}
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div>
            <h2>Дитина: Чуківський Микола</h2>
            <p>Клас: 11-А</p>
            <p>Середній бал: 12</p>
            <p>Відвідуваність: 500%</p>
          </div>
        )}
      </div>
    </main>
  );
}
