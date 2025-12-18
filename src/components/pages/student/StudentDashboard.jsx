import React, { useState } from "react";
import "../css/Dashboard.css";
import StudentJournal from "./StudentJournal";
import StudentHomework from "./StudentHomework";
import StudentSchedule from "./StudentSchedule";
import StudentMaterials from "./StudentMaterials";
import StudentGradesAndAbsences from "./StudentGradesAndAbsences";
import StudentRanking from "./StudentRanking";
import { useStudents, useStudent, useUserData, useClass, useUserRoles } from "../../../hooks/useStudents";
import { decodeToken } from "../../../utils/jwt";

export default function StudentDashboard() {
  const [tab, setTab] = useState("journal");
  const { data: students, isLoading } = useStudents();

  // Derive user id from token and fetch user profile to obtain linked student id
  const token = localStorage.getItem('accessToken');
  const payload = token ? decodeToken(token) : null;
  const userId = payload?.userId || payload?.id || payload?.sub || null;
  const { data: userData, isLoading: userLoading } = useUserData(userId);
  const { data: userRoles, isLoading: rolesLoading } = useUserRoles(userId, { enabled: !!userId });

  // Check if user has student role
  const rolesArr = Array.isArray(userRoles) ? userRoles : (userRoles?.roles ? userRoles.roles : (userRoles?.role ? [userRoles.role] : []));
  const normalizedRoles = rolesArr.map(r => (typeof r === 'string' ? r : (r.role_name || r.name || r)).toString().toLowerCase());
  const hasStudentRole = normalizedRoles.includes('student');

  // support new `entity_id` returned by /users/:id/data (mapped to student/teacher/parent)
  const entityId = userData?.entity_id || userData?.entityId || null;
  // userData may contain a student_id or studentId field; use that, otherwise if user is a student use entityId
  const linkedStudentId = userData?.student_id || userData?.studentId || userData?.student || (hasStudentRole ? entityId : null);

  // normalize display fields from userData - DB function may return various column names
  function pickName(u) {
    if (!u) return { name: null, surname: null, email: null, phone: null };
    // Prefer student-specific fields when available
    const name = u.student_name || u.name || u.first_name || u.firstname || u.given_name || u.entity_name || u.username || null;
    const surname = u.student_surname || u.surname || u.last_name || u.lastname || u.family_name || null;
    const patronym = u.student_patronym || u.patronym || u.middle_name || null;
    const email = u.student_email || u.email || u.user_email || u.contact_email || null;
    const phone = u.student_phone || u.phone || u.mobile || u.telephone || u.contact_phone || null;
    return { name, surname, email, phone };
  }
  const { name: userName, surname: userSurname, email: userEmail, phone: userPhone } = pickName(userData);
  const userPatronym = userData?.student_patronym || userData?.patronym || userData?.middle_name || null;

  // also ensure we can read class from student_class
  const studentClassFromUser = userData?.student_class || userData?.studentClass || null;

  // Do not attempt automatic contact-based lookup; rely on an explicit linked student id
  const effectiveStudentId = linkedStudentId || null;
  const { data: currentStudent, isLoading: studentLoading } = useStudent(effectiveStudentId);
  // Determine class id or name from student record
  const rawClass = currentStudent?.class_id || currentStudent?.student_class || userData?.classId || userData?.class || userData?.class_name || null;
  // If rawClass looks like an integer id, fetch class details
  const numericClassId = rawClass && !Number.isNaN(Number(rawClass)) ? Number(rawClass) : null;
  const { data: classData, isLoading: classLoading } = useClass(numericClassId);
  const className = classLoading ? null : (classData?.class_name || classData?.name || rawClass || null);

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
          {userLoading ? (
            <div>Завантаження профілю користувача...</div>
          ) : !linkedStudentId && !hasStudentRole ? (
            <div>
              <p>Ваш обліковий запис не пов'язаний з профілем учня. Зверніться до адміністратора.</p>
              <details style={{ marginTop: 8 }}>
                <summary>Діагностика (натисніть)</summary>
                <div style={{ fontSize: 12, marginTop: 8 }}>
                  <div><strong>userId from token:</strong> {String(userId)}</div>
                  <div><strong>userData:</strong></div>
                  <pre style={{ whiteSpace: 'pre-wrap' }}>{JSON.stringify(userData, null, 2)}</pre>
                  <div><strong>userRoles:</strong></div>
                  <pre style={{ whiteSpace: 'pre-wrap' }}>{JSON.stringify(userRoles, null, 2)}</pre>
                </div>
              </details>
            </div>
          ) : !linkedStudentId && hasStudentRole ? (
             // show profile from userData even if not linked, and indicate automatic lookup status
             <div>
              <h2>{userName || userData?.name || '—'} {userPatronym ? `${userPatronym}` : ''} {userSurname || userData?.surname || ''}</h2>
              <p>Клас: {classLoading ? 'Завантаження...' : (classData?.class_name || classData?.name || studentClassFromUser || rawClass || '—')}</p>
               {entityId && <div style={{ marginTop: 6, fontSize: 13, color: '#666' }}>Знайдено entity_id: {entityId} — використовується для зв'язування з профілем учня.</div>}
              <p>Телефон: {userPhone || '—'}</p>
              <p>Пошта: {userEmail || '—'}</p>
             </div>
           ) : studentLoading ? (
             <div>Завантаження профілю учня...</div>
           ) : currentStudent ? (
             <div>
              <h2>{currentStudent.name || userName || currentStudent.student_name} {currentStudent.patronym || userPatronym || currentStudent.student_patronym || ''} {currentStudent.surname || userSurname || currentStudent.student_surname}</h2>
              <p>Клас: {classLoading ? 'Завантаження...' : (classData?.class_name || classData?.name || rawClass || '—')}</p>
              <p>Телефон: {currentStudent.phone || currentStudent.student_phone || userPhone || '—'}</p>
              <p>Пошта: {currentStudent.email || currentStudent.student_email || userEmail || '—'}</p>
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
        <button
          onClick={() => setTab("grades")}
          className={tab === "grades" ? "active" : ""}
        >
          Звітність
        </button>
        <button
          onClick={() => setTab("ranking")}
          className={tab === "ranking" ? "active" : ""}
        >
          Рейтинг
        </button>
      </div>

      <div className="tab-content">
        {tab === "journal" && <StudentJournal studentId={effectiveStudentId} />}
        {tab === "homework" && <StudentHomework studentId={effectiveStudentId} studentClass={className} />}
        {tab === "schedule" && <StudentSchedule studentClass={className} />}
        {tab === "materials" && <StudentMaterials studentClass={className} />}
        {tab === "dayplan" && <StudentDayPlan studentId={effectiveStudentId} />}
        {tab === "grades" && <StudentGradesAndAbsences enabled={true} studentId={effectiveStudentId} />}
        {tab === "ranking" && <StudentRanking />}
      </div>
    </main>
  );
}
