import React, { useMemo, useState } from "react";
import "../css/Dashboard.css";
import TeacherClassesPanel from "./TeacherClassesPanel";
import TeacherClassRatingPanel from "./TeacherClassRatingPanel";
import TeacherClassView from "./TeacherClassView";
import { decodeToken } from "../../../utils/jwt";
import { useUserData } from "../../../hooks/users";
import { useTeachersWithClasses } from "../../../hooks/teachers/queries/useTeachersWithClasses";

export default function TeacherDashboard() {
  // Top-level overlay scope
  const [scope, setScope] = useState("all"); // all | my | rating | class
  const [prevClassesScope, setPrevClassesScope] = useState("all"); // remember where we came from
  const [selectedClassName, setSelectedClassName] = useState(null);
  const [myClasses, setMyClasses] = useState([]);
  const [classesLoaded, setClassesLoaded] = useState(false);

  // We derive the teacherId/entityId here as well so "Мій клас" can auto-open
  // even before TeacherClassesPanel finishes loading.
  const token = localStorage.getItem("accessToken");
  const payload = token ? decodeToken(token) : null;
  const userId = payload?.userId || payload?.id || payload?.user_id || null;
  const { data: userRes } = useUserData(userId);
  const user = userRes?.userData ?? userRes?.user ?? userRes ?? null;
  const entityId = user?.entity_id ?? user?.entityId ?? userRes?.entity_id ?? null;

  const myTeacherId =
    user?.teacher_id || user?.teacherId || payload?.teacherId || entityId || null;

  const { data: twcRes } = useTeachersWithClasses(myTeacherId);
  const myFirstClassName = useMemo(() => {
    const data = twcRes;
    const rows = Array.isArray(data) ? data : data?.teachers ?? data?.rows ?? [];
    if (!Array.isArray(rows) || !rows.length) return null;
    const firstRow = rows[0];
    return firstRow?.class_name || firstRow?.name_class || firstRow?.class || null;
  }, [twcRes]);

  return (
    <main className="main">
      <div className="main__header">
        <h1>Кабінет учителя</h1>
      </div>

      <div className="tabs">
        <button
          onClick={() => {
            setPrevClassesScope("all");
            setScope("all");
          }}
          className={scope === "all" ? "active" : ""}
        >
          Усі класи
        </button>
        <button
          onClick={() => {
            setPrevClassesScope("my");

            // Prefer backend-derived class name (teacher/with-classes/:id)
            // so it matches the teacher's actual class list.
            const first = myFirstClassName ?? myClasses?.[0] ?? null;

            // If known, auto-open TeacherClassView.
            // If not known yet, show the panel — onLoaded will still auto-open.
            if (first) {
              setSelectedClassName((prev) => prev ?? first);
              setScope("class");
              return;
            }
            setScope("my");
          }}
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
        ) : scope === "class" ? (
          <TeacherClassView
            className={selectedClassName}
            onBack={() => setScope(prevClassesScope || "all")}
          />
        ) : (
          <TeacherClassesPanel
            onlyMyClasses={scope === "my"}
            selectedClassName={selectedClassName}
            onSelectClassName={(c) => {
              setSelectedClassName(c);
              setPrevClassesScope(scope);
              setScope("class");
            }}
            onLoaded={(info) => {
              const list = Array.isArray(info?.myClasses) ? info.myClasses : [];
              setMyClasses(list);
              setClassesLoaded(true);
              if (scope === "my") {
                setSelectedClassName((prev) => prev ?? list[0] ?? null);

                if (list[0]) {
                  setPrevClassesScope("my");
                  setScope("class");
                }
              }
            }}
          />
        )}
      </div>
    </main>
  );
}
