import React from "react";
import "./css/Mainpage.css";
import { getCurrentUser } from '../../utils/auth';
import { useLogout, useUserData } from "../../hooks/users";
import { useNavigate } from "react-router-dom";
import api from "../../api/lib/api";

export default function Cabinet() {
    const logout = useLogout();
    const navigate = useNavigate();
    const currentUser = getCurrentUser();
    const userId = currentUser?.userId || currentUser?.id || currentUser?.sub || null;

  const { data: userRes, isLoading, error } = useUserData(userId);
  const user = userRes?.userData ?? userRes?.user ?? userRes ?? null;

  const isApiDev = import.meta.env?.VITE_API_DEV === 'true';

  const logDbRole = async () => {
    try {
      const res = await api.get('/debug/db-role');
      console.log('[debug] db role snapshot:', res.data);
    } catch (e) {
      console.error('[debug] failed to fetch db role snapshot:', e);
    }
  };

    const onLogout = () => {
        logout();
        navigate('/auth');
    }

    return (
        <main className="main">
            <div className="main__header">
                <h1>Особистий кабінет</h1>
            </div>
            <div className="main__content">
                <div className="card cabinet-info">
                    <h2>Інформація про користувача</h2>
                    {isLoading ? (
                      <p>Loading profile...</p>
                    ) : error ? (
                      <p>Error loading profile: {error.message || 'Unknown error'}</p>
                    ) : user ? (
                      <>
                        <p>Ім'я: {user?.name || user?.username || '—'}</p>
                        <p>Прізвище: {user?.surname || '—'}</p>
                        <p>По-батькові: {user?.patronym || '—'}</p>
                        <p>Пошта: {user?.email || '—'}</p>
                        <p>Телефон: {user?.phone || '—'}</p>
                        <p>Роль: {user?.role || payload?.role || '—'}</p>
                      </>
                    ) : (
                      <p>Користувача не знайдено</p>
                    )}
                    <button onClick={onLogout}>Вийти</button>

                    {isApiDev && (
                      <button
                        onClick={logDbRole}
                        aria-hidden="true"
                      >
                        Debug DB Role
                      </button>
                    )}

                </div>
            </div>
        </main>
    );
}