import React, { useMemo } from "react";
import { vw_class_ranking } from "../../../data/mockViews";

/**
 * Minimal Class Rating panel.
 * - Backend endpoint isn't present yet in this repo, so we show mock view data.
 * - When API is added (e.g. GET /classes/ranking), swap the data source to a react-query hook.
 */
export default function TeacherClassRatingPanel() {
  const rows = useMemo(() => {
    // fallback to mock view data
    return Array.isArray(vw_class_ranking) ? vw_class_ranking : [];
  }, []);

  return (
    <section className="card">
      <h2>Рейтинг класів</h2>

      {rows.length === 0 ? (
        <p>Немає даних.</p>
      ) : (
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th style={{ textAlign: "left", padding: "6px 8px" }}>Клас</th>
                <th style={{ textAlign: "left", padding: "6px 8px" }}>Учнів</th>
                <th style={{ textAlign: "left", padding: "6px 8px" }}>
                  Середня оцінка
                </th>
                <th style={{ textAlign: "left", padding: "6px 8px" }}>Місце</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r, idx) => (
                <tr key={r.student_class || idx}>
                  <td style={{ padding: "6px 8px" }}>{r.student_class}</td>
                  <td style={{ padding: "6px 8px" }}>{r.students_count}</td>
                  <td style={{ padding: "6px 8px" }}>{r.avg_mark}</td>
                  <td style={{ padding: "6px 8px" }}>{r.rank_position}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <p style={{ marginTop: 10, opacity: 0.75 }}>
        Примітка: зараз використовується демо-дані з `mockViews.js`.
      </p>
    </section>
  );
}
