import React, { useMemo, useState } from "react";
import { useClass } from "../../../hooks/classes/queries/useClass";
import { useParams } from "react-router-dom";
import { useCreateStudentData } from "../../../hooks/studentdata/mutations/useCreateStudentData";

export default function TeacherClassView() {
  const { id } = useParams();
  const { data: myClass, isLoading } = useClass(id);

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
    myClass?.name ||
    myClass?.class_name ||
    myClass?.class ||
    (id ? `Клас #${id}` : "Клас");

  const students = useMemo(() => {
    const raw = myClass?.students ?? myClass?.student ?? myClass?.rows ?? null;
    if (!raw) return [];
    if (Array.isArray(raw)) return raw;
    return [];
  }, [myClass]);

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
      <h1>{classTitle}</h1>

      {isLoading && <div>Завантаження...</div>}

      <section className="card">
        <h2>Учні</h2>
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
                onChange={(e) =>
                  setForm((p) => ({ ...p, note: e.target.value }))
                }
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

      <section className="card">
        <h2>Дії</h2>
        <button>Журнал</button>
        <button>Уроки</button>
        <button>Розклад</button>
      </section>
    </main>
  );
}
