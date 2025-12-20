import React, { useState } from "react";
import "../css/Dashboard.css";
import TeacherClassesPanel from "./TeacherClassesPanel";
import TeacherClassRatingPanel from "./TeacherClassRatingPanel";

export default function TeacherDashboard() {
  // Top-level overlay scope
  const [scope, setScope] = useState("all"); // all | my | rating
  // Inner view for the chosen class context
  const [view, setView] = useState("journal"); // journal | homework | schedule

  const [selectedClassName, setSelectedClassName] = useState(null);
  const [myClasses, setMyClasses] = useState([]);
  const [classesLoaded, setClassesLoaded] = useState(false);

  return (
    <main className="main">
      <div className="main__header">
        <h1>Кабінет учителя</h1>
      </div>

      <div className="tabs">
        <button
          onClick={() => setScope("all")}
          className={scope === "all" ? "active" : ""}
        >
          Усі класи
        </button>
        <button
          onClick={() => setScope("my")}
          className={scope === "my" ? "active" : ""}
          title={myClasses.length ? "" : "Класи ще не завантажено"}
        >
          Мій клас
        </button>
        <button
          onClick={() => {
            setScope("rating");
            setClassesLoaded(false);
          }}
          className={scope === "rating" ? "active" : ""}
        >
          Рейтинг класів
        </button>
      </div>

      <div className="main__content">
        {scope === "rating" ? (
          <TeacherClassRatingPanel />
        ) : (
          <TeacherClassesPanel
            onlyMyClasses={scope === "my"}
            selectedClassName={selectedClassName}
            onSelectClassName={(c) => setSelectedClassName(c)}
            onLoaded={(info) => {
              const list = Array.isArray(info?.myClasses) ? info.myClasses : [];
              setMyClasses(list);
              setClassesLoaded(true);
              if (scope === "my") {
                setSelectedClassName((prev) => prev ?? list[0] ?? null);
              }
            }}
          />
        )}
      </div>

      {scope !== "rating" && classesLoaded && (
        <div className="tabs">
          <button
            onClick={() => setView("journal")}
            className={view === "journal" ? "active" : ""}
          >
            Журнал
          </button>
          <button
            onClick={() => setView("homework")}
            className={view === "homework" ? "active" : ""}
            disabled
            title="Поки що немає сторінки/API для домашніх учителя"
          >
            Домашні
          </button>
          <button
            onClick={() => setView("schedule")}
            className={view === "schedule" ? "active" : ""}
          >
            Розклад
          </button>
        </div>
      )}
    </main>
  );
}
