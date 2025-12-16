import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createRoot } from "react-dom/client";
import React from "react";
import Mainpage from "./components/pages/Mainpage";
import Sidebar from "./components/Sidebar";
import Auth from "./components/pages/Auth";
import Cabinet from "./components/pages/Cabinet";
import NotFound from "./components/pages/NotFound";
import StudentDashboard from "./components/pages/student/StudentDashboard";
import ParentOverview from "./components/pages/parent/ParentOverview";
import TeacherClasses from "./components/pages/teacher/TeacherClasses";
import TeacherClassView from "./components/pages/teacher/TeacherClassView";

function App() {
  return (
    <BrowserRouter>

      <Sidebar />

      <Routes>
        <Route path="/auth" element={<Auth />} />
        <Route path="/" element={<Mainpage />} />
        <Route path="/student/dashboard" element={<StudentDashboard />} />
        <Route path="/parent/overview" element={<ParentOverview />} />
        <Route path="/teacher/classes" element={<TeacherClasses />} />
        <Route path="/teacher/class/:id" element={<TeacherClassView />} />
        <Route path="/cabinet" element={<Cabinet />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

    </BrowserRouter>
  );
}

createRoot(document.getElementById("app")).render(<App />);
export default App;
