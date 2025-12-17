import React, { useState } from "react";
import "../css/Dashboard.css";
import StudentJournal from "./StudentJournal";
import StudentHomework from "./StudentHomework";
import StudentSchedule from "./StudentSchedule";
import StudentMaterials from "./StudentMaterials";
import { useStudents, useStudent } from "../../../hooks/useStudents";
import { getCurrentStudentId } from "../../../utils/auth";

export default function StudentDashboard() {
  const [tab, setTab] = useState("journal");
  const { data: students, isLoading } = useStudents();
  const studentId = getCurrentStudentId();
  const { data: currentStudent, isLoading: studentLoading } = useStudent(studentId);

  return (
    <main className="main">
      <div className="main__header">
        <h1>Кабінет учня</h1>
      </div>

      <div className="main__content">
        <div className="card small">
          {isLoading ? (
            <div>Завантаження інформації учнів...</div>
          ) : (
            <div>Загалом учнів у системі: {students?.length ?? 0}</div>
          )}
        </div>

        <div className="card">
          {studentLoading ? (
            <div>Завантаження профілю учня...</div>
          ) : currentStudent ? (
            <div>
              <h2>{currentStudent.name} {currentStudent.surname}</h2>
              <p>Клас: {currentStudent.class_c || currentStudent.class || '—'}</p>
              <p>Телефон: {currentStudent.phone || '—'}</p>
              <p>Пошта: {currentStudent.email || '—'}</p>
            </div>
          ) : (
            <div>Немає профілю учня (увійдіть або зв'яжіться з адміністратором)</div>
          )}
        </div>
      </div>

      <div className="tabs">
        <button
          onClick={() => setTab("journal")}
          className={tab === "journal" ? "active" : ""}
        >
          Журнал
        </button>
        <button
          onClick={() => setTab("homework")}
          className={tab === "homework" ? "active" : ""}
        >
          Домашні
        </button>
        <button
          onClick={() => setTab("schedule")}
          className={tab === "schedule" ? "active" : ""}
        >
          Розклад
        </button>
        <button
          onClick={() => setTab("materials")}
          className={tab === "materials" ? "active" : ""}
        >
          Матеріали
        </button>
      </div>

      <div className="tab-content">
        {tab === "journal" && <StudentJournal />}
        {tab === "homework" && <StudentHomework />}
        {tab === "schedule" && <StudentSchedule />}
        {tab === "materials" && <StudentMaterials />}
      </div>
    </main>
  );
}
