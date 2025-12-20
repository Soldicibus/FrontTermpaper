import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { decodeToken } from "../../../utils/jwt";
import { useUserData } from "../../../hooks/users";
import { useTeachersWithClasses } from "../../../hooks/teachers/queries/useTeachersWithClasses";

export default function TeacherClasses() {
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
    user?.teacher_id || user?.teacherId || payload?.teacherId || null;

  const grouped = useMemo(() => {
    // group rows from vw_teachers_with_classes into: teacher -> [class_name]
    const map = new Map();
    for (const row of teachersWithClasses) {
      const teacher_id = row.teacher_id ?? row.id;
      if (!teacher_id) continue;
      const teacher_name =
        row.teacher_name || row.name || row.teacher || row.teacher_fullname;
      const teacher_surname = row.teacher_surname || row.surname;
      const teacher_patronym = row.teacher_patronym || row.patronym;
      const class_name = row.class_name || row.name_class || row.class;

      if (!map.has(teacher_id)) {
        map.set(teacher_id, {
          teacher_id,
          teacher_name,
          teacher_surname,
          teacher_patronym,
          classes: [],
        });
      }
      const entry = map.get(teacher_id);
      if (class_name && !entry.classes.includes(class_name)) {
        entry.classes.push(class_name);
      }
    }
    const arr = Array.from(map.values());

    // Sort: my teacher first (if known), then by surname/name.
    arr.sort((a, b) => {
      if (myTeacherId) {
        const aMine = String(a.teacher_id) === String(myTeacherId);
        const bMine = String(b.teacher_id) === String(myTeacherId);
        if (aMine !== bMine) return aMine ? -1 : 1;
      }
      const aKey = `${a.teacher_surname || ""} ${a.teacher_name || ""}`
        .trim()
        .toLowerCase();
      const bKey = `${b.teacher_surname || ""} ${b.teacher_name || ""}`
        .trim()
        .toLowerCase();
      return aKey.localeCompare(bKey, "uk");
    });
    // Also sort classes inside each teacher.
    for (const t of arr) {
      t.classes.sort((x, y) => String(x).localeCompare(String(y), "uk"));
    }
    return arr;
  }, [teachersWithClasses, myTeacherId]);

  const myEntry = useMemo(() => {
    if (!myTeacherId) return null;
    return grouped.find((t) => String(t.teacher_id) === String(myTeacherId));
  }, [grouped, myTeacherId]);

  // We don't have a reliable "class_id" from the view, but navigation expects :id.
  // For now we allow opening only if a numeric ID is present in the row.
  const openClass = (classIdOrName) => {
    // If caller gives us an id-like value, navigate; otherwise keep UI stable.
    const idNum = Number(classIdOrName);
    if (Number.isFinite(idNum) && idNum > 0) {
      navigate(`/teacher/class/${idNum}`);
      return;
    }
    alert(
      `Немає ID класу для переходу. Потрібно додати class_id у vw_teachers_with_classes (або окремий endpoint).` ,
    );
  };

  return (
    <main className="main">
      <div className="main__header">
        <h1>Мої класи</h1>
      </div>

      <div className="main__content">
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
            {myTeacherId && myEntry ? (
              <section className="card">
                <h2>
                  {myEntry.teacher_surname
                    ? `${myEntry.teacher_surname} ${myEntry.teacher_name || ""}`
                    : myEntry.teacher_name || "Мої класи"}
                </h2>

                {myEntry.classes.length === 0 ? (
                  <p>Для вас не знайдено класів.</p>
                ) : (
                  <ul>
                    {myEntry.classes.map((c) => (
                      <li key={c}>
                        <button onClick={() => openClass(c)}>{c}</button>
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            ) : (
              <section className="card">
                <h2>Мої класи</h2>
                <p>
                  Не вдалося визначити ваш teacher_id (немає в профілі/токені).
                  Нижче — список усіх учителів з класами.
                </p>
              </section>
            )}

            <section className="card">
              <h2>Учителі та їх класи</h2>
              {grouped.length === 0 ? (
                <p>Немає даних.</p>
              ) : (
                grouped.map((t) => {
                  const title = t.teacher_surname
                    ? `${t.teacher_surname} ${t.teacher_name || ""}`
                    : t.teacher_name || `Teacher #${t.teacher_id}`;

                  return (
                    <div key={t.teacher_id} style={{ marginBottom: 16 }}>
                      <h3>
                        {title}
                        {myTeacherId &&
                        String(t.teacher_id) === String(myTeacherId)
                          ? " (ви)"
                          : ""}
                      </h3>
                      {t.classes.length ? (
                        <ul>
                          {t.classes.map((c) => (
                            <li key={c}>{c}</li>
                          ))}
                        </ul>
                      ) : (
                        <p>—</p>
                      )}
                    </div>
                  );
                })
              )}
            </section>
          </>
        )}
      </div>
    </main>
  );
}
