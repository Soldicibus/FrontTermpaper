import React, { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useCreateStudentData } from "../../../hooks/studentdata/mutations/useCreateStudentData";
import { useTeacherWithClassesName } from "../../../hooks/teachers/queries/useTeacherWithClassesName";

export default function TeacherClassView({ className: classNameProp, onBack }) {
  // Route param may be `id` or `class_name` depending on how routes were set up.
  // We accept both, then decode so values like "1-%D0%90" become "1-А".
  const params = useParams();
  const rawFromRoute = params.class_name ?? params.className ?? params.id ?? "";
  const rawClassName = classNameProp ?? rawFromRoute;

  const className = useMemo(() => {
    if (!rawClassName) return "";
    try {
      return decodeURIComponent(rawClassName);
    } catch {
      // If it's already decoded or malformed, fall back to raw.
      return String(rawClassName);
    }
  }, [rawClassName]);

  // Teacher-specific view: returns rows like
  // { class_mainTeacher, class_name, student_name, student_surname, ... }
  const {
    data: classStudentsRes,
    isLoading: isStudentsLoading,
    error: studentsErr,
  } = useTeacherWithClassesName(className);

  const [tab, setTab] = useState("journal"); // journal | homework | schedule

  const createStudentData = useCreateStudentData();

  const [form, setForm] = useState({
    journalId: "",
    studentId: "",
    lesson: "",
    mark: "",
    status: "present",
    note: "",
  });

  const classTitle =
    classStudentsRes?.class_name ||
    classStudentsRes?.name ||
    classStudentsRes?.class ||
    (className ? `Клас ${className}` : "Клас");

  let students = [];
  // Need to create a stable array from student_name and student_surname fields from classStudentsRes
  students = useMemo(() => {
    // First try the direct shape
    const rawTeacher = classStudentsRes?.students ?? classStudentsRes?.student ?? null;
    if (Array.isArray(rawTeacher) && rawTeacher.length) return rawTeacher;
  }, [classStudentsRes]);

  const onSubmit = async (e) => {
    e.preventDefault();

    // Keep the mutation signature as-is: (journalId, studentId, lesson, mark, status, note)
    await createStudentData.mutateAsync([
      form.journalId || null,
      form.studentId || null,
      form.lesson || null,
      form.mark || null,
      form.status || null,
      form.note || null,
    ]);
  };
  return (
    <main className="main">
      <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
        <h1 style={{ margin: 0 }}>{classTitle}</h1>
      </div>

      {isStudentsLoading && <div>Завантаження...</div>}

      {!isStudentsLoading && (
        <div className="tabs" style={{ marginTop: 8 }}>
          <button
            onClick={() => setTab("journal")}
            className={tab === "journal" ? "active" : ""}
          >
            Журнал
          </button>
          <button
            onClick={() => setTab("homework")}
            className={tab === "homework" ? "active" : ""}
            disabled
            title="Поки що немає сторінки/API для домашніх учителя"
          >
            Домашні
          </button>
          <button
            onClick={() => setTab("schedule")}
            className={tab === "schedule" ? "active" : ""}
          >
            Розклад
          </button>
        </div>
      )}

      {tab === "journal" && (
        <>
          <section className="card">
            <h2>Учні</h2>

            {isStudentsLoading && <div>Завантаження списку учнів...</div>}
            {studentsErr && (
              <div style={{ color: "crimson" }}>
                Помилка завантаження учнів
                {studentsErr?.message ? `: ${studentsErr.message}` : ""}
              </div>
            )}
            <ul>
              {students.length ? (
                students.map((s, idx) => {
                  const key = s.id ?? s.student_id ?? idx;
                  const name =
                    s.student_name || s.name || s.username || s.first_name || "";
                  const surname =
                    s.student_surname || s.surname || s.last_name || "";
                  return (
                    <li key={key}>
                      {surname} {name}
                    </li>
                  );
                })
              ) : (
                <li>Немає даних про учнів у відповіді класу.</li>
              )}
            </ul>
          </section>

          <section className="card">
            <h2>Додати запис в журнал (studentData)</h2>
            <form onSubmit={onSubmit}>
              <div style={{ display: "grid", gap: 8 }}>
                <label>
                  journalId
                  <input
                    value={form.journalId}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, journalId: e.target.value }))
                    }
                    placeholder="(опц.)"
                  />
                </label>
                <label>
                  studentId
                  <input
                    value={form.studentId}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, studentId: e.target.value }))
                    }
                    placeholder="ID учня"
                    required
                  />
                </label>
                <label>
                  lesson
                  <input
                    value={form.lesson}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, lesson: e.target.value }))
                    }
                    placeholder="Тема/назва уроку"
                  />
                </label>
                <label>
                  mark
                  <input
                    value={form.mark}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, mark: e.target.value }))
                    }
                    placeholder="Оцінка"
                  />
                </label>
                <label>
                  status
                  <select
                    value={form.status}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, status: e.target.value }))
                    }
                  >
                    <option value="present">present</option>
                    <option value="absent">absent</option>
                    <option value="late">late</option>
                  </select>
                </label>
                <label>
                  note
                  <input
                    value={form.note}
                    onChange={(e) => setForm((p) => ({ ...p, note: e.target.value }))}
                    placeholder="Нотатка"
                  />
                </label>
              </div>
              <div style={{ marginTop: 12, display: "flex", gap: 8 }}>
                <button type="submit" disabled={createStudentData.isPending}>
                  {createStudentData.isPending ? "Збереження..." : "Додати"}
                </button>
                {createStudentData.isError && (
                  <span style={{ color: "crimson" }}>
                    Помилка: {createStudentData.error?.message || "—"}
                  </span>
                )}
                {createStudentData.isSuccess && (
                  <span style={{ color: "green" }}>OK</span>
                )}
              </div>
            </form>
            <p style={{ marginTop: 8, opacity: 0.8 }}>
              Поки що це мінімальна форма для перевірки, що створення studentData
              працює. Далі можна замінити на повноцінний «журнал» по уроках.
            </p>
          </section>
        </>
      )}

      {tab === "schedule" && (
        <section className="card">
          <h2>Розклад</h2>
          <p style={{ opacity: 0.85 }}>
            Тут буде розклад класу. Зараз немає teacher-schedule endpoint.
          </p>
        </section>
      )}

      {tab === "homework" && (
        <section className="card">
          <h2>Домашні</h2>
          <p style={{ opacity: 0.85 }}>Скоро…</p>
        </section>
      )}
    </main>
  );
}
