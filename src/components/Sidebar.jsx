import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
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
          <Link to="/auth" onClick={closeSidebar}>
            Авторизація
          </Link>
          <Link to="/teachers" onClick={closeSidebar}>
            Для вчителів
          </Link>
          <Link to="/student/dashboard" onClick={closeSidebar}>
            Для учнів
          </Link>
          <Link to="/parents" onClick={closeSidebar}>
            Для батьків
          </Link>
          <Link to="/cabinet" style={{ marginTop: "240%" }} onClick={closeSidebar}>
            Особистий кабінет
          </Link>
        </nav>
      </aside>
    </>
  );
}
