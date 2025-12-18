import React, { use, useEffect } from "react";
import { useTeachers } from "../../../hooks/useStudents";

export default function TeacherClasses() {
  const { data: teachers, isLoading, error } = useTeachers();
  useEffect(() => console.log(teachers), [teachers]);

  return (
    <main className="main">
      <div className="main__header">
        <h1>Мої класи</h1>
      </div>

      <div className="main__content">
        {isLoading && <div>Завантаження учителів...</div>}
        {error && <div>Помилка завантаження</div>}
        {!isLoading &&
          Array.isArray(teachers) &&
          teachers.map((t) => (
            <div className="card" key={t.teacher_id}>
              <h2>
                {t.tacher_name || `${t.teacher_surname} ${t.teacher_name}`}
              </h2>
              <p>Телефон: {t.teacher_phone || "—"}</p>
              <button>Відкрити</button>
            </div>
          ))}
      </div>
    </main>
  );
}
