import React from "react";
import "./css/Mainpage.css";
import { decodeToken } from '../../utils/jwt';
import { useLogout } from "../../hooks/useStudents";
import { useNavigate } from "react-router-dom";

export default function Cabinet() {
    const logout = useLogout();
    const navigate = useNavigate();
    const token = localStorage.getItem('accessToken');
    const user = token ? decodeToken(token) : null;

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
                    <p>Ім'я: {user?.name || user?.username || '—'}</p>
                    <p>Прізвище: {user?.surname || '—'}</p>
                    <p>По-батькові: {user?.patronym || '—'}</p>
                    <p>Пошта: {user?.email || '—'}</p>
                    <p>Телефон: {user?.phone || '—'}</p>
                    <button onClick={onLogout}>Вийти</button>
                </div>
            </div>
        </main>
    );
}