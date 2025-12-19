import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getCurrentUser, isAuthenticated } from '../utils/auth';
import { useUserRoles } from '../hooks/userroles/queries/useUserRoles';
import "./pages/css/Sidebar.css";

export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  const params = new URLSearchParams(location.search);
  const isOpen = params.get("sidebar") === "1";

  const openSidebar = () => {
    const q = new URLSearchParams(location.search);
    q.set("sidebar", "1");
    navigate({ pathname: location.pathname, search: `?${q.toString()}` });
  };

  const closeSidebar = () => {
    const q = new URLSearchParams(location.search);
    q.delete("sidebar");
    const search = q.toString() ? `?${q.toString()}` : "";
    navigate({ pathname: location.pathname, search });
  };

  // Determine user roles for conditional link rendering
  const currentUser = getCurrentUser();
  const userId = currentUser?.userId || currentUser?.id || currentUser?.sub || null;
  const { data: rolesResp } = useUserRoles(userId, { enabled: !!userId });
  const roles = (() => {
    if (!rolesResp) return [];
    if (Array.isArray(rolesResp)) return rolesResp.map(r => (typeof r === 'string' ? r : (r.role_name || r.name || r)) );
    if (rolesResp.roles) return rolesResp.roles.map(r => (typeof r === 'string' ? r : (r.role_name || r.name || r)) );
    if (rolesResp.role) return [ (typeof rolesResp.role === 'string' ? rolesResp.role : (rolesResp.role.role_name || rolesResp.role.name || '')) ];
    return [];
  })();

  function hasRole(name) {
    if (!roles || !roles.length) return false;
    return roles.some(r => String(r).toLowerCase() === String(name).toLowerCase());
  }

  return (
    <>
      {!isOpen && (
        <button
          className="sidebar-open-button"
          onClick={openSidebar}
          onMouseEnter={openSidebar}
          aria-expanded="false"
          aria-controls="app-sidebar"
        >
          <div className="logo"><img width={45} src="../logo.avif" alt="Menu icon" /></div>
        </button>
      )}

      <div
        className={`app-sidebar-overlay ${isOpen ? "open" : ""}`}
        onClick={closeSidebar}
        aria-hidden={!isOpen}
      />

      <aside
        id="app-sidebar"
        className={`app-sidebar ${isOpen ? "open" : ""}`}
        aria-hidden={!isOpen}
        aria-label="Main sidebar"
        onMouseLeave={closeSidebar}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <Link to="/" onClick={closeSidebar}>
            <img width={50} src="../logo.avif" alt="Menu icon" />
            <strong style={{ fontSize: 24, position: "relative", top: "-12px" }}>Навчасно</strong>
          </Link>
          <button
            className="close"
            onClick={closeSidebar}
            aria-label="Close sidebar"
          >
            ✕
          </button>
        </div>

        <nav>
          {isAuthenticated() ? (
            <Link to="/cabinet" onClick={closeSidebar}>
              Кабінет
            </Link>
          ) : (
            <Link to="/auth" onClick={closeSidebar}>
              Авторизація
            </Link>
          )}
          {hasRole('teacher') && (
            <Link to="/teacher/classes" onClick={closeSidebar}>
              Для вчителів
            </Link>
          )}
          {hasRole('student') && (
            <Link to="/student/dashboard" onClick={closeSidebar}>
              Для учнів
            </Link>
          )}
          {hasRole('parent') && (
            <Link to="/parent/overview" onClick={closeSidebar}>
              Для батьків
            </Link>
          )}
          {hasRole('admin') && (
            <Link to="/admin" onClick={closeSidebar}>
              Панель адміністратора
            </Link>
          )}
        </nav>
      </aside>
    </>
  );
}
