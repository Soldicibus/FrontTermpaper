import React, { useState } from "react";
import { useHomework } from "../../../hooks/useStudents";
import { getCurrentStudentId, getCurrentUserClass } from "../../../utils/auth";

export default function StudentHomework({ studentId: propStudentId, studentClass: propStudentClass }) {
  const [openId, setOpenId] = useState(null);
  const { data: homework, isLoading } = useHomework();
  const studentId = propStudentId || getCurrentStudentId();
  const studentClass = propStudentClass || getCurrentUserClass();
  let list = Array.isArray(homework) && homework.length ? homework : [];

  // Filter homework relevant for current student (by studentId or by class)
  if (studentId) {
    list = list.filter(
      (h) =>
        (h.studentId && h.studentId === studentId) ||
        (h.classId && `${h.classId}` === `${studentClass}`) ||
        (h.class_c && h.class_c === studentClass)
    );
  }

  if (!list.length && !isLoading) {
    // keep previous placeholder behavior: empty state
  }

  return (
    <div className="homework-grid">
      {list.map((h) => (
        <article
          key={h.id}
          className={`homework-card ${openId === h.id ? "open" : ""}`}
          onClick={() =>
            setOpenId(openId === h.id ? null : h.id)
          }
        >
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

      {sample.length === 0 && (
        <div className="empty-state">Немає домашніх завдань</div>
      )}
    </div>
  );
}
