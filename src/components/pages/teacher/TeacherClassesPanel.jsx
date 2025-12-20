import React, { useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { decodeToken } from "../../../utils/jwt";
import { useUserData } from "../../../hooks/users";
import { useTeachersWithClasses } from "../../../hooks/teachers/queries/useTeachersWithClasses";

/**
 * A dashboard-friendly (no <main>) panel version of TeacherClasses.
 * Shows "my classes" for the current teacher (based on user profile entity_id/teacher_id).
 */
/**
 * @param {object} props
 * @param {boolean} [props.onlyMyClasses] If true, only show classes for current teacher.
 * @param {string|null} [props.selectedClassName] Currently selected class name.
 * @param {(className:string)=>void} [props.onSelectClassName] Callback when a class name is selected.
 * @param {(info:{teacherId:any, entityId:any, myClasses:string[], allRows:any[]})=>void} [props.onLoaded] Called when data is ready.
 */
export default function TeacherClassesPanel({
  onlyMyClasses = false,
  selectedClassName = null,
  onSelectClassName,
  onLoaded,
}) {
  const navigate = useNavigate();

  const token = localStorage.getItem("accessToken");
  const payload = token ? decodeToken(token) : null;
  const userId = payload?.userId || payload?.id || payload?.user_id || null;

  const {
    data: userRes,
    isLoading: isUserLoading,
    error: userErr,
  } = useUserData(userId);
  const user = userRes?.userData ?? userRes?.user ?? userRes ?? null;

  const entityId = user?.entity_id ?? user?.entityId ?? userRes?.entity_id ?? null;

  const {
    data: teachersWithClassesRes,
    isLoading: isTwcLoading,
    error: twcErr,
  } = useTeachersWithClasses(entityId);

  const teachersWithClasses = useMemo(() => {
    const data = teachersWithClassesRes;
    if (!data) return [];
    if (Array.isArray(data)) return data;
    return data.teachers ?? [];
  }, [teachersWithClassesRes]);

  const myTeacherId =
    user?.teacher_id || user?.teacherId || payload?.teacherId || entityId || null;

  const myClasses = useMemo(() => {
    if (!myTeacherId) return [];
    const set = new Set();
    for (const row of teachersWithClasses) {
      const rowTeacherId = row.teacher_id ?? row.id;
      if (!rowTeacherId) continue;
      if (String(rowTeacherId) !== String(myTeacherId)) continue;
      const className = row.class_name || row.name_class || row.class;
      if (className) set.add(className);
    }
    return Array.from(set).sort((a, b) => String(a).localeCompare(String(b), "uk"));
  }, [teachersWithClasses, myTeacherId]);

  useEffect(() => {
    if (isUserLoading || isTwcLoading || userErr || twcErr) return;
    if (typeof onLoaded !== "function") return;
    onLoaded({
      teacherId: myTeacherId,
      entityId,
      myClasses,
      allRows: teachersWithClasses,
    });
  }, [
    isUserLoading,
    isTwcLoading,
    userErr,
    twcErr,
    onLoaded,
    myTeacherId,
    entityId,
    myClasses,
    teachersWithClasses,
  ]);

  const allClasses = useMemo(() => {
    const set = new Set();
    for (const row of teachersWithClasses) {
      const className = row.class_name || row.name_class || row.class;
      if (className) set.add(className);
    }
    return Array.from(set).sort((a, b) => String(a).localeCompare(String(b), "uk"));
  }, [teachersWithClasses]);

  const visibleClasses = onlyMyClasses ? myClasses : allClasses;

  return (
    <section className="card">
      <h2>{onlyMyClasses ? "Мій клас / Мої класи" : "Усі класи"}</h2>

      {(isUserLoading || isTwcLoading) && <div>Завантаження...</div>}
      {(userErr || twcErr) && (
        <div>
          Помилка завантаження
          {userErr?.message ? `: ${userErr.message}` : ""}
          {twcErr?.message ? `: ${twcErr.message}` : ""}
        </div>
      )}

      {!isUserLoading && !isTwcLoading && !userErr && !twcErr && (
        <>
          {onlyMyClasses && !myTeacherId ? (
            <p style={{ opacity: 0.85 }}>
              Не вдалося визначити teacher id. Перевірте, що `/users/:id/data`
              повертає `entity_id` для ролі Teacher.
            </p>
          ) : visibleClasses.length === 0 ? (
            <p>{onlyMyClasses ? "Для вас не знайдено класів." : "Класи не знайдено."}</p>
          ) : (
            <ul>
              {visibleClasses.map((c) => (
                <li key={c}>
                  <button
                    onClick={() =>
                      typeof onSelectClassName === "function"
                        ? onSelectClassName(c)
                        : navigate("/teacher/classes")
                    }
                    className={
                      selectedClassName && String(selectedClassName) === String(c)
                        ? "active"
                        : ""
                    }
                  >
                    {c}
                  </button>
                </li>
              ))}
            </ul>
          )}

          <div style={{ marginTop: 12 }}>
            <button onClick={() => navigate("/teacher/classes")}>
              Відкрити сторінку «Мої класи»
            </button>
          </div>
        </>
      )}
    </section>
  );
}
