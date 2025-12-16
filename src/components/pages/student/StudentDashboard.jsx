import React, { useState } from "react";
import "../css/Dashboard.css";
import StudentJournal from "./StudentJournal";
import StudentHomework from "./StudentHomework";
import StudentSchedule from "./StudentSchedule";
import StudentMaterials from "./StudentMaterials";

export default function StudentDashboard() {
  const [tab, setTab] = useState("journal");

  return (
    <main className="main">
      <div className="main__header">
        <h1>Кабінет учня</h1>
      </div>

      <div className="tabs">
        <button onClick={() => setTab("journal")} className={tab === "journal" ? "active" : ""}>
          Журнал
        </button>
        <button onClick={() => setTab("homework")} className={tab === "homework" ? "active" : ""}>
          Домашні
        </button>
        <button onClick={() => setTab("schedule")} className={tab === "schedule" ? "active" : ""}>
          Розклад
        </button>
        <button onClick={() => setTab("materials")} className={tab === "materials" ? "active" : ""}>
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
