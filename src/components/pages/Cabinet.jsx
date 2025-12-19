import React from "react";
import "./css/Mainpage.css";
import { decodeToken } from '../../utils/jwt';
import { useLogout, useUserData } from "../../hooks/users";
import { useNavigate } from "react-router-dom";

export default function Cabinet() {
    const logout = useLogout();
    const navigate = useNavigate();
    const token = localStorage.getItem('accessToken');
    const payload = token ? decodeToken(token) : null;
    const userId = payload?.userId || payload?.id || payload?.sub || null;

    const { data: user, isLoading, error } = useUserData(userId);

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
                        <p>Роль: {user?.role || '—'}</p>
                      </>
                    ) : (
                      <p>Користувача не знайдено</p>
                    )}
                    <button onClick={onLogout}>Вийти</button>
                </div>
            </div>
        </main>
    );
}