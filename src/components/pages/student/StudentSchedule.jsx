import React from "react";

const times = ['08:30', '09:20', '10:10', '11:00', '11:50', '12:40'];
const days = ['Понеділок','Вівторок','Середа','Четвер','Пʼятниця'];

const sample = {
  'Понеділок': [{ time: '08:30', subject: 'Алгебра', room: '307' }],
  'Вівторок': [{ time: '09:20', subject: 'Фізика', room: '210' }],
};

export default function StudentSchedule() {
  return (
    <div className="card schedule-card">
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
                      <div className="lesson-room">{(sample[d].find(e => e.time===t)||{}).room}</div>
                    </div>
                  ) : null }
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
