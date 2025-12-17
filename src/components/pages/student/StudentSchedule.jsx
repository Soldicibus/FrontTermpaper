import React from "react";
import { useTimetables } from "../../../hooks/useStudents";
import { getCurrentUserClass } from "../../../utils/auth";

const times = ['08:30', '09:20', '10:10', '11:00', '11:50', '12:40', '13:30', '14:20'];
const days = ['Понеділок','Вівторок','Середа','Четвер','Пʼятниця'];

export default function StudentSchedule() {
  const { data: timetables, isLoading } = useTimetables();
  const studentClass = getCurrentUserClass();
  // Simple shape mapping from timetables to day/time structure - this depends on backend shape
  const chosen = (Array.isArray(timetables) && timetables.length) ? (
    // try to find timetable for student's class
    (studentClass && timetables.find(t => `${t.classId || t.class_c}` === `${studentClass}`)) || timetables[0]
  ) : null;

  const sample = chosen ? (chosen.entries?.reduce((acc, e) => {
    acc[e.day] = acc[e.day] || [];
    acc[e.day].push({ time: e.time, subject: e.subject });
    return acc;
  }, {})) : {
    'Понеділок': [{ time: '08:30', subject: 'Алгебра'}],
    'Вівторок': [{ time: '09:20', subject: 'Фізика'}],
    'Середа': [{ time: '10:10', subject: 'Українська мова'}],
    'Четвер': [{ time: '11:00', subject: 'Географія'}],
    'Пʼятниця': [{ time: '12:40', subject: 'Історія'}],
  };

  return (
    <div className="card schedule-card">
      {isLoading && <div>Завантаження розкладу...</div>}
      <div className="week-grid">
        <div className="week-header">
          <div className="time-col"></div>
          {days.map(d => <div key={d} className="day-col">{d}</div>)}
        </div>

        <div className="week-body">
          {times.map(t => (
            <div key={t} className="row">
              <div className="time-col">{t}</div>
              {days.map(d => (
                <div key={d} className="cell">
                  { (sample[d]||[]).find(e => e.time === t) ? (
                    <div className="lesson">
                      <div className="lesson-subject">{(sample[d].find(e => e.time===t)||{}).subject}</div>
                    </div>
                  ) : null }
                </div>
              ))}
            </div>
          ))}
        </div>
        {!isLoading && !chosen && <div className="empty-state">Немає розкладу для вашого класу</div>}
      </div>
    </div>
  );
}
