import React, { useState } from "react";
import { getCurrentUser } from "../../../utils/auth";
import AdminDashboard from "./AdminDashboard";
import UsersTable from "./tables/UsersTable";
import ClassesTable from "./tables/ClassesTable";
import StudentsTable from "./tables/StudentsTable";
import TeachersTable from "./tables/TeachersTable";
import JournalsTable from "./tables/JournalsTable";
import ParentsTable from "./tables/ParentsTable";
import RolesTable from "./tables/RolesTable";
import SubjectsTable from "./tables/SubjectsTable";
import StudentDataTable from "./tables/StudentDataTable";
import LessonsTable from "./tables/LessonsTable";
import HomeworkTable from "./tables/HomeworkTable";
import TimetablesTable from "./tables/TimetablesTable";
import DaysTable from "./tables/DaysTable";
import "../css/AdminLayout.css";

export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const { data: currentUser } = getCurrentUser();
  const roleName = currentUser?.role_name || currentUser?.role || null;

  if (roleName !== 'admin' && roleName !== 'sadmin') {
    return <main className="main">Доступ заборонено</main>;
  }

  const tabs = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'users', label: 'Users' },
    { id: 'classes', label: 'Classes' },
    { id: 'students', label: 'Students' },
    { id: 'teachers', label: 'Teachers' },
    { id: 'journals', label: 'Journals' },
    { id: 'parents', label: 'Parents' },
    { id: 'roles', label: 'Roles' },
    { id: 'subjects', label: 'Subjects' },
    { id: 'student-data', label: 'Student Data' },
    { id: 'lessons', label: 'Lessons' },
    { id: 'homework', label: 'Homework' },
    { id: 'timetables', label: 'Timetables' },
    { id: 'days', label: 'Days' },
  ];

  return (
    <main className="main">
      <div className="main__header">
        <h1>Панель адміністратора</h1>
      </div>

      <div className="admin-nav">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`admin-nav-link ${activeTab === tab.id ? 'active' : ''}`}
            style={{ border: 'none', cursor: 'pointer', fontSize: '1rem' }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="main__content" style={{ marginTop: '20px' }}>
        {activeTab === 'dashboard' && <AdminDashboard />}
        {activeTab === 'users' && <UsersTable />}
        {activeTab === 'classes' && <ClassesTable />}
        {activeTab === 'students' && <StudentsTable />}
        {activeTab === 'teachers' && <TeachersTable />}
        {activeTab === 'journals' && <JournalsTable />}
        {activeTab === 'parents' && <ParentsTable />}
        {activeTab === 'roles' && <RolesTable />}
        {activeTab === 'subjects' && <SubjectsTable />}
        {activeTab === 'student-data' && <StudentDataTable />}
        {activeTab === 'lessons' && <LessonsTable />}
        {activeTab === 'homework' && <HomeworkTable />}
        {activeTab === 'timetables' && <TimetablesTable />}
        {activeTab === 'days' && <DaysTable />}
      </div>
    </main>
  );
}
