import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getCurrentUser, isAuthenticated } from '../utils/auth';
import { decodeToken } from "../utils/jwt";
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

  // Determine current role from JWT (fast, avoids an extra request).
  // Note: this reflects the "active" role at the time the token was issued.
  const token = localStorage.getItem('accessToken');
  const payload = token ? decodeToken(token) : null;
  const tokenRole = payload?.role ?? payload?.role_name ?? null;
  const tokenRoles = Array.isArray(payload?.roles) ? payload.roles : [];

  const roles = [tokenRole, ...tokenRoles]
    .filter(Boolean)
    .map((r) => String(r).toLowerCase());

  function hasRole(name) {
    if (!roles.length) return false;
    return roles.includes(String(name).toLowerCase());
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
          {(hasRole('teacher') || hasRole('admin') || hasRole('sadmin')) && (
            <Link to="/teacher/classes" onClick={closeSidebar}>
              Для вчителів
            </Link>
          )}
          {(hasRole('student') || hasRole('admin') || hasRole('sadmin')) && (
            <Link to="/student/dashboard" onClick={closeSidebar}>
              Для учнів
            </Link>
          )}
          {(hasRole('parent') || hasRole('admin') || hasRole('sadmin')) && (
            <Link to="/parent/overview" onClick={closeSidebar}>
              Для батьків
            </Link>
          )}
          {(hasRole('admin') || hasRole('sadmin')) && (
            <Link to="/admin" onClick={closeSidebar}>
              Панель адміністратора
            </Link>
          )}
        </nav>
      </aside>
    </>
  );
}
