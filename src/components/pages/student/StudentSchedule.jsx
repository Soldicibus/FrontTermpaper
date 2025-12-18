import React from "react";
import { useTimetableByStudent, useWeeklyTimetableById, useUserData } from "../../../hooks/useStudents";
import { getCurrentStudentId, getCurrentUser } from "../../../utils/auth";

const times = ['08:30', '09:20', '10:10', '11:00', '11:50', '12:40', '13:30', '14:20'];
const days = ['Понеділок','Вівторок','Середа','Четвер','Пʼятниця'];

export default function StudentSchedule({ studentClass: propStudentClass }) {
  // Prefer timetable by student id. If token doesn't include studentId, fetch user data and use its entity_id/student_id.
  const tokenStudentId = getCurrentStudentId();
  const currentUser = getCurrentUser();
  const userId = currentUser?.userId || currentUser?.id || currentUser?.sub || null;
  const { data: userData, isLoading: userDataLoading } = useUserData(userId, { enabled: !!userId });

  // Resolve studentId from token first, otherwise from userData.entity_id or userData.student_id
  let resolvedStudentId = tokenStudentId || null;
  if (!resolvedStudentId && userData) {
    resolvedStudentId = userData?.student_id || userData?.studentId || userData?.entity_id || userData?.entityId || null;
  }

  const { data: timetables, isLoading: timetablesLoading } = useTimetableByStudent(resolvedStudentId, { enabled: !!resolvedStudentId });

  // Extract timetable id defensively from returned shape
  function extractIdFromObj(o) {
    if (!o || typeof o !== 'object') return null;
    if (o.timetable_id || o.id || o.timetableId) return o.timetable_id || o.id || o.timetableId;
    // common DB function key
    if (o.get_timetable_id_by_student_id) return o.get_timetable_id_by_student_id;
    // fallback: find first numeric value in object
    for (const k of Object.keys(o)) {
      const v = o[k];
      if (typeof v === 'number' && Number.isInteger(v)) return v;
      if (typeof v === 'string' && /^[0-9]+$/.test(v)) return parseInt(v, 10);
    }
    return null;
  }

  let timetableId = null;
  if (Array.isArray(timetables) && timetables.length > 0) {
    timetableId = extractIdFromObj(timetables[0]);
  } else if (timetables && Array.isArray(timetables.timetable) && timetables.timetable.length > 0) {
    timetableId = extractIdFromObj(timetables.timetable[0]);
  } else if (timetables && typeof timetables === 'object') {
    timetableId = extractIdFromObj(timetables);
  }

  console.log('student schedule: resolvedStudentId, timetables response', { userId, tokenStudentId, resolvedStudentId, userData, timetables, timetableId });

  const { data: weekRows, isLoading: weekLoading } = useWeeklyTimetableById(timetableId, { enabled: !!timetableId });
  const loading = timetablesLoading || weekLoading;

  function normalizeDayName(s) {
    if (!s) return s;
    // Normalize various apostrophe variants to a single ASCII apostrophe, trim
    return s.replace(/[\u2018\u2019\u02BC\u02BD]/g, "'").trim();
  }

  // Build sample mapping from rows
  let sample = {};
  let timesFromData = [];
  if (Array.isArray(weekRows) && weekRows.length > 0) {
    weekRows.forEach(r => {
      const day = normalizeDayName(r.weekday || r.weekday_name || r.day || r.week);
      const t = (r.lesson_time || r.lesson_time || r.lesson || r.time || '').toString().slice(0,5);
      sample[day] = sample[day] || [];
      sample[day].push({ time: t, subject: r.subject });
      if (t && !timesFromData.includes(t)) timesFromData.push(t);
    });
    // sort times
    timesFromData.sort();
  }

  const timesList = timesFromData.length ? timesFromData : times;

  return (
    <div className="card schedule-card">
      {loading && <div>Завантаження розкладу...</div>}
      <div className="week-grid">
        <div className="week-header">
          <div className="time-col"></div>
          {days.map(d => <div key={d} className="day-col">{d}</div>)}
        </div>

        <div className="week-body">
          {timesList.map(t => (
            <div key={t} className="row">
              <div className="time-col">{t}</div>
              {days.map(d => {
                const dayKey = normalizeDayName(d);
                const found = (sample?.[dayKey] || []).find(e => e.time === t);
                return (
                  <div key={d} className="cell">
                    {found ? (
                      <div className="lesson">
                        <div className="lesson-subject">{found.subject}</div>
                      </div>
                    ) : null}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
        {!weekLoading && !(Array.isArray(weekRows) && weekRows.length > 0) && <div className="empty-state">Немає розкладу для вашого розкладу</div>}
      </div>
    </div>
  );
}
