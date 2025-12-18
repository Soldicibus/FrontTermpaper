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
import AdminPanel from "./components/pages/admin/AdminPanel";
import RequireAuth from "./components/RequireAuth";
import RequireRole from "./components/RequireRole";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

// initialize a single client for the app
const queryClient = new QueryClient();

function App() {
  return (
    <BrowserRouter>
      <Sidebar />

      <Routes>
        <Route path="/auth" element={<Auth />} />
        <Route path="/" element={<Mainpage />} />
        <Route path="/student/dashboard" element={<RequireAuth><StudentDashboard /></RequireAuth>} />
        <Route path="/admin" element={<RequireAuth><RequireRole allowedRoles={["admin"]}><AdminPanel /></RequireRole></RequireAuth>} />
        <Route path="/parent/overview" element={<RequireAuth><RequireRole allowedRoles={["parent"]}><ParentOverview /></RequireRole></RequireAuth>} />
        <Route path="/teacher/classes" element={<RequireAuth><RequireRole allowedRoles={["teacher"]}><TeacherClasses /></RequireRole></RequireAuth>} />
        <Route path="/teacher/class/:id" element={<RequireAuth><RequireRole allowedRoles={["teacher"]}><TeacherClassView /></RequireRole></RequireAuth>} />
        <Route path="/cabinet" element={<RequireAuth><Cabinet /></RequireAuth>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

createRoot(document.getElementById("app")).render(
  <QueryClientProvider client={queryClient}>
    <App />
    <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>
);
export default App;
